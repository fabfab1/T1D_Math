// Separate JavaScript file

// Async function to fetch and display CSV data
async function displayCSVData() {
    // Fetch the CSV data
    fetch('./T1D_populate.csv')
        .then(response => response.text())
        .then(data => {
            // Parse the CSV data
            const rows = data.split('\n');
            const parsedData = rows.map(row => row.split(','));

            // Create a table from the parsed CSV data
            let table = document.createElement('table');
            parsedData.forEach(rowData => {
                let row = document.createElement('tr');
                rowData.forEach(cellData => {
                    let cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    row.appendChild(cell);
                });
                table.appendChild(row);
            });

            // Insert the table into the HTML
            document.getElementById('csvDataTable').appendChild(table);
        })
        .catch(error => console.error('Error:', error));
}

function calculateBolus() {
    // Retrieve values from the form
    let insulinFactor = parseFloat(document.getElementById("insulinFactor").value);
    let carbs = parseFloat(document.getElementById("carbs").value);
    let pfus = parseFloat(document.getElementById("pfus").value) || 0; // Set to 0 if blank

    // Check if values are valid and positive
    if (isNaN(insulinFactor) || insulinFactor <= 0 || isNaN(carbs) || carbs <= 0 || pfus < 0) {
        alert("Please enter valid positive numbers.");
        return;
    }

    // Calculate total carbs and insulin
    let totalCarbs = carbs + pfus;
    let totalInsulin = totalCarbs / insulinFactor;

    // Calculate percentage (example: percentage of insulin in total carbs)
    let percentage = (pfus / totalCarbs) * 100;

    // Display the results
    document.getElementById("totalCarbs").textContent = "Total Carbs + PFUs: " + totalCarbs;
    document.getElementById("totalInsulin").textContent = "Total Insulin: " + totalInsulin;
    document.getElementById("extendedPercentage").textContent = "Extended Bolus Percentage: " + percentage.toFixed(2) + "%";
}