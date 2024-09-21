// // Diagnose CO2 Emissions based on page size and load time
// function diagnoseCO2() {
//     const pageSize = document.getElementById('page-size').value;
//     const loadTime = document.getElementById('page-load-time').value;
//     let resultText = '';
    
//     // Assume basic calculation logic
//     const emission = (pageSize * loadTime * 0.2).toFixed(2); // Hypothetical calculation
    
//     if (emission > 0) {
//         resultText = `Your website generates approximately ${emission}g of CO2 per page load.`;
//     } else {
//         resultText = 'Please enter valid data.';
//     }
    
//     document.getElementById('result').innerText = resultText;

//     // Display suggestions
//     showSuggestions(pageSize, loadTime);
// }

// // Provide optimization suggestions based on inputs
// function showSuggestions(pageSize, loadTime) {
//     const suggestionsList = document.getElementById('suggestions-list');
//     suggestionsList.innerHTML = ''; // Clear the list

//     if (pageSize > 1) {
//         suggestionsList.innerHTML += '<li>Consider compressing images and media.</li>';
//     }
//     if (loadTime > 3) {
//         suggestionsList.innerHTML += '<li>Try lazy loading images and resources to improve load time.</li>';
//     }
//     suggestionsList.innerHTML += '<li>Reduce the usage of external resources like heavy fonts and libraries.</li>';
// }
