const api1 = 'http://localhost:7255/api/all';
// api2 será montada dinamicamente com o id do filme

async function fetchData() {
    const usersRes = await fetch(api1);
    const users = await usersRes.json();
    renderMovies(users);
}

function renderMovies(cards) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    cards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.innerHTML = `
            <div class="card-title">${card.title}</div>
            <div class="card-content"><img src="${card.thumb}" alt="${card.title}"></div>
        `;
        cardEl.addEventListener('click', () => showVideo(card.id));
        container.appendChild(cardEl);
    });
}

async function showVideo(id) {
    const api2 = `http://localhost:7216/api/Detail?id=${id}`;
    const res = await fetch(api2);
    const detail = await res.json();
    // Supondo que o vídeo está em detail.videoUrl
    openModal(detail.videoUrl);
}

function openModal(videoUrl) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    video.src = videoUrl;
    modal.style.display = 'block';
}

//document.getElementById('close-modal').onclick = function () {
//    document.getElementById('video-modal').style.display = 'none';
//    document.getElementById('modal-video').src = '';
//};

window.onclick = function (event) {
    const modal = document.getElementById('video-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.getElementById('modal-video').src = '';
    }
};

fetchData();