const portfolioData = [
    {
        id: 1,
        category: "Game Development",
        title: "UNTITLED FPS PROTOTYPE (UE4)",
        description: "A call of duty clone that i was developing in Unreal Engine 4 using call of duty modern warfare 2 and call of duty black ops assets",
        date: "2021-8-17",
        images: ["images/ue4-cod1.jpg"],
        thumbnail: "images/ue4-cod1.jpg",
        videos: ["video/ue4-cod2.mp4", "video/ue4-cod3.mp4", "video/ue4-cod4.mp4"]
    }
];

function createPortfolioItem(item) {
    return `
        <div class="portfolio-item" data-id="${item.id}">
            <img src="${item.thumbnail}" alt="${item.title} Preview">
            <h3>${item.title}</h3>
        </div>
    `;
}

function renderPortfolio() {
    const container = document.getElementById('portfolio-container');
    const categories = [...new Set(portfolioData.map(item => item.category))];

    categories.forEach(category => {
        const categoryItems = portfolioData.filter(item => item.category === category);
        const categoryHTML = `
            <section>
                <h2>${category}</h2>
                <div class="portfolio-grid">
                    ${categoryItems.map(createPortfolioItem).join('')}
                </div>
            </section>
        `;
        container.innerHTML += categoryHTML;
    });
}

function showOverlay(item) {
    const overlay = document.getElementById('overlay');
    const content = document.querySelector('.overlay-content');
    
    content.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="overlay-inner">
            <div class="overlay-media">
                ${item.videos ? item.videos.map(src => `<video src="${src}" controls></video>`).join('') : ''}
                ${item.images.map(src => `<img src="${src}" alt="${item.title}">`).join('')}
            </div>
            <div class="overlay-info">
                <h2 id="overlay-title">${item.title}</h2>
                <p id="overlay-date">${new Date(item.date).toLocaleDateString()}</p>
                <p id="overlay-description">${item.description}</p>
            </div>
        </div>
    `;

    overlay.style.display = 'block';

    document.querySelector('.close-btn').addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();

    document.getElementById('portfolio-container').addEventListener('click', (e) => {
        const portfolioItem = e.target.closest('.portfolio-item');
        if (portfolioItem) {
            const itemId = parseInt(portfolioItem.dataset.id);
            const item = portfolioData.find(i => i.id === itemId);
            if (item) {
                showOverlay(item);
            }
        }
    });

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('overlay').style.display = 'none';
    });
});
