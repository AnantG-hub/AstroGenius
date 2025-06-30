// 🌟 ASTROLOGY GENIUS - Main Script
  const modal = document.getElementById('authModal');
  const authForm = document.getElementById('authForm');
  const modalTitle = document.getElementById('modalTitle');
  const switchText = document.getElementById('switchText');
  const switchMode = document.getElementById('switchMode');
  let isLogin = true;
  let userLoggedIn = false;

  function toggleModal(show) {
    modal.classList.toggle('active', show);
  }

  switchMode.addEventListener('click', (e) => {
    e.preventDefault();
    isLogin = !isLogin;
    modalTitle.textContent = isLogin ? 'Login' : 'Register';
    switchText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
    switchMode.textContent = isLogin ? "Register" : "Login";
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    userLoggedIn = true;
    alert(`${isLogin ? "Login" : "Registration"} Successful!`);
    toggleModal(false);
    authForm.reset();
  });

  // Reminder every 1 minute if not logged in
  setInterval(() => {
    if (!userLoggedIn) {
      alert("Please login to continue using Astrology Genius.");
    }
  }, 60000); // 60,000ms = 1 minute
 // Show section when Panchang link clicked
function showRealPanchang() {
  const sec = document.getElementById('realPanchang');
  sec.style.display = 'block';
  sec.scrollIntoView({ behavior: 'smooth' });
}

// Auto-fill lat/lon on place blur
document.getElementById('p_place').addEventListener('blur', async function() {
  const val = this.value.trim();
  if (!val) return;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}`);
    const data = await res.json();
    if (data[0]) {
      document.getElementById('p_lat').value = data[0].lat;
      document.getElementById('p_lon').value = data[0].lon;
    } else alert('Place not found');
  } catch(e) { console.error(e); }
});

  /*light and dark */

  document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      const isDark = document.body.classList.contains("dark-theme");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });



// Form submit — fetch Panchang from Prokerala API
document.getElementById('panchangForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const dt = document.getElementById('p_date').value;
  const lat = document.getElementById('p_lat').value;
  const lon = document.getElementById('p_lon').value;
  // Call backend proxy to protect API key
  const res = await fetch(`/api/panchang?date=${dt}&lat=${lat}&lon=${lon}`);
  const json = await res.json();
  const d = json.data;
  document.getElementById('sunrise').textContent = d.sunrise;
  document.getElementById('tithi').textContent = d.tithi.details.tithi_name;
  document.getElementById('nakshatra').textContent = d.nakshatra.details.nakshatra_name;
  document.getElementById('yoga').textContent = d.yoga.details.yoga_name;
  document.getElementById('karana').textContent = d.karana.details.karana_name;
  document.getElementById('panchangOutput').style.display = 'block';
});


  // 🌐 GOOGLE TRANSLATE LANGUAGE SWITCHER

  // Initialize Google Translate
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi',
      layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
    }, 'google_translate_element');
  }

  // Load the Google Translate script
  (function () {
    const gtScript = document.createElement('script');
    gtScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(gtScript);
  })();

  // Link custom dropdown to Google Translate combo after it's loaded
  document.addEventListener("DOMContentLoaded", () => {
    const langSwitcher = document.getElementById('languageSwitcher');

    langSwitcher.addEventListener('change', () => {
      const selectedLang = langSwitcher.value;

      const interval = setInterval(() => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
          googleSelect.value = selectedLang;
          googleSelect.dispatchEvent(new Event('change'));
          clearInterval(interval);
        }
      }, 500); // check every 500ms until combo is available

      // Remove banner
      setTimeout(() => {
        const banner = document.querySelector('iframe.goog-te-banner-frame');
        if (banner) banner.remove();
        document.body.style.top = '0px'; // prevent layout shift
      }, 1500);
    });
  });

// 🌙 PANCHANG GENERATOR
// Replace default lat/lon/timezone as needed
document.getElementById('p_lat').value = '28.6139'; // Default to Delhi
document.getElementById('p_lon').value = '77.2090'; // Default to Delhi 
async function geocodePlace(place) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
  const data = await res.json();
  return data[0] ? { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) } : null;
}

document.getElementById('p_place').addEventListener('change', async () => {
  const loc = await geocodePlace(document.getElementById('p_place').value);
  if (loc) {
    document.getElementById('p_lat').value = loc.lat.toFixed(5);
    document.getElementById('p_lon').value = loc.lon.toFixed(5);
  } else alert('Place not found');
});

document.getElementById('panchangForm').addEventListener('submit', async e => {
  e.preventDefault();
  const date = document.getElementById('p_date').value.split('-').map(Number);
  const now = new Date();
  const body = {
    day: date[2], month: date[1], year: date[0],
    hour: now.getHours(), min: now.getMinutes(),
    lat: parseFloat(document.getElementById('p_lat').value),
    lon: parseFloat(document.getElementById('p_lon').value),
    tzone: new Date().getTimezoneOffset() / -60
  };

  const resp = await fetch('/panchang', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await resp.json();

  document.getElementById('sunrise').textContent = data.sunrise;
  document.getElementById('tithi').textContent = data.tithi;
  document.getElementById('nakshatra').textContent = data.nakshatra;
  document.getElementById('yoga').textContent = data.yog;
  document.getElementById('karana').textContent = data.karan;
  document.getElementById('panchangOutput').style.display = 'block';
});





