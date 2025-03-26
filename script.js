// Модальное окно
const modal = document.getElementById("social-links-modal");
const btn = document.getElementById("about-me-button");
const span = document.getElementsByClassName("close")[0];

// Открыть модальное окно при клике на кнопку
btn.onclick = function() {
    modal.style.display = "block"; //  "block"
};

// Закрыть модальное окно при клике на крестик
span.onclick = function() {
    modal.style.display = "none";
};

// Закрыть модальное окно при клике вне окна
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Переход на страницы игр при клике на карточку
document.querySelectorAll('.game-item').forEach(item => {
    item.addEventListener('click', function() {
        const href = this.dataset.href;  // Получаем значение атрибута data-href
        if (href) {  // Если значение есть
            window.location.href = href;  // Переходим по ссылке
        }
    });
});

// Ленивая загрузка изображений (добавляем обратно)
const images = document.querySelectorAll('.game-item img');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Загружаем изображение
            observer.unobserve(img); // Прекращаем наблюдение
        }
    });
}, {
    rootMargin: '100px 0px 0px 0px' // Начинаем загрузку немного раньше
});

images.forEach(img => {
    observer.observe(img);
});