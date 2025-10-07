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

        // Плавное появление изображения
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
        this.currentTheme = localStorage.getItem('theme') || 'light'; // Светлая тема по умолчанию
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
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
    updateIcon() {
        this.themeSwitcher.querySelector('.theme-switcher__icon').textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
    new ThemeManager();
});