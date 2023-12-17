// Separate JavaScript file

// Async function to fetch and display CSV data
async function displayCSVData() {
    try {
        const response = await fetch('T1D_populate.csv');
        const data = await response.text();

        // Parse CSV data
        let rows = data.split('\n');
        let tableData = [];

        for (let i = 0; i < rows.length; i++) {
            let rowData = rows[i].split(',');
            tableData.push(rowData);
        }

        // Create and populate the table with CSV data
        let table = document.getElementById("csvDataTable");
        for (let i = 0; i < tableData.length; i++) {
            let row = table.insertRow(i);
            for (let j = 0; j < tableData[i].length; j++) {
                let cell = row.insertCell(j);
                cell.innerHTML = tableData[i][j];
            }
        }
    } catch (error) {
        console.error('Error fetching CSV:', error);
        // Inform the user that an error occurred
        document.getElementById('csvDataTable').textContent = 'Error fetching CSV data.';
    }
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