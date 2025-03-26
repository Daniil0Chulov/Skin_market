// Функция для получения параметров из URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Функция для определения цвета градиента шкалы Float
function getFloatColor(floatValue) {
    if (floatValue >= 0 && floatValue <= 0.07) {
        return 'linear-gradient(to right, #006400, #228B22)';
    } else if (floatValue > 0.07 && floatValue <= 0.15) {
        return 'linear-gradient(to right, #228B22, #90EE90)';
    } else if (floatValue > 0.15 && floatValue <= 0.37) {
        return 'linear-gradient(to right, #90EE90, #FFFF00)';
    } else if (floatValue > 0.37 && floatValue <= 0.44) {
        return 'linear-gradient(to right, #FFFF00, #FFA500)';
    } else {
        return 'linear-gradient(to right, #FFA500, #FF0000)';
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // Получаем данные о товаре из URL
    const title = getParameterByName('title');
    const quality = getParameterByName('quality');
    const image = getParameterByName('image');
    const float = getParameterByName('float');
    const price = getParameterByName('price');
    const collection = getParameterByName('collection');
    const releaseDate = getParameterByName('releaseDate');

    //Массив для переводов quality
    const qualityTranslations = {
      "factory-new": "Прямо с завода",
      "minimal-wear": "Майже незношене",
      "field-tested": "Після польових випробувань",
      "well-worn": "Поношене",
      "battle-scarred": "Закалене в боях"
    };

    // Заполняем HTML элементы данными
    const titleElement = document.getElementById('item-title');
    const imageElement = document.getElementById('item-image');
    const qualityElement = document.getElementById('item-quality');
    const floatElement = document.getElementById('item-float');
    const priceElement = document.getElementById('item-price');
    const collectionElement = document.getElementById('item-collection');
    const releaseDateElement = document.getElementById('item-release-date');
    const floatBarContainer = document.querySelector('.item-fill-bar-container');
    const floatBar = document.querySelector('.item-fill-bar');

    if (titleElement) titleElement.textContent = title;
    if (imageElement) {
        imageElement.src = 'images/' + image;
        imageElement.alt = title;
    }
    if (qualityElement) qualityElement.textContent = qualityTranslations[quality] || quality;
    if (floatBarContainer && floatBar) {
        const floatBarColor = getFloatColor(parseFloat(float));
        floatBar.style.width = `${parseFloat(float) * 100}%`;
        floatBar.style.background = floatBarColor;
    }
    if (floatElement) {
      const floatString = parseFloat(float).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
      floatElement.textContent = floatString;
    }
    if (priceElement) priceElement.textContent = price + " UAH";
    if (collectionElement) collectionElement.textContent = collection;
    if (releaseDateElement) releaseDateElement.textContent = releaseDate;

    // Генерация дат для графика (последние 7 дней)
    const today = new Date();
    const last7Days = [];
    const last7DaysUkr = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        last7Days.push(date.toLocaleDateString('uk-UA'));
        const dayOfWeek = date.getDay();
        const daysOfWeekUkr = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        last7DaysUkr.push(daysOfWeekUkr[dayOfWeek]);
    }

    // Генерация случайных данных для графика
    function generateRandomPriceData() {
        const data = [];
        for (let i = 0; i < 7; i++) {
            data.push(Math.random() * (parseFloat(price) * 0.2) + parseFloat(price) * 0.9);
        }
        return data;
    }

    // Создание графика
    const ctx = document.getElementById('price-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7DaysUkr,
                datasets: [{
                    label: 'Ціна (UAH)',
                    data: generateRandomPriceData(),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            },
            options: { scales: { y: { beginAtZero: false } } }
        });
    }

    // Добавление товара в корзину
    function addToCart(itemData) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            // alert('Будь ласка, авторизуйтесь, щоб додати товар у кошик.'); // Убрали alert
            const modal = document.getElementById("myModal"); // Получаем модальное окно
            modal.style.display = "block"; // Показываем модальное окно!
            return; // Прерываем выполнение функции
        }
        let cart = localStorage.getItem('cart') || '[]';
        cart = JSON.parse(cart);
        const existingItemIndex = cart.findIndex(item => item.title === itemData.title && item.quality === itemData.quality);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            itemData.quantity = 1;
            cart.push(itemData);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(); // Обновляем счетчик
    }

    const buyButton = document.getElementById('buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            const itemData = {
                title: title,
                quality: quality,
                qualityText: qualityTranslations[quality] || quality,
                image: image,
                float: float,
                price: price,
            };
            addToCart(itemData);
        });
    }

    // Модальное окно авторизации
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];

    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- ЛОГИКА АВТОРИЗАЦИИ ---
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const loginInput = document.getElementById('login');
            const passwordInput = document.getElementById('password');

            // Проверяем логин и пароль
            if (loginInput.value === 'Данііл' && passwordInput.value === 'Чулов') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', 'Данііл');
                modal.style.display = 'none';
                checkLoginStatus(); // Обновляем интерфейс
            } else {
                alert('Неправильний логін або пароль.');
            }
        });
    }
     //  Добавил функцию showAuthHint
      function showAuthHint(show) {
        const authHint = document.getElementById('auth-hint');
         if(authHint){
            authHint.style.display = show ? 'block' : 'none';
         }
     }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userName = localStorage.getItem('userName');
        const userGreeting = document.getElementById('user-greeting');
        const logoutButton = document.getElementById('logout-button');
        const userInfo = document.querySelector('.user-info');

        if (isLoggedIn === 'true' && userName) {
            if (userInfo) {
                userInfo.style.display = 'flex';
            }
            if (userGreeting) {
                userGreeting.textContent = `Користувач: ${userName}`;
            }
            if (logoutButton) {
                logoutButton.style.display = 'inline-block';
            }
            showAuthHint(false); // Скрываем
        }else {
            if (userInfo) {
                userInfo.style.display = 'none';
            }
          showAuthHint(true); // Показываем
        }
    }
    //Додаємо функцію виходу
    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        checkLoginStatus();  // Обновляем интерфейс
        window.location.reload(); // Перезагружаем страницу
    }
    //вішаємо івент на кнопку вийти
    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    checkLoginStatus(); // Проверяем статус при загрузке
    updateCartCount();  // Обновляем счетчик
});