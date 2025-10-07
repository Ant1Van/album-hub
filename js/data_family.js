// Массив с данными для семейного альбома
const photosData = [
    {
        id: 1,
        title: "Новогоднее волшебство",
        description: "Тот самый момент, когда все вместе наряжали ёлку и ждали чуда.",
        meta: "Декабрь 2024",
        imageSmall: "../img/small/family_placeholder1.jpg",
        imageLarge: "../img/big/family_placeholder1.jpg",
    },
    {
        id: 2,
        title: "Первые шаги",
        description: "Маленькая победа, которую мы запомним на всю жизнь. Такой важный и трогательный момент.",
        meta: "Весна 2025",
        imageSmall: "../img/small/family_placeholder2.jpg",
        imageLarge: "../img/big/family_placeholder2.jpg",
    },
    {
        id: 3,
        title: "Лето у бабушки",
        description: "Беззаботные дни в деревне, пахнущие свежескошенной травой и яблочным пирогом.",
        meta: "Июль 2024",
        imageSmall: "../img/small/family_placeholder3.jpg",
        imageLarge: "../img/big/family_placeholder3.jpg",
    },
    {
        id: 4,
        title: "Выпускной в саду",
        description: "Кажется, только вчера мы вели его в ясли, а сегодня он уже прощается с детским садом.",
        meta: "Май 2025",
        imageSmall: "../img/small/family_placeholder4.jpg",
        imageLarge: "../img/big/family_placeholder4.jpg",
    },
    {
        id: 5,
        title: "Три поколения",
        description: "Самые дорогие люди на одном фото. Наша сила и наша опора.",
        meta: "Осень 2024",
        imageSmall: "../img/small/family_placeholder5.jpg",
        imageLarge: "../img/big/family_placeholder5.jpg",
    },
    {
        id: 6,
        title: "Воскресная прогулка",
        description: "Простые моменты, которые и составляют наше счастье. Просто быть вместе.",
        meta: "Осень 2025",
        imageSmall: "../img/small/family_placeholder6.jpg",
        imageLarge: "../img/big/family_placeholder6.jpg",
    }
];

// Функция для инициализации галереи
function initGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; 
    photosData.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.setAttribute('data-id', photo.id);
        
        photoCard.innerHTML = `
            <div class="photo-card__image-wrapper">
                <img src="${photo.imageSmall}" alt="${photo.title}" class="photo-card__image">
            </div>
            <div class="photo-card__info">
                <h3 class="photo-card__title">${photo.title}</h3>
                <p class="photo-card__meta">${photo.meta}</p>
            </div>
        `;
        
        gallery.appendChild(photoCard);
    });
}

document.addEventListener('DOMContentLoaded', initGallery);