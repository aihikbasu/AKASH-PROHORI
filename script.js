function switchTab(id, el) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  el.classList.add('active');
  if (id === 'forecast') initForecastChart();
  if (id === 'alerts') initAlertHistChart();
  if (id === 'airquality') initAQIChart();
  if (id === 'analytics') initAnalyticsCharts();
}

// Clock
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  const el = document.getElementById('live-clock');
  if (el) el.textContent = h + ':' + m + ':' + s + ' IST';
}
setInterval(updateClock, 1000);
updateClock();

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(150,185,215,0.6)', font: { family: 'Space Mono', size: 9 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(150,185,215,0.6)', font: { family: 'Space Mono', size: 9 } } }
  }
};

let chartsInit = {};

function initForecastChart() {
  if (chartsInit.forecast) return;
  chartsInit.forecast = true;
  new Chart(document.getElementById('forecastChart'), {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: 'High', data: [34, 35, 33, 30, 28, 31, 33], borderColor: '#ff5252', tension: 0.3, fill: false, pointRadius: 4 },
        { label: 'Low', data: [26, 27, 25, 24, 23, 25, 26], borderColor: '#00e5ff', tension: 0.3, fill: false, pointRadius: 4 },
        { label: 'Rain %', data: [12, 8, 45, 82, 90, 60, 30], backgroundColor: 'rgba(0,229,255,0.15)', type: 'bar', yAxisID: 'yRain' }
      ]
    },
    options: {
      ...chartDefaults,
      scales: {
        ...chartDefaults.scales,
        y: { type: 'linear', position: 'left', title: { display: true, text: 'Temp °C', color: 'rgba(150,185,215,0.5)' }, grid: { color: 'rgba(255,255,255,0.04)' } },
        yRain: { type: 'linear', position: 'right', min: 0, max: 100, grid: { drawOnChartArea: false }, title: { display: true, text: 'Rain Prob %', color: 'rgba(150,185,215,0.5)' } }
      }
    }
  });
}

function initAlertHistChart() {
  if (chartsInit.alerts) return;
  chartsInit.alerts = true;
  new Chart(document.getElementById('alertHistChart'), {
    type: 'bar',
    data: {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
      datasets: [{ data: [12, 8, 15, 5], backgroundColor: ['#00e676','#ffd600','#ff6d00','#ff1744'] }]
    },
    options: { ...chartDefaults }
  });
}

function initAQIChart() {
  if (chartsInit.airquality) return;
  chartsInit.airquality = true;
  new Chart(document.getElementById('aqiChart'), {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{ data: [42, 55, 68, 72, 50, 41, 38], borderColor: '#69f0ae', tension: 0.4, fill: true, backgroundColor: 'rgba(105,240,174,0.05)' }]
    },
    options: { ...chartDefaults }
  });
}

function initAnalyticsCharts() {
  if (chartsInit.analytics) return;
  chartsInit.analytics = true;
  new Chart(document.getElementById('rainfallChart'), {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        {
          data: [14,22,36,52,130,280,320,290,200,94,18,8],
          backgroundColor: (ctx) => {
            const v = ctx.raw;
            if (v > 250) return 'rgba(255,23,68,0.7)';
            if (v > 150) return 'rgba(255,109,0,0.6)';
            if (v > 80) return 'rgba(124,77,255,0.6)';
            return 'rgba(0,229,255,0.5)';
          },
          borderRadius: 4
        }
      ]
    },
    options: { ...chartDefaults }
  });
  new Chart(document.getElementById('tempRangeChart'), {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
        { label: 'Max', data: [26,29,34,36,38,36,32,32,32,31,28,25], borderColor: '#ff6d00', tension: 0.4, fill: false, pointRadius: 3, pointBackgroundColor: '#ff6d00' },
        { label: 'Min', data: [13,16,22,26,29,28,26,26,25,22,17,13], borderColor: '#00e5ff', tension: 0.4, fill: false, pointRadius: 3, pointBackgroundColor: '#00e5ff' }
      ]
    },
    options: { ...chartDefaults }
  });
}

