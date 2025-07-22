// server.js
const express = require('express');
const cors = require('cors'); 
const busRoutes = require('./routes/bus');
const bookingRoutes = require('./routes/booking');
const pool = require('./db'); // Impor koneksi pool database

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Rute API
app.use('/api/buses', busRoutes);
app.use('/api/booking', bookingRoutes);

// Rute dasar
app.get('/', (req, res) => {
    res.send('TeknoBus Backend API is running with MySQL!');
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access backend at http://localhost:${PORT}`);
});