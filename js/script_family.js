// Глобальная функция для остановки всех аудиоплееров
function stopAllAudio() {
    const miniAudio = document.getElementById('miniPlayerAudio');
    if (miniAudio) {
        miniAudio.pause();
    }
    const miniButton = document.getElementById('miniPlayerBtn');
    if (miniButton) {
        miniButton.querySelector('.mini-player__icon').textContent = '▶';
        miniButton.classList.remove('playing');
    }
}

class PhotoGallery {
    constructor() {
        this.currentPhotoIndex = 0;
        this.modal = document.getElementById('modal');
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('gallery').addEventListener('click', (e) => {
            const photoCard = e.target.closest('.photo-card');
            if (photoCard) this.openModal(parseInt(photoCard.getAttribute('data-id')));
        });

        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.closeModal(); });

        document.getElementById('prevBtn').addEventListener('click', () => this.showPreviousPhoto());
        document.getElementById('nextBtn').addEventListener('click', () => this.showNextPhoto());

        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display !== 'flex') return;
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowLeft') this.showPreviousPhoto();
            if (e.key === 'ArrowRight') this.showNextPhoto();
        });
    }

    openModal(photoId) {
        stopAllAudio(); // Ставим фоновую музыку на паузу при открытии фото
        this.currentPhotoIndex = photosData.findIndex(p => p.id === photoId);
        this.updateModalContent();
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    updateModalContent() {
        const photo = photosData[this.currentPhotoIndex];
        const modalImage = document.getElementById('modalImage');

        modalImage.style.opacity = 0;
        setTimeout(() => {
            modalImage.src = photo.imageLarge;
            modalImage.alt = photo.title;
            modalImage.onload = () => { modalImage.style.opacity = 1; };
        }, 200);

        document.getElementById('modalTitle').textContent = photo.title;
        document.getElementById('modalDescription').textContent = photo.description;
        document.getElementById('modalMeta').textContent = photo.meta;
        document.getElementById('modalCounter').textContent = `${this.currentPhotoIndex + 1} / ${photosData.length}`;
    }

    showPreviousPhoto() {
        if (this.currentPhotoIndex > 0) {
            this.currentPhotoIndex--;
            this.updateModalContent();
        }
    }

    showNextPhoto() {
        if (this.currentPhotoIndex < photosData.length - 1) {
            this.currentPhotoIndex++;
            this.updateModalContent();
        }
    }
}

class ThemeManager {
    constructor() {
        this.themeSwitcher = document.getElementById('themeSwitcher');
        this.currentTheme = localStorage.getItem('theme') || 'warm-light';
        this.init();
    }
    init() {
        this.setTheme(this.currentTheme);
        this.themeSwitcher.addEventListener('click', () => this.toggleTheme());
    }
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateIcon();
    }
    toggleTheme() {
        const newTheme = this.currentTheme === 'warm-light' ? 'warm-dark' : 'warm-light';
        this.setTheme(newTheme);
    }
    updateIcon() {
        this.themeSwitcher.querySelector('.theme-switcher__icon').textContent = this.currentTheme === 'warm-light' ? '🌙' : '☀️';
    }
}

class MiniPlayer {
    constructor() {
        this.audio = document.getElementById('miniPlayerAudio');
        this.button = document.getElementById('miniPlayerBtn');
        this.icon = this.button.querySelector('.mini-player__icon');
        this.isPlaying = false;
        this.init();
    }
    init() {
        this.button.addEventListener('click', () => this.togglePlay());
        this.audio.addEventListener('play', () => { this.isPlaying = true; this.updateButton(); });
        this.audio.addEventListener('pause', () => { this.isPlaying = false; this.updateButton(); });
        this.audio.addEventListener('ended', () => { this.isPlaying = false; this.updateButton(); });
    }
    togglePlay() { this.audio.paused ? this.play() : this.pause(); }
    play() {
        this.audio.play().catch(e => console.log("Playback blocked"));
    }
    pause() { this.audio.pause(); }
    updateButton() {
        this.icon.textContent = this.isPlaying ? '⏸' : '▶';
        this.button.classList.toggle('playing', this.isPlaying);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
    new ThemeManager();
    new MiniPlayer();
});