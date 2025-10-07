// Глобальная функция для остановки всех аудиоплееров
function stopAllAudio() {
    const miniAudio = document.getElementById('miniPlayerAudio');
    if (miniAudio) { miniAudio.pause(); miniAudio.currentTime = 0; }
    
    const modalAudio = document.getElementById('audioPlayer');
    if (modalAudio) { modalAudio.pause(); modalAudio.currentTime = 0; }
    
    const miniButton = document.getElementById('miniPlayerBtn');
    if (miniButton) {
        miniButton.querySelector('.mini-player__icon').textContent = '▶';
        miniButton.querySelector('.mini-player__text').textContent = 'Космическая мелодия';
        miniButton.classList.remove('playing');
    }
    
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    if (playIcon && pauseIcon) {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

class PhotoGallery {
    constructor() {
        this.currentPhotoIndex = 0;
        this.modal = document.getElementById('modal');
        this.audioPlayer = document.getElementById('audioPlayer');
        this.isPlaying = false;
        this.volume = 0.3;
        this.initEventListeners();
        this.initAudioPlayer();
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
            if (this.modal.style.display !== 'block') return;
            if (e.key === 'Escape') this.closeModal();
            if (e.key === 'ArrowLeft') this.showPreviousPhoto();
            if (e.key === 'ArrowRight') this.showNextPhoto();
        });
    }

    initAudioPlayer() {
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());
        const progressContainer = document.querySelector('.audio-progress');
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            this.seekAudio((e.clientX - rect.left) / rect.width);
        });

        const volumeSlider = document.getElementById('volumeSlider');
        volumeSlider.addEventListener('click', (e) => {
            const rect = volumeSlider.getBoundingClientRect();
            this.setVolume((e.clientX - rect.left) / rect.width);
        });
        document.getElementById('volumeBtn').addEventListener('click', () => this.toggleMute());

        this.audioPlayer.addEventListener('timeupdate', () => { this.updateProgress(); this.updateTime(); });
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.handleAudioEnd());
        this.setVolume(this.volume);
    }

    setVolume(level) {
        this.volume = Math.max(0, Math.min(1, level));
        this.audioPlayer.volume = this.volume;
        document.getElementById('volumeLevel').style.width = (this.volume * 100) + '%';
        document.getElementById('volumeHigh').style.display = this.volume === 0 ? 'none' : 'block';
        document.getElementById('volumeMute').style.display = this.volume === 0 ? 'block' : 'none';
    }

    toggleMute() {
        if (this.audioPlayer.volume > 0) {
            this.previousVolume = this.audioPlayer.volume;
            this.setVolume(0);
        } else {
            this.setVolume(this.previousVolume || 0.3);
        }
    }

    togglePlayPause() {
        this.audioPlayer.paused ? this.playAudio() : this.pauseAudio();
    }

    playAudio() {
        stopAllAudio();
        const playPromise = this.audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
            }).catch(error => console.log("Playback blocked:", error));
        }
    }

    pauseAudio() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }

    updatePlayButton() {
        document.getElementById('playIcon').style.display = this.isPlaying ? 'none' : 'block';
        document.getElementById('pauseIcon').style.display = this.isPlaying ? 'block' : 'none';
    }
    
    seekAudio(percent) { if (this.audioPlayer.duration) this.audioPlayer.currentTime = percent * this.audioPlayer.duration; }
    updateProgress() { if (this.audioPlayer.duration) document.getElementById('progressBar').style.width = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100 + '%'; }
    updateTime() { document.getElementById('currentTime').textContent = this.formatTime(this.audioPlayer.currentTime); }
    updateDuration() { document.getElementById('duration').textContent = this.formatTime(this.audioPlayer.duration); }
    formatTime(seconds) { const mins = Math.floor(seconds / 60); const secs = Math.floor(seconds % 60); return `${mins}:${secs.toString().padStart(2, '0')}`; }
    handleAudioEnd() { this.isPlaying = false; this.updatePlayButton(); this.audioPlayer.currentTime = 0; }

    openModal(photoId) {
        stopAllAudio();
        this.currentPhotoIndex = photosData.findIndex(p => p.id === photoId);
        this.updateModalContent();
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.pauseAudio();
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
        document.getElementById('modalDate').textContent = photo.date;
        document.getElementById('modalCounter').textContent = `${this.currentPhotoIndex + 1} / ${photosData.length}`;

        this.pauseAudio();
        this.audioPlayer.currentTime = 0;
        if (photo.audio) {
            document.querySelector('.custom-audio-player').style.display = 'block';
            document.getElementById('audioTitle').textContent = photo.title;
            this.audioPlayer.src = photo.audio;
            this.audioPlayer.load();
            setTimeout(() => this.playAudio(), 500);
        } else {
            document.querySelector('.custom-audio-player').style.display = 'none';
        }
    }

    showPreviousPhoto() { if (this.currentPhotoIndex > 0) { this.currentPhotoIndex--; this.updateModalContent(); } }
    showNextPhoto() { if (this.currentPhotoIndex < photosData.length - 1) { this.currentPhotoIndex++; this.updateModalContent(); } }
}

class ThemeManager {
    constructor() {
        this.themeSwitcher = document.getElementById('themeSwitcher');
        // НОВАЯ ЛОГИКА ТЕМ
        this.currentTheme = localStorage.getItem('theme') || 'cosmic-dark';
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
        const newTheme = this.currentTheme === 'cosmic-dark' ? 'daylight' : 'cosmic-dark';
        this.setTheme(newTheme);
    }
    updateIcon() {
        this.themeSwitcher.querySelector('.theme-switcher__icon').textContent = this.currentTheme === 'cosmic-dark' ? '☀️' : '🌙';
    }
}

class MiniPlayer {
    constructor() {
        this.audio = document.getElementById('miniPlayerAudio');
        this.button = document.getElementById('miniPlayerBtn');
        this.icon = this.button.querySelector('.mini-player__icon');
        this.text = this.button.querySelector('.mini-player__text');
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
        stopAllAudio();
        this.audio.play().catch(e => console.log("Playback blocked"));
    }
    pause() { this.audio.pause(); }
    updateButton() {
        this.icon.textContent = this.isPlaying ? '⏸' : '▶';
        this.text.textContent = this.isPlaying ? 'Пауза' : 'Космическая мелодия';
        this.button.classList.toggle('playing', this.isPlaying);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
    new ThemeManager();
    new MiniPlayer();
});