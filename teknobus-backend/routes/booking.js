// routes/booking.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); 
const pool = require('../db'); // Impor koneksi pool database

// POST /api/booking - Membuat pemesanan baru (tahap awal, tanpa validasi penumpang lengkap)
router.post('/', async (req, res) => {
    const { busId, selectedSeats, passengerData, contact } = req.body;

    // Minimal validasi untuk tahap awal booking
    if (!busId || !selectedSeats || !Array.isArray(selectedSeats) || selectedSeats.length === 0) {
        return res.status(400).json({ message: 'Data bus atau kursi yang dipilih tidak lengkap.' });
    }

    try {
        // Ambil info bus dari DB
        const [busRows] = await pool.query("SELECT * FROM buses WHERE id = ?", [busId]);
        const bus = busRows[0];

        if (!bus) {
            // Tangani jika ID bus generik tidak ditemukan di DB
            if (busId.startsWith('bus-generik-')) {
                // Untuk demo, kita bisa "buat" data bus generik sementara di sini
                // agar pemesanan tetap bisa dilakukan meskipun bus generik tidak di DB
                // Ini tidak ideal untuk produksi, bus generik juga harus terdefinisi di DB
                const genericRoute = contact.date ? `${contact.date}-generik` : 'generik-route'; // Asumsi rute dari contact date
                bus = {
                    id: busId,
                    name: 'Bus Generik',
                    route: genericRoute,
                    departureTime: '00:00',
                    arrivalTime: '00:00',
                    duration: '0 jam',
                    price: selectedSeats.length > 0 ? selectedSeats.length * 10000 : 0, // Harga dummy
                    facilities: JSON.stringify(['AC']),
                    type: 'Generik',
                    rating: '0.0',
                    image: 'super.jpg',
                    capacity: 36,
                };
            } else {
                return res.status(404).json({ message: 'Bus yang dipilih tidak ditemukan di database.' });
            }
        }
        
        // Parse facilities dari JSON string
        if (typeof bus.facilities === 'string') {
            bus.facilities = JSON.parse(bus.facilities);
        }

        // Cek ketersediaan kursi (simulasi)
        // Dalam sistem nyata, ini akan melibatkan tabel `seats_status` per tanggal
        // Untuk demo ini, kita akan asumsikan kursi yang dipilih adalah available jika belum ada booking
        // yang mengklaimnya pada tanggal dan bus yang sama.
        // Ini adalah poin di mana integrasi dengan status kursi nyata menjadi kompleks.
        // Untuk kesederhanaan, kita akan cek kursi "terisi" atau "dipesan" dari `bookings` yang sudah ada di DB.

        // Ambil semua booking yang sudah ada untuk busId dan tanggal perjalanan yang sama
        const [existingBookings] = await pool.query(
            "SELECT selectedSeats, paymentStatus FROM bookings WHERE busId = ? AND travelDate = ?",
            [busId, contact.date]
        );

        const occupiedOrReservedSeats = new Set();
        existingBookings.forEach(booking => {
            if (booking.paymentStatus === 'completed' || booking.paymentStatus === 'pending') {
                const bookedSeats = JSON.parse(booking.selectedSeats);
                bookedSeats.forEach(seatNum => occupiedOrReservedSeats.add(seatNum));
            }
        });

        const unavailableSeats = [];
        selectedSeats.forEach(seatNumber => {
            if (occupiedOrReservedSeats.has(seatNumber)) {
                unavailableSeats.push(seatNumber);
            }
        });

        if (unavailableSeats.length > 0) {
            return res.status(409).json({ message: `Kursi ${unavailableSeats.join(', ')} tidak tersedia lagi.`, unavailableSeats });
        }


        const bookingCode = 'TB' + uuidv4().slice(0, 8).toUpperCase();
        const subtotal = selectedSeats.length * bus.price;
        const adminFee = 5000;
        const totalPrice = subtotal + adminFee;

        // Data penumpang dan kontak akan di-update di tahap pembayaran
        const initialPassengerData = JSON.stringify(passengerData || []);
        const initialContactPhone = contact.phone || '';
        const initialContactEmail = contact.email || '';
        const travelDate = contact.date; // Tanggal perjalanan


        const insertQuery = `
            INSERT INTO bookings (
                bookingId, bookingCode, busId, busName, busType, route,
                departureTime, arrivalTime, travelDate, selectedSeats,
                passengerData, contactPhone, contactEmail, subtotal, adminFee, totalPrice, paymentStatus
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const insertParams = [
            uuidv4(), bookingCode, bus.id, bus.name, bus.type, bus.route,
            bus.departureTime, bus.arrivalTime, travelDate, JSON.stringify(selectedSeats),
            initialPassengerData, initialContactPhone, initialContactEmail, subtotal, adminFee, totalPrice, 'pending'
        ];

        await pool.query(insertQuery, insertParams);

        const newBooking = {
            bookingId: insertParams[0],
            bookingCode,
            busId: bus.id,
            busName: bus.name,
            busType: bus.type,
            route: bus.route,
            departureTime: bus.departureTime,
            arrivalTime: bus.arrivalTime,
            date: travelDate, // Frontend expects 'date'
            selectedSeats,
            passengerData: JSON.parse(initialPassengerData),
            contact: { phone: initialContactPhone, email: initialContactEmail, date: travelDate },
            subtotal,
            adminFee,
            totalPrice,
            paymentStatus: 'pending',
            paymentMethod: null,
            paidAt: null,
            createdAt: new Date().toISOString() // Placeholder, DB akan mengisi otomatis
        };

        res.status(201).json({
            message: 'Pemesanan berhasil dibuat di database, menunggu data penumpang lengkap dan pembayaran.',
            booking: newBooking
        });

    } catch (error) {
        console.error('Error creating booking in DB:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat membuat pemesanan.' });
    }
});

// POST /api/booking/:bookingId/pay - Proses pembayaran
router.post('/:bookingId/pay', async (req, res) => {
    const { bookingId } = req.params;
    const { paymentMethod, paymentDetails, passengerData, contact } = req.body;

    try {
        const [bookingRows] = await pool.query("SELECT * FROM bookings WHERE bookingId = ?", [bookingId]);
        const booking = bookingRows[0];

        if (!booking) {
            return res.status(404).json({ message: 'Pemesanan tidak ditemukan.' });
        }

        if (booking.paymentStatus === 'completed') {
            return res.status(400).json({ message: 'Pemesanan ini sudah dibayar.' });
        }

        // Validasi data yang seharusnya sudah ada dari frontend
        if (!paymentMethod || !passengerData || !Array.isArray(passengerData) || passengerData.length === 0 || !contact || !contact.phone || !contact.email) {
            return res.status(400).json({ message: 'Data pembayaran atau detail penumpang/kontak tidak lengkap.' });
        }

        // Simulasi proses pembayaran
        console.log(`Processing payment for booking ${bookingId} via ${paymentMethod}...`);
        console.log('Payment Details:', paymentDetails);

        // Update booking di database
        const updateQuery = `
            UPDATE bookings
            SET paymentStatus = ?, paymentMethod = ?, paidAt = NOW(),
                passengerData = ?, contactPhone = ?, contactEmail = ?
            WHERE bookingId = ?
        `;
        const updateParams = [
            'completed', paymentMethod,
            JSON.stringify(passengerData), contact.phone, contact.email,
            bookingId
        ];

        await pool.query(updateQuery, updateParams);

        // Setelah update, ambil kembali data booking yang sudah lengkap dari DB
        const [updatedBookingRows] = await pool.query("SELECT * FROM bookings WHERE bookingId = ?", [bookingId]);
        const updatedBooking = updatedBookingRows[0];
        
        // Parse kembali data JSON dari DB untuk respons frontend
        updatedBooking.selectedSeats = JSON.parse(updatedBooking.selectedSeats);
        updatedBooking.passengerData = JSON.parse(updatedBooking.passengerData);
        updatedBooking.contact = { phone: updatedBooking.contactPhone, email: updatedBooking.contactEmail, date: updatedBooking.travelDate };
        updatedBooking.date = updatedBooking.travelDate; // Konsistensi dengan frontend

        // Ambil juga detail bus untuk dikirimkan kembali ke frontend
        const [busRows] = await pool.query("SELECT * FROM buses WHERE id = ?", [updatedBooking.busId]);
        const bus = busRows[0];

        if (bus) {
            updatedBooking.busName = bus.name;
            updatedBooking.busType = bus.type;
            updatedBooking.rating = bus.rating;
            // rute, departureTime, arrivalTime sudah ada di booking
        }

        res.json({
            message: 'Pembayaran berhasil dikonfirmasi dan data diperbarui di database!',
            booking: updatedBooking // Kembalikan objek booking yang sudah diperbarui
        });

    } catch (error) {
        console.error('Error processing payment in DB:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat memproses pembayaran.' });
    }
});

module.exports = router;