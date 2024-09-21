// frontend/script.js
document.getElementById('co2-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('url-input').value;
    const resultDiv = document.getElementById('result');
    const tipsDiv = document.getElementById('tips');

    resultDiv.innerHTML = 'Checking CO2 emissions...';
    tipsDiv.innerHTML = '';

    try {
        // Fetch CO2 data
        const co2Response = await fetch('http://127.0.0.1:5000/api/co2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        });

        const co2Data = await co2Response.json();
        if (co2Data.error) {
            resultDiv.innerHTML = `Error: ${co2Data.error}`;
        } else {
            resultDiv.innerHTML = `
                <h3>CO2 Emission Data</h3>
                <p>CO2 Emissions (g): ${co2Data.co2 || 'N/A'}</p>
                <p>Energy Consumption (kWh): ${co2Data.energy || 'N/A'}</p>
            `;
        }

        // Fetch optimization tips
        const tipsResponse = await fetch('http://127.0.0.1:5000/api/optimize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const tipsData = await tipsResponse.json();
        tipsDiv.innerHTML = `<h3>Optimization Suggestions</h3>`;
        for (const tip in tipsData) {
            tipsDiv.innerHTML += `<p>${tipsData[tip]}</p>`;
        }

    } catch (error) {
        resultDiv.innerHTML = 'Error fetching CO2 data';
    }
});
