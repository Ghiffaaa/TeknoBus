from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Simulasi data bus (rute statis)
bus_data = {
    "jakarta-bandung": [
        {
            "name": "Primajasa Executive",
            "departure": "08:00",
            "arrival": "11:00",
            "duration": "3 jam",
            "price": 75000,
            "facilities": ["AC", "WiFi", "Toilet", "Snack"],
            "type": "Executive",
            "rating": "4.8",
            "image": "super.jpg",
            "available": 28
        },
        # Tambah bus lain jika perlu
    ]
}

# Beranda
@app.route("/")
def index():
    return render_template("Home.html")

# API untuk pencarian bus
@app.route("/api/search", methods=["POST"])
def search_bus():
    data = request.json
    route_key = f"{data['departure']}-{data['destination']}"
    buses = bus_data.get(route_key, [])
    return jsonify(buses)

# API untuk menyimpan data pemesanan (simulasi)
@app.route("/api/book", methods=["POST"])
def book_ticket():
    booking = request.json
    # Di sini bisa simpan ke database jika perlu
    print("Booking Received:", booking)
    return jsonify({"status": "success", "message": "Pemesanan berhasil!"})

# API konfirmasi pembayaran
@app.route("/api/pay", methods=["POST"])
def process_payment():
    payment_info = request.json
    print("Payment Info:", payment_info)
    return jsonify({"status": "paid", "message": "Pembayaran berhasil!"})

if __name__ == "__main__":
    app.run(debug=True)
