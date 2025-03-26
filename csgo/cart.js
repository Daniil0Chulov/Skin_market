// cart.js

// Функція для оновлення лічильника товарів у кошику
function updateCartCount() {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Функція для відображення кошика (динамічне створення модального вікна)
function renderCart() {
    let cartModal = document.getElementById('cart-modal');
    if (!cartModal) {
        // Створюємо модальне вікно, якщо його немає
        cartModal = document.createElement('div');
        cartModal.id = 'cart-modal';
        cartModal.classList.add('modal');
        cartModal.innerHTML = `
            <div class="modal-content">
                <span class="close">×</span>
                <h2>Корзина</h2>
                <ul id="cart-items">
                    <!-- Товары будут добавлены сюда -->
                </ul>
                <p>Загальна сума: <span id="cart-total">0</span> UAH</p>
                <button id="clear-cart">Очистити кошик</button>
            </div>
        `;
        document.body.appendChild(cartModal);

        // Обробник для кнопки "Очистити кошик"
        const clearCartBtn = cartModal.querySelector('#clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', clearCart);
        }

        // Обробники для закриття модального вікна
        const closeButton = cartModal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => cartModal.style.display = 'none');
        }
        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
    }

    const modalContent = cartModal.querySelector('.modal-content');
    const cartItemsContainer = modalContent.querySelector('#cart-items');
    const cartTotalElement = modalContent.querySelector('#cart-total');

    cartItemsContainer.innerHTML = '';  // Очищаємо вміст
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.textContent = "Корзина порожня.";
        cartTotalElement.textContent = '0';
        return;
    }

    // Створюємо об'єкт для скорочень якості
    const qualityAbbreviations = {
        "factory-new": "FN",
        "minimal-wear": "MW",
        "field-tested": "FT",
        "well-worn": "WW",
        "battle-scarred": "BS"
    };

    for (const item of cart) {
        const listItem = document.createElement('li');

        // Використовуємо скорочення, якщо воно є, інакше - оригінальне значення
        const qualityAbbr = qualityAbbreviations[item.quality] || item.quality;

        listItem.innerHTML = `
            <img src="images/${item.image}" alt="${item.title}" width="50" height="50">
            <span class="item-title">${item.title} (${qualityAbbr})</span>
            <span class="item-price">${item.price} UAH</span>
            <button class="minus-button">-</button>
            <span class="item-quantity">${item.quantity}</span>
            <button class="plus-button">+</button>
            <button class="remove-item">Видалити</button>
        `;

        // Обробники подій для кнопок всередині рядка товару:
        listItem.querySelector('.minus-button').addEventListener('click', () => updateItemQuantity(item.title, item.quality, -1));
        listItem.querySelector('.plus-button').addEventListener('click', () => updateItemQuantity(item.title, item.quality, 1));
        listItem.querySelector('.remove-item').addEventListener('click', () => {
          const itemIndex = cart.findIndex(cartItem => cartItem.title === item.title && cartItem.quality === item.quality);
          if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
          }
        });

        cartItemsContainer.appendChild(listItem);
        total += item.price * item.quantity;
    }

    cartTotalElement.textContent = total.toFixed(2);
}

// Функція для зміни кількості товару
function updateItemQuantity(title, quality, change) {
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];
    const existingItemIndex = cart.findIndex(item => item.title === title && item.quality === quality);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += change;
        if (cart[existingItemIndex].quantity < 1) {
            cart.splice(existingItemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// Функція для очищення кошика
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', (event) => {
            event.preventDefault();
            renderCart(); // Створить і покаже
            document.getElementById('cart-modal').style.display = 'block'; //  Показуємо
        });
    }
     const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) { //  Перевіряємо існування
        clearCartBtn.addEventListener('click', clearCart);  //  Використовуємо функцію clearCart
    }
    updateCartCount(); //  Оновлюємо при старті
});