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
    const CART_KEY = 'dota2_cart';

    const title = getParameterByName('title');
    const image = getParameterByName('image');
    const price = getParameterByName('price');
    const rarity = getParameterByName('rarity');
    const rarityText = getParameterByName('rarityText');
    const type = getParameterByName('type');
    const hero = getParameterByName('hero');
    const slot = getParameterByName('slot');

    const titleElement = document.getElementById('item-title');
    const imageElement = document.getElementById('item-image');
    const priceElement = document.getElementById('item-price');
    const rarityElement = document.getElementById('item-rarity');
    const heroElement = document.getElementById('item-hero');
    const heroInfoElement = document.getElementById('hero-info');
    const slotElement = document.getElementById('item-slot');
    const slotInfoElement = document.getElementById('slot-info');
    const itemTypeTextElement = document.getElementById('item-type-text');

    const typeTranslations = { "item": "Предмет", "set": "Сет", "courier": "Кур'єр", "ward": "Вард", "other": "Інше" };
    const rarityColors = { 'common': '#b0c3d9', 'uncommon': '#5e98d9', 'rare': '#4b69ff', 'mythical': '#8847ff', 'legendary': '#d32ce6', 'immortal': '#e4ae39', 'arcana': '#ade55c', default: '#ffffff' };
    function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1); }


    if (titleElement) titleElement.textContent = title;
    if (imageElement) {
        imageElement.src = 'images/' + image;
        imageElement.alt = title;
    }
    if (priceElement) priceElement.textContent = price + " UAH";
    if (rarityElement) {
        rarityElement.textContent = rarityText || capitalizeFirstLetter(rarity);
        rarityElement.style.color = rarityColors[rarity] || rarityColors.default; // Применяем цвет редкости
    }
    if (heroElement && heroInfoElement && hero && hero !== 'global') {
        heroElement.textContent = capitalizeFirstLetter(hero.replace('_',' '));
        heroInfoElement.style.display = 'block';
    }
    if (slotElement && slotInfoElement && slot) {
        slotElement.textContent = slot;
        slotInfoElement.style.display = 'block';
    }
     if (itemTypeTextElement && type) {
        itemTypeTextElement.textContent = typeTranslations[type] || capitalizeFirstLetter(type);
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
            data.push(Math.max(0, basePrice * (0.85 + Math.random() * 0.3)));
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
                    backgroundColor: 'rgba(210, 50, 50, 0.2)', // Красный для Dota 2
                    borderColor: 'rgba(210, 50, 50, 1)',   // Красный для Dota 2
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
        // Ищем по title и rarityText
        const existingItemIndex = cart.findIndex(item => item.title === itemData.title && item.rarityText === itemData.rarityText);
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
            const itemData = { title: title, image: image, price: price, rarityText: rarityText, type: type }; // Добавляем rarityText
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
            if (loginInput.value === '1' && passwordInput.value === '1') {
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