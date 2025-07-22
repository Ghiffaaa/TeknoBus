// data/dummyData.js

let buses = [
    // Rute dari KLATEN
    {
        id: 'bus-klaten-jakarta-001',
        name: 'PO Maju Jaya',
        route: 'klaten-jakarta',
        departureTime: '06:00',
        arrivalTime: '18:00',
        duration: '12 jam',
        price: 250000,
        facilities: ['AC', 'WiFi', 'Makan', 'Toilet'],
        type: 'Executive',
        rating: '4.7',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-klaten-bandung-001',
        name: 'PO Harum',
        route: 'klaten-bandung',
        departureTime: '07:30',
        arrivalTime: '17:00',
        duration: '9.5 jam',
        price: 200000,
        facilities: ['AC', 'WiFi', 'Snack', 'Toilet'],
        type: 'Bisnis',
        rating: '4.5',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },
    {
        id: 'bus-klaten-surabaya-001',
        name: 'PO Cepat Sampai',
        route: 'klaten-surabaya',
        departureTime: '09:00',
        arrivalTime: '16:00',
        duration: '7 jam',
        price: 150000,
        facilities: ['AC', 'Snack'],
        type: 'Ekonomi',
        rating: '4.2',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-klaten-yogyakarta-001',
        name: 'PO Lokal Express',
        route: 'klaten-yogyakarta',
        departureTime: '10:00',
        arrivalTime: '11:30',
        duration: '1.5 jam',
        price: 30000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.0',
        image: 'super.jpeg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-klaten-semarang-001',
        name: 'PO Central Trans',
        route: 'klaten-semarang',
        departureTime: '11:00',
        arrivalTime: '13:00',
        duration: '2 jam',
        price: 50000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.1',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-klaten-malang-001',
        name: 'PO Antar Kota',
        route: 'klaten-malang',
        departureTime: '13:00',
        arrivalTime: '21:00',
        duration: '8 jam',
        price: 170000,
        facilities: ['AC', 'Toilet'],
        type: 'Bisnis',
        rating: '4.3',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },

    // Rute dari JAKARTA (beberapa sudah ada dari contoh sebelumnya, kita tambahkan yang baru)
    {
        id: 'bus-jakarta-bandung-001',
        name: 'Primajasa Executive',
        route: 'jakarta-bandung',
        departureTime: '08:00',
        arrivalTime: '11:00',
        duration: '3 jam',
        price: 75000,
        facilities: ['AC', 'WiFi', 'Toilet', 'Snack'],
        type: 'Executive',
        rating: '4.8',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-jakarta-surabaya-001',
        name: 'Rosalia Indah',
        route: 'jakarta-surabaya',
        departureTime: '19:00',
        arrivalTime: '07:00',
        duration: '12 jam',
        price: 180000,
        facilities: ['AC', 'WiFi', 'Toilet', 'Makan', 'Selimut'],
        type: 'Executive',
        rating: '4.9',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-jakarta-yogyakarta-001',
        name: 'PO Indah Jaya',
        route: 'jakarta-yogyakarta',
        departureTime: '20:00',
        arrivalTime: '06:00',
        duration: '10 jam',
        price: 160000,
        facilities: ['AC', 'WiFi', 'Toilet'],
        type: 'Bisnis',
        rating: '4.6',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },
    {
        id: 'bus-jakarta-semarang-001',
        name: 'PO Trans Jawa',
        route: 'jakarta-semarang',
        departureTime: '09:00',
        arrivalTime: '15:00',
        duration: '6 jam',
        price: 120000,
        facilities: ['AC', 'WiFi'],
        type: 'Executive',
        rating: '4.5',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-jakarta-malang-001',
        name: 'PO Jayakarta',
        route: 'jakarta-malang',
        departureTime: '18:00',
        arrivalTime: '07:00',
        duration: '13 jam',
        price: 220000,
        facilities: ['AC', 'Makan', 'Selimut', 'Toilet'],
        type: 'Executive',
        rating: '4.7',
        image: 'super.jpeg',
        capacity: 36,
        seats: []
    },

    // Rute dari BANDUNG
    {
        id: 'bus-bandung-jakarta-001',
        name: 'Pahala Kencana',
        route: 'bandung-jakarta', // Ini adalah rute balik dari JKT-BDG
        departureTime: '10:00',
        arrivalTime: '13:30',
        duration: '3.5 jam',
        price: 70000,
        facilities: ['AC', 'WiFi'],
        type: 'Ekonomi',
        rating: '4.4',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },
    {
        id: 'bus-bandung-surabaya-001',
        name: 'PO Putra Jaya',
        route: 'bandung-surabaya',
        departureTime: '21:00',
        arrivalTime: '09:00',
        duration: '12 jam',
        price: 190000,
        facilities: ['AC', 'Toilet', 'Makan'],
        type: 'Executive',
        rating: '4.6',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-bandung-yogyakarta-001',
        name: 'Harapan Jaya',
        route: 'bandung-yogyakarta',
        departureTime: '18:00',
        arrivalTime: '06:00',
        duration: '12 jam',
        price: 150000,
        facilities: ['AC', 'WiFi', 'Toilet', 'Makan'],
        type: 'Executive',
        rating: '4.8',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-bandung-semarang-001',
        name: 'PO Barokah',
        route: 'bandung-semarang',
        departureTime: '07:00',
        arrivalTime: '13:00',
        duration: '6 jam',
        price: 100000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.0',
        image: 'super.jpeg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-bandung-malang-001',
        name: 'PO Raya Kencana',
        route: 'bandung-malang',
        departureTime: '19:30',
        arrivalTime: '08:30',
        duration: '11 jam',
        price: 200000,
        facilities: ['AC', 'Makan', 'Selimut'],
        type: 'Bisnis',
        rating: '4.5',
        image: 'super.jpg',
        capacity: 40,
        seats: []
    },

    // Rute dari SURABAYA
    {
        id: 'bus-surabaya-jakarta-001',
        name: 'Gunung Harta',
        route: 'surabaya-jakarta', // Ini adalah rute balik dari JKT-SBY
        departureTime: '20:00',
        arrivalTime: '08:30',
        duration: '12.5 jam',
        price: 170000,
        facilities: ['AC', 'WiFi', 'Toilet', 'Selimut'],
        type: 'Bisnis',
        rating: '4.7',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-surabaya-bandung-001',
        name: 'PO Bintang Timur',
        route: 'surabaya-bandung',
        departureTime: '22:00',
        arrivalTime: '10:00',
        duration: '12 jam',
        price: 195000,
        facilities: ['AC', 'Toilet', 'Makan'],
        type: 'Executive',
        rating: '4.6',
        image: 'super.jpeg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-surabaya-yogyakarta-001',
        name: 'PO Sumber Alam',
        route: 'surabaya-yogyakarta',
        departureTime: '06:30',
        arrivalTime: '13:00',
        duration: '6.5 jam',
        price: 90000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.2',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-surabaya-semarang-001',
        name: 'PO Jaya Mandiri',
        route: 'surabaya-semarang',
        departureTime: '08:00',
        arrivalTime: '14:00',
        duration: '6 jam',
        price: 80000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.1',
        image: 'super.jpeg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-surabaya-malang-001',
        name: 'PO Trans Malang',
        route: 'surabaya-malang',
        departureTime: '09:00',
        arrivalTime: '11:30',
        duration: '2.5 jam',
        price: 45000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.0',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },

    // Rute dari YOGYAKARTA
    {
        id: 'bus-yogyakarta-jakarta-001',
        name: 'PO Raya Perkasa',
        route: 'yogyakarta-jakarta', // Ini adalah rute balik dari JKT-YGY
        departureTime: '21:00',
        arrivalTime: '07:00',
        duration: '10 jam',
        price: 165000,
        facilities: ['AC', 'WiFi', 'Toilet'],
        type: 'Bisnis',
        rating: '4.6',
        image: 'super.jpg',
        capacity: 40,
        seats: []
    },
    {
        id: 'bus-yogyakarta-bandung-001',
        name: 'PO Maju Mundur',
        route: 'yogyakarta-bandung',
        departureTime: '08:30',
        arrivalTime: '20:30',
        duration: '12 jam',
        price: 155000,
        facilities: ['AC', 'WiFi', 'Toilet', 'Makan'],
        type: 'Executive',
        rating: '4.7',
        image: 'super.jpeg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-yogyakarta-surabaya-001',
        name: 'PO Kerta Jaya',
        route: 'yogyakarta-surabaya',
        departureTime: '14:00',
        arrivalTime: '20:30',
        duration: '6.5 jam',
        price: 95000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.1',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-yogyakarta-semarang-001',
        name: 'PO Trans Yogya',
        route: 'yogyakarta-semarang',
        departureTime: '10:00',
        arrivalTime: '12:00',
        duration: '2 jam',
        price: 40000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.0',
        image: 'super.jpeg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-yogyakarta-malang-001',
        name: 'PO Wisata Jaya',
        route: 'yogyakarta-malang',
        departureTime: '11:00',
        arrivalTime: '18:00',
        duration: '7 jam',
        price: 120000,
        facilities: ['AC', 'Toilet'],
        type: 'Bisnis',
        rating: '4.2',
        image: 'super.jpg',
        capacity: 40,
        seats: []
    },

    // Rute dari SEMARANG
    {
        id: 'bus-semarang-jakarta-001',
        name: 'PO Sindoro Satriamas',
        route: 'semarang-jakarta',
        departureTime: '10:00',
        arrivalTime: '16:00',
        duration: '6 jam',
        price: 125000,
        facilities: ['AC', 'WiFi'],
        type: 'Executive',
        rating: '4.5',
        image: 'super.jpeg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-semarang-bandung-001',
        name: 'PO Nusantara',
        route: 'semarang-bandung',
        departureTime: '09:30',
        arrivalTime: '15:30',
        duration: '6 jam',
        price: 105000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.0',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-semarang-surabaya-001',
        name: 'PO Jaya Raya',
        route: 'semarang-surabaya',
        departureTime: '14:00',
        arrivalTime: '20:00',
        duration: '6 jam',
        price: 85000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.1',
        image: 'super.jpeg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-semarang-yogyakarta-001',
        name: 'PO Mekar Sari',
        route: 'semarang-yogyakarta',
        departureTime: '15:00',
        arrivalTime: '17:00',
        duration: '2 jam',
        price: 45000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '3.9',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-semarang-malang-001',
        name: 'PO Angin Darat',
        route: 'semarang-malang',
        departureTime: '17:00',
        arrivalTime: '00:00',
        duration: '7 jam',
        price: 130000,
        facilities: ['AC', 'Toilet'],
        type: 'Bisnis',
        rating: '4.2',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },

    // Rute dari MALANG
    {
        id: 'bus-malang-jakarta-001',
        name: 'PO Rosalia Jaya',
        route: 'malang-jakarta',
        departureTime: '19:00',
        arrivalTime: '08:00',
        duration: '13 jam',
        price: 225000,
        facilities: ['AC', 'Makan', 'Selimut', 'Toilet'],
        type: 'Executive',
        rating: '4.7',
        image: 'super.jpg',
        capacity: 36,
        seats: []
    },
    {
        id: 'bus-malang-bandung-001',
        name: 'PO Dharma Raya',
        route: 'malang-bandung',
        departureTime: '20:00',
        arrivalTime: '07:00',
        duration: '11 jam',
        price: 205000,
        facilities: ['AC', 'Makan', 'Selimut'],
        type: 'Bisnis',
        rating: '4.5',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },
    {
        id: 'bus-malang-surabaya-001',
        name: 'PO Jaya Abadi',
        route: 'malang-surabaya',
        departureTime: '07:00',
        arrivalTime: '09:30',
        duration: '2.5 jam',
        price: 50000,
        facilities: ['AC'],
        type: 'Ekonomi',
        rating: '4.0',
        image: 'super.jpg',
        capacity: 45,
        seats: []
    },
    {
        id: 'bus-malang-yogyakarta-001',
        name: 'PO Lintas Selatan',
        route: 'malang-yogyakarta',
        departureTime: '08:00',
        arrivalTime: '15:00',
        duration: '7 jam',
        price: 125000,
        facilities: ['AC', 'Toilet'],
        type: 'Bisnis',
        rating: '4.2',
        image: 'super.jpeg',
        capacity: 40,
        seats: []
    },
    {
        id: 'bus-malang-semarang-001',
        name: 'PO Cepat Tanggap',
        route: 'malang-semarang',
        departureTime: '09:00',
        arrivalTime: '16:00',
        duration: '7 jam',
        price: 135000,
        facilities: ['AC', 'Toilet'],
        type: 'Bisnis',
        rating: '4.3',
        image: 'super.jpg',
        capacity: 40,
        seats: []
    }
];

// Data pemesanan (akan diisi saat pemesanan dibuat)
let bookings = [];

// Fungsi untuk menginisialisasi kursi dengan status acak
function initializeSeats() {
    buses.forEach(bus => {
        // Hanya inisialisasi kursi jika array seats masih kosong
        // Atau jika ini adalah bus "generik" yang rutenya akan di-overwrite
        // (Meskipun dengan ID statis, kita bisa saja tidak perlu bus generik lagi jika semua rute terdefinisi)
        if (bus.seats.length === 0) { 
            for (let i = 1; i <= bus.capacity; i++) {
                const seat = { number: i, status: 'available' };
                const random = Math.random();
                // Sekitar 25% kursi akan tidak tersedia secara acak
                if (random < 0.15) { // 15% terisi
                    seat.status = 'occupied';
                } else if (random < 0.25) { // 10% dipesan
                    seat.status = 'reserved';
                }
                bus.seats.push(seat);
            }
        }
    });
}

// Panggil fungsi inisialisasi saat file dimuat
initializeSeats();

// Ekspor data bus dan bookings
module.exports = { buses, bookings };