// Interactive Simulated Databank Object Definitions
const LOCATIONS = [
  { name: 'Kolkata', region: 'West Bengal — IN', flag: '🇮🇳', temp: 32, feels: 38, desc: 'Partly Cloudy', icon: '⛅', hum: 78, wind: 18, precip: 12, pressure: 1009, uv: 8, vis: 6.5, dew: 25 },
  { name: 'Durgapur', region: 'West Bengal — IN', flag: '🇮🇳', temp: 36, feels: 42, desc: 'Sunny / Haze', icon: '☀️', hum: 55, wind: 12, precip: 5, pressure: 1006, uv: 11, vis: 5.0, dew: 22 },
  { name: 'Siliguri', region: 'West Bengal — IN', flag: '🇮🇳', temp: 27, feels: 30, desc: 'Light Rain', icon: '🌦', hum: 88, wind: 10, precip: 45, pressure: 1011, uv: 5, vis: 8.0, dew: 23 },
  { name: 'Digha', region: 'West Bengal — IN', flag: '🇮🇳', temp: 30, feels: 37, desc: 'Heavy Squalls', icon: '⛈', hum: 92, wind: 42, precip: 85, pressure: 1002, uv: 3, vis: 3.0, dew: 27 },
  { name: 'New Delhi', region: 'NCR — IN', flag: '🇮🇳', temp: 41, feels: 46, desc: 'Extreme Heatwave', icon: '☀️', hum: 25, wind: 22, precip: 0, pressure: 1004, uv: 12, vis: 4.0, dew: 18 },
  { name: 'Mumbai', region: 'Maharashtra — IN', flag: '🇮🇳', temp: 29, feels: 35, desc: 'Monsoon Overcast', icon: '🌧', hum: 85, wind: 30, precip: 70, pressure: 1007, uv: 4, vis: 6.0, dew: 26 },
  { name: 'Bengaluru', region: 'Karnataka — IN', flag: '🇮🇳', temp: 26, feels: 27, desc: 'Pleasant / Clear', icon: '🌤', hum: 52, wind: 15, precip: 10, pressure: 1014, uv: 9, vis: 10.0, dew: 16 },
  { name: 'London', region: 'United Kingdom', flag: '🇬🇧', temp: 16, feels: 15, desc: 'Overcast Drizzle', icon: '🌧', hum: 82, wind: 20, precip: 40, pressure: 1016, uv: 3, vis: 9.0, dew: 11 },
  { name: 'New York', region: 'United States', flag: '🇺🇸', temp: 22, feels: 22, desc: 'Mostly Sunny', icon: '☀️', hum: 50, wind: 14, precip: 0, pressure: 1013, uv: 7, vis: 12.0, dew: 12 },
  { name: 'Tokyo', region: 'Japan', flag: '🇯🇵', temp: 20, feels: 20, desc: 'Passing Clouds', icon: '🌤', hum: 60, wind: 8, precip: 2, pressure: 1018, uv: 5, vis: 10.0, dew: 11 },
  { name: 'Chennai', region: 'Tamil Nadu — IN', flag: '🇮🇳', temp: 34, feels: 41, desc: 'Humid / Clouds', icon: '⛅', hum: 70, wind: 24, precip: 15, pressure: 1008, uv: 10, vis: 7.0, dew: 26 },
  { name: 'Hyderabad', region: 'Telangana — IN', flag: '🇮🇳', temp: 35, feels: 39, desc: 'Clear Sky', icon: '☀️', hum: 45, wind: 16, precip: 4, pressure: 1005, uv: 9, vis: 10.0, dew: 21 },
  { name: 'Bhubaneswar', region: 'Odisha — IN', flag: '🇮🇳', temp: 33, feels: 38, desc: 'Thunderstorm', icon: '⛈', hum: 80, wind: 28, precip: 55, pressure: 1006, uv: 6, vis: 4.0, dew: 28 },
  { name: 'Guwahati', region: 'Assam — IN', flag: '🇮🇳', temp: 28, feels: 32, desc: 'Heavy Rain', icon: '🌧', hum: 90, wind: 18, precip: 72, pressure: 1008, uv: 4, vis: 3.5, dew: 26 },
  { name: 'Dhaka', region: 'Bangladesh', flag: '🇧🇩', temp: 31, feels: 37, desc: 'Cloudy', icon: '☁️', hum: 82, wind: 15, precip: 30, pressure: 1008, uv: 7, vis: 5.5, dew: 27 },
  { name: 'Dubai', region: 'UAE', flag: '🇦🇪', temp: 39, feels: 44, desc: 'Scorching Sun', icon: '🌤', hum: 40, wind: 18, precip: 0, pressure: 1000, uv: 12, vis: 7.0, dew: 26 },
  { name: 'Sydney', region: 'Australia', flag: '🇦🇺', temp: 18, feels: 17, desc: 'Sunny', icon: '☀️', hum: 48, wind: 22, precip: 3, pressure: 1020, uv: 5, vis: 20.0, dew: 7 },
];

let currentLocIdx = 0;
let dropdownOpen = false;

function renderLocList(filter = '') {
  const list = document.getElementById('loc-list');
  const filtered = LOCATIONS.filter(l => l.name.toLowerCase().includes(filter.toLowerCase()));
  list.innerHTML = '';
  filtered.forEach((loc) => {
    const originalIdx = LOCATIONS.findIndex(l => l.name === loc.name);
    const div = document.createElement('div');
    div.className = 'loc-option' + (originalIdx === currentLocIdx ? ' selected' : '');
    div.onclick = () => selectLocation(originalIdx);
    div.innerHTML = `
      <span class="loc-flag">${loc.flag}</span>
      <div style="display:flex;flex-direction:column;">
        <span class="loc-option-name">${loc.name}</span>
        <span class="loc-option-sub">${loc.region}</span>
      </div>
    `;
    list.appendChild(div);
  });
}

function toggleLocDropdown() {
  dropdownOpen = !dropdownOpen;
  const dd = document.getElementById('loc-dropdown');
  dd.style.display = dropdownOpen ? 'block' : 'none';
  if (dropdownOpen) {
    document.getElementById('loc-search').value = '';
    renderLocList();
    setTimeout(() => document.getElementById('loc-search').focus(), 50);
  }
}

function filterLocations() {
  renderLocList(document.getElementById('loc-search').value);
}

function selectLocation(idx) {
  currentLocIdx = idx;
  const loc = LOCATIONS[idx];
  document.getElementById('loc-label').textContent = loc.name + ', ' + loc.region;
  document.getElementById('loc-dropdown').style.display = 'none';
  dropdownOpen = false;
  updateWeatherDisplay(loc);
  chartsInit = {};
}

function updateWeatherDisplay(loc) {
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('cur-temp', loc.temp);
  setTxt('cur-desc', loc.desc);
  setTxt('cur-icon', loc.icon);
  setTxt('cur-location', '↑ ' + loc.name + ' / ' + loc.region);
  setTxt('cur-hum', loc.hum + '%');
  setTxt('cur-wind', loc.wind + ' km/h');
  setTxt('cur-precip', loc.precip + '%');
  setTxt('cur-pressure', loc.pressure + ' hPa');
  setTxt('cur-uv', loc.uv);
  setTxt('cur-vis', loc.vis + ' km');
  setTxt('cur-dew', loc.dew + '°C');
}