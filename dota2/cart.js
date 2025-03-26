const CART_KEY = 'dota2_cart'; // Ключ для Dota 2

function updateCartCount() {
    let cart = localStorage.getItem(CART_KEY);
    cart = cart ? JSON.parse(cart) : [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

function renderCart() {
    let cartModal = document.getElementById('cart-modal');
    if (!cartModal) {
        cartModal = document.createElement('div');
        cartModal.id = 'cart-modal';
        cartModal.classList.add('modal');
        cartModal.innerHTML = `
            <div class="modal-content">
                <span class="close">×</span>
                <h2>Корзина</h2>
                <ul id="cart-items"></ul>
                <p id="cart-total-container" style="display: none;">Загальна сума: <span id="cart-total">0.00</span> UAH</p>
                <button id="clear-cart" style="display: none;">Очистити кошик</button>
            </div>
        `;
        document.body.appendChild(cartModal);
        const closeButton = cartModal.querySelector('.close');
        if (closeButton) closeButton.addEventListener('click', () => cartModal.style.display = 'none');
        const clearCartBtn = cartModal.querySelector('#clear-cart');
        if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    }

    const modalContent = cartModal.querySelector('.modal-content');
    const cartItemsContainer = modalContent.querySelector('#cart-items');
    const cartTotalContainer = modalContent.querySelector('#cart-total-container');
    const cartTotalElement = modalContent.querySelector('#cart-total');
    const clearCartBtn = modalContent.querySelector('#clear-cart');

    cartItemsContainer.innerHTML = '';
    let cart = localStorage.getItem(CART_KEY);
    cart = cart ? JSON.parse(cart) : [];
    let total = 0;

    if (cart.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = "Кошик порожній.";
        emptyMsg.style.textAlign = 'center';
        cartItemsContainer.appendChild(emptyMsg);
        if(cartTotalContainer) cartTotalContainer.style.display = 'none';
        if(clearCartBtn) clearCartBtn.style.display = 'none';
        if(cartTotalElement) cartTotalElement.textContent = '0.00';
    } else {
        if(cartTotalContainer) cartTotalContainer.style.display = 'block';
        if(clearCartBtn) clearCartBtn.style.display = 'block';
        for (const item of cart) {
            const listItem = document.createElement('li');
            const rarityIdentifier = item.rarityText || item.rarity; // Используем rarityText
            listItem.innerHTML = `
                <img src="images/${item.image}" alt="${item.title}" width="50" height="50">
                <span class="item-title">${item.title} (${rarityIdentifier})</span> <!-- Отображаем редкость -->
                <span class="item-price">${item.price} UAH</span>
                <div class="item-controls">
                    <button class="minus-button" data-title="${item.title}" data-rarity="${rarityIdentifier}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="plus-button" data-title="${item.title}" data-rarity="${rarityIdentifier}">+</button>
                    <button class="remove-item" data-title="${item.title}" data-rarity="${rarityIdentifier}">Видалити</button>
                </div>
            `;
            cartItemsContainer.appendChild(listItem);
            total += parseFloat(item.price) * item.quantity;
        }
         if(cartTotalElement) cartTotalElement.textContent = total.toFixed(2);
    }
}

document.addEventListener('click', function(event) {
    const target = event.target;
    const cartModal = document.getElementById('cart-modal');
    if (!cartModal || !cartModal.contains(target)) return;
    const title = target.dataset.title;
    const rarity = target.dataset.rarity; // Используем rarity из data-атрибута

    if (target.classList.contains('minus-button') && title && rarity) updateItemQuantity(title, rarity, -1);
    else if (target.classList.contains('plus-button') && title && rarity) updateItemQuantity(title, rarity, 1);
    else if (target.classList.contains('remove-item') && title && rarity) {
        let cart = localStorage.getItem(CART_KEY);
        cart = cart ? JSON.parse(cart) : [];
        const itemIndex = cart.findIndex(cartItem => cartItem.title === title && (cartItem.rarityText === rarity || cartItem.rarity === rarity)); // Ищем по title и rarityText/rarity
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
});

function updateItemQuantity(title, rarityIdentifier, change) { // Используем rarityIdentifier
    let cart = localStorage.getItem(CART_KEY);
    cart = cart ? JSON.parse(cart) : [];
    const existingItemIndex = cart.findIndex(item => item.title === title && (item.rarityText === rarityIdentifier || item.rarity === rarityIdentifier));
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += change;
        if (cart[existingItemIndex].quantity < 1) cart.splice(existingItemIndex, 1);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    renderCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', (event) => {
            event.preventDefault();
            renderCart();
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) cartModal.style.display = 'block';
        });
    }
    updateCartCount();
});