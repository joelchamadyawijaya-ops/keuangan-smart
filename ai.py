from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json.get('expenses', [])

    if not data:
        return jsonify({"msg":"no data"})

    total = sum(data)
    avg = np.mean(data)

    # simple prediction (trend)
    trend = np.polyfit(range(len(data)), data, 1)[0]

    if total < 2000000:
        status = "Hemat"
        advice = "Pengeluaran aman, bisa mulai investasi."
    elif total < 5000000:
        status = "Normal"
        advice = "Masih aman, tapi kurangi belanja tidak penting."
    else:
        status = "Boros"
        advice = "⚠️ Kurangi pengeluaran segera!"

    return jsonify({
        "total": total,
        "average": float(avg),
        "trend": float(trend),
        "status": status,
        "advice": advice
    })

app.run(port=5000)