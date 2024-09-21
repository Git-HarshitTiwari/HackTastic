from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(_name_)

# API Endpoint and API key (if using an external service)
WEBSITE_CARBON_API = "https://api.websitecarbon.com/site?url="
API_KEY = os.getenv('WEBSITE_CARBON_API_KEY')

# Approximate values for estimating emissions (for manual calculation if not using an API)
BYTES_TO_GB = 1 / (1024 ** 3)
ENERGY_PER_GB = 0.081  # kWh per GB of data transfer
CARBON_PER_KWH = 475  # grams of CO2 per kWh

# Utility function to estimate website emissions manually
def estimate_emissions(page_size):
    size_in_gb = page_size * BYTES_TO_GB
    energy_consumed = size_in_gb * ENERGY_PER_GB  # kWh
    carbon_emissions = energy_consumed * CARBON_PER_KWH  # grams of CO2
    return carbon_emissions

# Route for the main page
@app.route('/')
def home():
    return render_template('index.html')

# Route to calculate website emissions
@app.route('/calculate', methods=['POST'])
def calculate_emissions():
    try:
        url = request.form['url']
        
        # Make request to Website Carbon API (if you have access)
        if API_KEY:
            response = requests.get(f"{WEBSITE_CARBON_API}{url}", headers={"Authorization": f"Bearer {API_KEY}"})
            data = response.json()
            carbon_emission = data.get('carbon', {}).get('grams', 'N/A')
            return jsonify({"emission": carbon_emission, "unit": "grams"})
        
        # Otherwise, estimate manually based on page size
        # Fetching page size (content length) manually
        response = requests.get(url)
        page_size = len(response.content)  # Size of the page in bytes
        carbon_emission = estimate_emissions(page_size)
        
        return jsonify({"emission": carbon_emission, "unit": "grams"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if _name_ == '_main_':
    app.run(debug=True)