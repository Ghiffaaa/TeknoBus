// routes/bus.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Impor koneksi pool database

// Fungsi helper untuk mengisi status kursi secara acak (karena tidak disimpan di DB per tanggal)
function assignRandomSeatStatus(capacity) {
    const seats = [];
    for (let i = 1; i <= capacity; i++) {
        const seat = { number: i, status: 'available' };
        const random = Math.random();
        if (random < 0.15) { // 15% occupied
            seat.status = 'occupied';
        } else if (random < 0.25) { // 10% reserved
            seat.status = 'reserved';
        }
        seats.push(seat);
    }
    return seats;
}

// GET /api/buses?departure=jakarta&destination=bandung&date=2025-07-10
router.get('/', async (req, res) => {
    const { departure, destination, date } = req.query; // date akan digunakan untuk logika kursi yang lebih canggih di masa depan

    let query = "SELECT * FROM buses";
    let params = [];
    let whereClauses = [];

    if (departure && destination) {
        const normalizedDeparture = departure.toLowerCase();
        const normalizedDestination = destination.toLowerCase();

        // Mencari rute dalam format "kota1-kota2" atau "kota2-kota1"
        whereClauses.push("(route = ? OR route = ?)");
        params.push(`${normalizedDeparture}-${normalizedDestination}`);
        params.push(`${normalizedDestination}-${normalizedDeparture}`);
    }

    if (whereClauses.length > 0) {
        query += " WHERE " + whereClauses.join(" AND ");
    }

    try {
        const [rows] = await pool.query(query, params);
        let matchedBuses = rows;

        // Jika tidak ada bus spesifik ditemukan untuk rute yang diminta, tambahkan bus generik
        if (matchedBuses.length === 0 && departure && destination) {
            console.log(`No specific buses found for route ${departure}-${destination}. Providing generic options.`);
            const genericRoute = `${departure}-${destination}`;

            // Buat instance bus generik
            const genericBus1 = {
                id: `bus-generik-${Date.now()}-1`, // ID unik setiap kali dibuat
                name: 'Bus Ekonomi (Generik)',
                route: genericRoute,
                departureTime: '09:00',
                arrivalTime: '15:00',
                duration: '6 jam',
                price: 85000,
                facilities: JSON.stringify(['AC', 'WiFi']), // Simpan sebagai JSON string
                type: 'Ekonomi',
                rating: '4.3',
                image: 'super.jpg',
                capacity: 36,
            };
            const genericBus2 = {
                id: `bus-generik-${Date.now()}-2`, // ID unik setiap kali dibuat
                name: 'Bus Executive (Generik)',
                route: genericRoute,
                departureTime: '19:00',
                arrivalTime: '05:00',
                duration: '10 jam',
                price: 120000,
                facilities: JSON.stringify(['AC', 'WiFi', 'Toilet', 'Selimut']), // Simpan sebagai JSON string
                type: 'Executive',
                rating: '4.6',
                image: 'super.jpg',
                capacity: 36,
            };

            // Untuk bus generik, kita akan mengelola status kursi di memori
            // dan tidak menyimpannya ke DB untuk setiap ID generik yang dibuat.
            matchedBuses.push(genericBus1, genericBus2);
            
            // Catatan: Bus generik ini tidak otomatis disimpan ke database
            // karena ID-nya dinamis. Untuk demo, ini cukup.
            // Dalam produksi, Anda akan memiliki bus generik yang terdefinisi di DB.
        }

        const busesWithAvailability = matchedBuses.map(bus => {
            const seats = assignRandomSeatStatus(bus.capacity); // Simulasi status kursi
            return {
                ...bus,
                facilities: JSON.parse(bus.facilities), // Parse facilities dari JSON string
                available: seats.filter(seat => seat.status === 'available').length,
                seats: seats // Tambahkan detail kursi ke objek bus
            };
        });

        res.json(busesWithAvailability);

    } catch (error) {
        console.error('Error fetching buses from DB:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil data bus.' });
    }
});

// GET /api/buses/:id/seats - Mendapatkan detail kursi untuk bus tertentu
router.get('/:id/seats', async (req, res) => {
    const { id } = req.params;
    // Logika ini akan mengambil bus dari DB.
    // Jika itu bus generik yang tidak disimpan di DB, kita perlu menanganinya.
    
    try {
        const [rows] = await pool.query("SELECT * FROM buses WHERE id = ?", [id]);
        let bus = rows[0];

        if (!bus) {
            // Jika tidak ditemukan di DB, cek apakah ini bus generik yang dibuat sebelumnya
            // Ini adalah hack untuk demo, tidak ideal untuk produksi.
            // Dalam produksi, bus generik juga harus punya entri di DB atau di cache.
            // Untuk demo, kita akan membuat ulang bus generik jika ID cocok dengan pola generik
            if (id.startsWith('bus-generik-')) {
                 // Ambil data bus generik dari request sebelumnya (kalau bisa dari global variable di server.js)
                 // Karena kita tidak menyimpan bus generik ke DB secara persisten,
                 // kita harus menganggapnya sebagai kesalahan 404 jika ID-nya dinamis dan tidak ada di DB.
                 // Atau, Anda bisa memodifikasi server.js untuk menyimpan bus generik sementara di array global
                 // seperti sebelumnya agar bisa diakses di sini.
                 // Untuk kesederhanaan, jika ini bus generik dan tidak di DB, anggap 404.
                return res.status(404).json({ message: 'Bus generik tidak ditemukan (mungkin server di-restart atau ID tidak valid lagi).' });
            }
            return res.status(404).json({ message: 'Bus tidak ditemukan.' });
        }
        
        // Parse facilities dari JSON string
        bus.facilities = JSON.parse(bus.facilities);

        // Simulasi status kursi karena tidak ada tabel kursi per tanggal di DB
        bus.seats = assignRandomSeatStatus(bus.capacity);

        res.json(bus.seats);

    } catch (error) {
        console.error('Error fetching bus seats from DB:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil data kursi.' });
    }
});

module.exports = router;