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