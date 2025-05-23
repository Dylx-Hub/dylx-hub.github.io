const BACKEND_URL = 'https://spotify-server-2q2a.onrender.com';

// Access Token aus der URL extrahieren
function getAccessTokenFromHash() {
  const hash = window.location.hash;
  if (hash.includes('access_token=')) {
    return hash.split('access_token=')[1].split('&')[0];
  }
  return null;
}

// Spotify-Daten laden
async function loadSpotify(token) {
  const container = document.getElementById('spotify-data');
  if (!token) {
    container.textContent = 'Kein Access Token gefunden.';
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/nowplaying?access_token=${token}`);
    const data = await res.json();

    if (data.is_playing) {
      container.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${data.albumImageUrl}" alt="Album Cover" class="w-16 h-16 rounded" />
          <div>
            <p class="font-semibold text-white">${data.title}</p>
            <p class="text-sm text-gray-400">${data.artist}</p>
            <a href="${data.songUrl}" target="_blank" class="text-[#00FFAB] underline text-xs">Auf Spotify öffnen</a>
          </div>
        </div>
      `;
    } else {
      container.textContent = 'Gerade wird nichts abgespielt.';
    }
  } catch (error) {
    console.error('Fehler beim Laden von Spotify:', error);
    container.textContent = 'Fehler beim Laden der Spotify-Daten.';
  }
}

// Steam-Daten laden
async function loadSteam() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/steam`);
    const data = await res.json();
    const container = document.getElementById('steam-data');

    if (data && data.game) {
      container.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${data.logo}" alt="Game Cover" class="w-16 h-16 rounded" />
          <div>
            <p class="font-semibold text-white">${data.game}</p>
            <a href="${data.profile}" target="_blank" class="text-[#00FFAB] underline text-xs">Steam-Profil</a>
          </div>
        </div>
      `;
    } else {
      container.textContent = 'Gerade nicht im Spiel.';
    }
  } catch (error) {
    console.error('Fehler beim Laden von Steam:', error);
    document.getElementById('steam-data').textContent = 'Fehler beim Laden der Steam-Daten.';
  }
}

// Discord-Daten laden
async function loadDiscord() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/discord`);
    const data = await res.json();
    const container = document.getElementById('discord-data');

    if (data && data.username) {
      container.innerHTML = `<p>${data.username} ist ${data.status}</p>`;
    } else {
      container.textContent = 'Nicht verfügbar.';
    }
  } catch (error) {
    console.error('Fehler beim Laden von Discord:', error);
    document.getElementById('discord-data').textContent = 'Fehler beim Laden der Discord-Daten.';
  }
}

// Beim Laden der Seite alles initialisieren
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = getAccessTokenFromHash();
  loadSpotify(accessToken);
  loadSteam();
  loadDiscord();

  // Entferne den Access Token aus der URL
  if (accessToken) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
