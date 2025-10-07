// Массив с данными для портфолио фотографа
const photosData = [
    {
        id: 1,
        title: "Арктическое Безмолвие",
        description: "Ледяные торосы на фоне полярного заката. Экспедиция в Гренландию.",
        meta: "Зима 2024",
        imageSmall: "../img/small/photo_placeholder1.jpg",
        imageLarge: "../img/big/photo_placeholder1.jpg",
    },
    {
        id: 2,
        title: "Золотой Час в Горах",
        description: "Последние лучи солнца освещают пики Кавказских гор.",
        meta: "Осень 2025",
        imageSmall: "../img/small/photo_placeholder2.jpg",
        imageLarge: "../img/big/photo_placeholder2.jpg",
    },
    {
        id: 3,
        title: "Городские Отражения",
        description: "Небоскрёбы Москва-Сити в отражении ночной набережной.",
        meta: "Лето 2025",
        imageSmall: "../img/small/photo_placeholder3.jpg",
        imageLarge: "../img/big/photo_placeholder3.jpg",
    },
    {
        id: 4,
        title: "Туман над Равниной",
        description: "Утренний туман, окутывающий поля центральной России.",
        meta: "Весна 2024",
        imageSmall: "../img/small/photo_placeholder4.jpg",
        imageLarge: "../img/big/photo_placeholder4.jpg",
    },
    {
        id: 5,
        title: "Взгляд",
        description: "Студийный портрет. Работа со светом и тенью для передачи характера.",
        meta: "Студия, 2025",
        imageSmall: "../img/small/photo_placeholder5.jpg",
        imageLarge: "../img/big/photo_placeholder5.jpg",
    },
    {
        id: 6,
        title: "Одинокий Маяк",
        description: "Маяк на краю скалистого берега во время шторма. Остров Сахалин.",
        meta: "Лето 2024",
        imageSmall: "../img/small/photo_placeholder6.jpg",
        imageLarge: "../img/big/photo_placeholder6.jpg",
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
        
        // ВАЖНО: структура карточки изменена
        photoCard.innerHTML = `
            <div class="photo-card__image-wrapper">
                <img src="${photo.imageSmall}" alt="${photo.title}" class="photo-card__image">
            </div>
            <div class="photo-card__info">
                <h3 class="photo-card__title">${photo.title}</h3>
            </div>
        `;
        
        gallery.appendChild(photoCard);
    });
}

document.addEventListener('DOMContentLoaded', initGallery);