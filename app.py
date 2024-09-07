from flask import Flask, render_template, jsonify, request
import threading
import time

app = Flask(__name__)

# In-memory store for alerts
alerts = []

# Function to simulate real-time log monitoring
def monitor_logs():
    global alerts
    while True:
        time.sleep(5)  # Simulate log monitoring interval
        # Simulate detecting an incident
        new_alert = 'Incident detected at ' + time.strftime('%Y-%m-%d %H:%M:%S')
        alerts.append(new_alert)
        # Keep the number of alerts manageable
        if len(alerts) > 10:
            alerts.pop(0)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/alerts')
def get_alerts():
    return jsonify(alerts)

if __name__ == "__main__":
    # Start log monitoring in a separate thread
    threading.Thread(target=monitor_logs, daemon=True).start()
    app.run(debug=True)
