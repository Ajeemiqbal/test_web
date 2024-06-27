// public/scripts.js

const heartRateChart = new Chart(document.getElementById('heartRateChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: [], // Initialize with empty labels
      datasets: [{
        label: 'Heart Rate',
        data: [], // Start with an empty dataset
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        lineTension: 0.2,
        pointRadius: 0, // Make data points invisible
        pointHoverRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      },
      scales: {
        x: {
          display: false, // Hide x-axis
        },
        y: {
          min: 50,
          max: 100,
        }
      }
    }
  });
  
  const bloodPressureChart = new Chart(document.getElementById('bloodPressureChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: [], // Initialize with empty labels
      datasets: [{
        label: 'Blood Pressure',
        data: [], // Start with an empty dataset
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
        pointRadius: 0, // Make data points invisible
        pointHoverRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      },
      scales: {
        x: {
          display: false, // Hide x-axis
        },
        y: {
          min: 110,
          max: 140,
        }
      }
    }
  });
  
  const spo2Chart = new Chart(document.getElementById('spo2Chart').getContext('2d'), {
    type: 'line',
    data: {
      labels: [], // Initialize with empty labels
      datasets: [{
        label: 'SpO2',
        data: [], // Start with an empty dataset
        borderColor: 'rgb(0, 192, 192)',
        fill: false,
        pointRadius: 0, // Make data points invisible
        pointHoverRadius: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      },
      scales: {
        x: {
          display: false, // Hide x-axis
        },
        y: {
          min: 90,
          max: 110,
        }
      }
    }
  });
  
  async function fetchData() {
    const response = await fetch('/api/button');
    const data = await response.json();
    return data;
  }
  
  async function updateCharts() {
    const data = await fetchData();
  
    const { heartRate, bloodPressure, SpO2 } = data;
  
    heartRateChart.data.labels = Array.from({ length: heartRate.length }, (_, i) => i + 1);
    heartRateChart.data.datasets[0].data = heartRate;
    heartRateChart.update();
  
    bloodPressureChart.data.labels = Array.from({ length: bloodPressure.length }, (_, i) => i + 1);
    bloodPressureChart.data.datasets[0].data = bloodPressure;
    bloodPressureChart.update();
  
    spo2Chart.data.labels = Array.from({ length: SpO2.length }, (_, i) => i + 1);
    spo2Chart.data.datasets[0].data = SpO2;
    spo2Chart.update();
  }
  
  // Initial chart update on page load
  updateCharts();
  
  // Periodically update the charts based on new button state
  setInterval(updateCharts, 1000); // Check for updates every second
  