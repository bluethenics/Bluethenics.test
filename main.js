// Initial values for each section
let sectionCounts = { A: 0, B: 0, C: 0 };
let totalTicks = 15;  // Total number of checkboxes

// Retrieve saved progress from localStorage
const savedProgress = JSON.parse(localStorage.getItem('progress'));
if (savedProgress) {
    sectionCounts = savedProgress;
}

// Initialize the pie chart
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
    type: 'pie', // Pie chart for visualizing the progress
    data: {
        labels: ['Section A', 'Section B', 'Section C'],
        datasets: [{
            label: 'Progress',
            data: [sectionCounts.A, sectionCounts.B, sectionCounts.C],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each section
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return 'Progress: ' + tooltipItem.raw + '%'; // Show percentage
                    }
                }
            }
        }
    }
});

// Function to update chart data (to be called after checkbox change)
function updateChart() {
    // Ensure no negative values, and update the chart with the correct data
    const sectionAProgress = Math.max(0, (sectionCounts.A / totalTicks) * 100); // Prevent negative values
    const sectionBProgress = Math.max(0, (sectionCounts.B / totalTicks) * 100); // Prevent negative values
    const sectionCProgress = Math.max(0, (sectionCounts.C / totalTicks) * 100); // Prevent negative values

    // Update the chart's data
    progressChart.data.datasets[0].data = [sectionAProgress, sectionBProgress, sectionCProgress];
    progressChart.update(); // Re-render the chart
}

// Function to save progress to localStorage
function saveProgress() {
    localStorage.setItem('progress', JSON.stringify(sectionCounts));
}

// Add event listeners to checkboxes
document.querySelectorAll('.tick').forEach((checkbox, index) => {
    let section;
    // Determine the section based on the index
    if (index < 5) section = 'A';   // First 5 checkboxes are for section A
    else if (index < 10) section = 'B';   // Next 5 checkboxes for section B
    else section = 'C';   // Last 5 checkboxes for section C

    // Set the initial state of the checkboxes based on localStorage
    checkbox.checked = savedProgress && savedProgress[section] > 0;

    // Add event listener to handle checkbox state changes
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // If checked, increment the section's count, ensuring it does not exceed totalTicks
            sectionCounts[section] = Math.min(sectionCounts[section] + 1, totalTicks);
        } else {
            // If unchecked, decrement the section's count but ensure it doesn't go below zero
            sectionCounts[section] = Math.max(sectionCounts[section] - 1, 0);
        }

        // Update the chart and save progress to localStorage
        updateChart();
        saveProgress(); // Save the updated progress to localStorage
    });
});

// Tooltip functionality (remains unchanged)
document.querySelectorAll('.tooltip-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // Toggle the tooltip visibility
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-box';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.position = 'absolute';
        tooltip.style.top = '25px';
        tooltip.style.left = '-10px';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '8px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '12px';
        tooltip.style.textAlign = 'center';
        tooltip.style.width = '180px';
        tooltip.style.zIndex = '1';

        // Remove any existing tooltips before showing new one
        document.querySelectorAll('.tooltip-box').forEach(box => box.remove());

        // Add the new tooltip to the icon's parent element
        this.parentElement.appendChild(tooltip);

        // Remove tooltip on second click
        tooltip.addEventListener('click', function() {
            tooltip.remove();
        });
    });
});






function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}










