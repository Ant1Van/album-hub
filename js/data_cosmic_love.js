// Массив с данными для темы "Космическая Любовь"
const photosData = [
    {
        id: 1,
        title: "Первая встреча под луной",
        description: "В ту ночь даже звёзды замерли, чтобы увидеть начало нашей истории.",
        date: "Новолуние, 2024",
        imageSmall: "../img/small/cosmic_placeholder1.jpg",
        imageLarge: "../img/big/cosmic_placeholder1.jpg",
        audio: "../audio/cosmic_track1.mp3"
    },
    {
        id: 2,
        title: "Наше созвездие 'Мы'",
        description: "Моменты, когда мы соединяем точки наших судеб в единый узор на небе.",
        date: "Звездопад Персеиды",
        imageSmall: "../img/small/cosmic_placeholder2.jpg",
        imageLarge: "../img/big/cosmic_placeholder2.jpg",
        audio: "../audio/cosmic_track2.mp3"
    },
    {
        id: 3,
        title: "Разговоры до рассвета",
        description: "Когда целой ночи мало, чтобы поделиться друг с другом своими вселенными.",
        date: "Рассвет на Венере",
        imageSmall: "../img/small/cosmic_placeholder3.jpg",
        imageLarge: "../img/big/cosmic_placeholder3.jpg",
        audio: "../audio/cosmic_track3.mp3"
    },
    {
        id: 4,
        title: "Танец в свете млечного пути",
        description: "Движения в унисон под музыку космоса, где мы были единственными зрителями.",
        date: "Галактический вечер",
        imageSmall: "../img/small/cosmic_placeholder4.jpg",
        imageLarge: "../img/big/cosmic_placeholder4.jpg",
        audio: "../audio/cosmic_track4.mp3"
    },
    {
        id: 5,
        title: "Обещания, данные комете",
        description: "Наши клятвы, летящие сквозь вечность вместе с хвостом небесной странницы.",
        date: "Парад планет",
        imageSmall: "../img/small/cosmic_placeholder5.jpg",
        imageLarge: "../img/big/cosmic_placeholder5.jpg",
        audio: "../audio/cosmic_track5.mp3"
    },
    {
        id: 6,
        title: "Бесконечность в твоих глазах",
        description: "Взгляд, в котором я вижу отражение всех звёзд и понимаю, что нашёл свой дом.",
        date: "Навсегда",
        imageSmall: "../img/small/cosmic_placeholder6.jpg",
        imageLarge: "../img/big/cosmic_placeholder6.jpg",
        audio: "../audio/cosmic_track6.mp3"
    }
];

// Функция для инициализации галереи (остаётся без изменений)
function initGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 
    photosData.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.setAttribute('data-id', photo.id);
        photoCard.innerHTML = `
            <img src="${photo.imageSmall}" alt="${photo.title}" class="photo-card__image">
            <div class="photo-card__overlay">
                <h3 class="photo-card__title">${photo.title}</h3>
            </div>
        `;
        gallery.appendChild(photoCard);
    });
}
document.addEventListener('DOMContentLoaded', initGallery);