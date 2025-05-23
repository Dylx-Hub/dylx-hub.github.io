const BACKEND_URL = 'https://spotify-server-2q2a.onrender.com';

async function loadSpotify() {
  const res = await fetch(`${BACKEND_URL}/api/nowplaying`);
  const data = await res.json();
  const container = document.getElementById('spotify-data');

  if (data.is_playing) {
    container.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="${data.albumImageUrl}" alt="Album Cover" class="w-16 h-16 rounded" />
        <div>
          <p class="font-semibold text-white">${data.title}</p>
          <p class="text-sm text-gray-400">${data.artist}</p>
          <a href="${data.songUrl}" target="_blank" class="text-[#00FFAB] underline text-xs">View on Spotify</a>
        </div>
      </div>
    `;
  } else {
    container.textContent = 'Gerade nichts aktiv.';
  }
}

async function loadSteam() {
  const res = await fetch(`${BACKEND_URL}/api/steam`);
  const data = await res.json();
  const container = document.getElementById('steam-data');

  if (data && data.game) {
    container.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="${data.logo}" alt="Game Cover" class="w-16 h-16 rounded" />
        <div>
          <p class="font-semibold text-white">${data.game}</p>
          <a href="${data.profile}" target="_blank" class="text-[#00FFAB] underline text-xs">View Profile</a>
        </div>
      </div>
    `;
  } else {
    container.textContent = 'Gerade nicht im Spiel.';
  }
}

async function loadDiscord() {
  const res = await fetch(`${BACKEND_URL}/api/discord`);
  const data = await res.json();
  const container = document.getElementById('discord-data');

  if (data) {
    container.innerHTML = `
      <p>${data.username} ist ${data.status}</p>
    `;
  } else {
    container.textContent = 'Nicht verfügbar.';
  }
}

loadSpotify();
loadSteam();
loadDiscord();
