function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    const CART_KEY = 'rust_cart'; // Ключ для Rust корзины

    const title = getParameterByName('title');
    const image = getParameterByName('image');
    const price = getParameterByName('price');
    const type = getParameterByName('type');

    const titleElement = document.getElementById('item-title');
    const imageElement = document.getElementById('item-image');
    const priceElement = document.getElementById('item-price');
    const itemTypeTextElement = document.getElementById('item-type-text'); // Элемент для текста типа

    // Словарь для отображения типов на украинском (можно расширить)
    const typeTranslations = {
        "weapon": "Зброя",
        "clothing": "Одяг",
        "item": "Предмет",
        "construction": "Будівництво",
        "deployable": "Розгортаємий"
    };


    if (titleElement) titleElement.textContent = title;
    if (imageElement) {
        imageElement.src = 'images/' + image;
        imageElement.alt = title;
    }
    if (priceElement) priceElement.textContent = price + " UAH";
    if (itemTypeTextElement && type) {
        itemTypeTextElement.textContent = typeTranslations[type] || type; // Отображаем перевод или код типа
    }


    const today = new Date();
    const last7DaysUkr = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayOfWeek = date.getDay();
        const daysOfWeekUkr = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        last7DaysUkr.push(daysOfWeekUkr[dayOfWeek]);
    }

    function generateRandomPriceData() {
        const data = [];
        const basePrice = parseFloat(price) || 100;
        for (let i = 0; i < 7; i++) {
            data.push(Math.max(0, basePrice * (0.85 + Math.random() * 0.3))); // Увеличил диапазон колебаний
        }
        return data;
    }

    const ctx = document.getElementById('price-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7DaysUkr,
                datasets: [{
                    label: 'Ціна (UAH)',
                    data: generateRandomPriceData(),
                    backgroundColor: 'rgba(255, 100, 100, 0.2)', // Изменен цвет для Rust
                    borderColor: 'rgba(255, 100, 100, 1)',   // Изменен цвет для Rust
                    borderWidth: 2,
                    tension: 0.1
                }]
            },
            options: {
                scales: { y: { beginAtZero: false, ticks: { color: '#fff' } }, x: { ticks: { color: '#fff' } } },
                plugins: { legend: { labels: { color: '#fff' } } },
                maintainAspectRatio: false
            }
        });
    }

    function addToCart(itemData) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            const modal = document.getElementById("myModal");
            if (modal) modal.style.display = "block";
            return;
        }
        let cart = localStorage.getItem(CART_KEY) || '[]';
        cart = JSON.parse(cart);
        // Идентификация по названию для Rust (обычно достаточно)
        const existingItemIndex = cart.findIndex(item => item.title === itemData.title);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            itemData.quantity = 1;
            cart.push(itemData);
        }
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        if (typeof updateCartCount === 'function') {
            updateCartCount(CART_KEY);
        } else {
            console.error("updateCartCount function not found!");
        }
    }

    const buyButton = document.getElementById('buy-button');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            const itemData = { title: title, image: image, price: price, type: type }; // Сохраняем нужные данные
            addToCart(itemData);
        });
    }

    const modal = document.getElementById("myModal");
    const span = modal ? modal.querySelector(".close") : null;
    if (span) {
        span.onclick = function() {
            if (modal) modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        const authModal = document.getElementById('myModal');
        const cartModal = document.getElementById('cart-modal');
        if (authModal && event.target == authModal) authModal.style.display = "none";
        if (cartModal && event.target == cartModal) cartModal.style.display = "none";
    }

    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const loginInput = document.getElementById('login');
            const passwordInput = document.getElementById('password');
            if (loginInput.value === 'Данііл' && passwordInput.value === 'Чулов') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', 'Данііл');
                if (modal) modal.style.display = 'none';
                checkLoginStatus();
            } else {
                alert('Неправильний логін або пароль.');
            }
        });
    }

    function showAuthHint(show) {
        const authHint = document.getElementById('auth-hint');
        if(authHint) authHint.style.display = show ? 'block' : 'none';
    }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userName = localStorage.getItem('userName');
        const userGreeting = document.getElementById('user-greeting');
        const logoutButton = document.getElementById('logout-button');
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            if (isLoggedIn === 'true' && userName) {
                 userInfo.style.display = 'flex';
                 if (userGreeting) userGreeting.textContent = `Користувач: ${userName}`;
                 if (logoutButton) logoutButton.style.display = 'inline-block';
                 showAuthHint(false);
            } else {
                userInfo.style.display = 'none';
                 if (userGreeting) userGreeting.textContent = '';
                 if (logoutButton) logoutButton.style.display = 'none';
                 showAuthHint(true);
            }
        }
         if (typeof updateCartCount === 'function') {
            updateCartCount(CART_KEY);
         } else {
             console.error("updateCartCount function not found on item page!");
         }
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        checkLoginStatus();
    }

    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    checkLoginStatus();
});