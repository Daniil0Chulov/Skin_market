document.addEventListener('DOMContentLoaded', function() {
    let sortOrder = 'asc';
    let currentFilteredItems = [];

    // ОБНОВЛЕННЫЙ СПИСОК ПРЕДМЕТОВ RUST (Удалены еще 4)
    const itemsData = [
        // --- Weapon ---
        { title: "Glory AK47", price: 15000, image: "ak47_glory.png", type: "weapon" },
        { title: "Alien Red AK47", price: 2500, image: "ak47_alien_red.png", type: "weapon" },
        { title: "Tempered AK47", price: 150, image: "ak47_tempered.png", type: "weapon" },
        { title: "Doodle M249", price: 350, image: "m249_doodle.png", type: "weapon" },
        { title: "Military M249", price: 90, image: "m249_military.png", type: "weapon" },
        { title: "Poly P M249", price: 150, image: "m249_poly_p.png", type: "weapon" },
        { title: "Alien Red SAR", price: 900, image: "sar_alien_red.png", type: "weapon" },
        { title: "Bombing SAR", price: 200, image: "sar_bombing.png", type: "weapon" },
        { title: "Desert Camo SAR", price: 20, image: "sar_desert_camo.png", type: "weapon" },
        { title: "Retrowave Python", price: 750, image: "python_retrowave.png", type: "weapon" },
        { title: "Pixel Python", price: 100, image: "python_pixel.png", type: "weapon" },
        { title: "Ivory Python", price: 450, image: "python_ivory.png", type: "weapon" },
        { title: "Tempered Thompson", price: 400, image: "thompson_tempered.png", type: "weapon" },
        { title: "Military Thompson", price: 80, image: "thompson_military.png", type: "weapon" },
        { title: "Resistance Thompson", price: 120, image: "thompson_resistance.png", type: "weapon" },
        { title: "Neon MP5", price: 600, image: "mp5_neon.png", type: "weapon" },
        { title: "Tiger MP5", price: 180, image: "mp5_tiger.png", type: "weapon" },
        { title: "Azul MP5", price: 240, image: "mp5_azul.png", type: "weapon" },
        { title: "Punishment Hammer", price: 150, image: "hammer_punishment.png", type: "weapon" },
        { title: "Bone Hammer", price: 200, image: "hammer_bone.png", type: "weapon" },

        // --- Clothing ---
        { title: "Spacesuit", price: 1500, image: "hazmat_spacesuit.png", type: "clothing" },
        { title: "Creepy Clown Suit", price: 950, image: "hazmat_clown.png", type: "clothing" },
        { title: "Blackout Hoodie", price: 2000, image: "hoodie_blackout.png", type: "clothing" },
        { title: "Fire Dragon Hoodie", price: 800, image: "hoodie_dragon.png", type: "clothing" },
        { title: "Pink Rabbit Hoodie", price: 1300, image: "hoodie_rabbit.png", type: "clothing" },
        { title: "Whiteout Pants", price: 1800, image: "pants_whiteout.png", type: "clothing" },
        { title: "Dragon Rage Pants", price: 700, image: "pants_dragon.png", type: "clothing" },
        { title: "Urban Pants", price: 120, image: "pants_urban.png", type: "clothing" },
        { title: "Big Grin Facemask", price: 5000, image: "facemask_big_grin.png", type: "clothing" },
        { title: "Tempered Facemask", price: 2800, image: "facemask_tempered.png", type: "clothing" },
        { title: "Frost Facemask", price: 1500, image: "facemask_frost.png", type: "clothing" },
        { title: "Creepy Clown Bandana", price: 150, image: "bandana_clown.png", type: "clothing" },
        { title: "Zipper Bandana", price: 80, image: "bandana_zipper.png", type: "clothing" },
        { title: "Skull Bandana", price: 300, image: "bandana_skull.png", type: "clothing" },
        { title: "Tempered Kilt", price: 300, image: "kilt_tempered.png", type: "clothing" },
        { title: "Forest Raider Kilt", price: 80, image: "kilt_raider.png", type: "clothing" },
        { title: "Blackout Kilt", price: 400, image: "kilt_blackout.png", type: "clothing" },

        // --- Item ---
        { title: "Valentine Rock", price: 30, image: "rock_valentine.png", type: "item" },
        { title: "Crystal Rock", price: 100, image: "rock_crystal.png", type: "item" },
        { title: "Doodle Rock", price: 15, image: "rock_doodle.png", type: "item" },

        // --- Construction ---
        { title: "Neon Door", price: 500, image: "metaldoor_neon.png", type: "construction" },
        { title: "Industrial Door", price: 80, image: "metaldoor_industrial.png", type: "construction" },
        { title: "Dragon Armored Door", price: 1200, image: "armoreddoor_dragon.png", type: "construction" },
        { title: "Doodle Wood Double Door", price: 180, image: "wooddoor_doodle.png", type: "construction" },
        { title: "Barn Wood Double Door", price: 120, image: "wooddoor_barn.png", type: "construction" },

        // --- Deployable ---
        // Пусто после удалений

        // Добавим хоть что-то, если найдешь картинки
        // { title: "Zodiac Sleeping Bag", price: 120, image: "sleepingbag_zodiac.png", type: "deployable" },
        // { title: "Catacombs Large Box", price: 600, image: "largebox_catacombs.png", type: "deployable" },
        // { title: "Cultist Fridge", price: 350, image: "fridge_cultist.png", type: "deployable" }
    ];

    function createItemCard(item) {
        const itemParams = new URLSearchParams({
            title: item.title, image: item.image, price: item.price, type: item.type
        });
        const itemLink = `item.html?${itemParams.toString()}`;
        return `
            <div class="item-card" onclick="window.location.href='${itemLink}'">
                <div class="item-image-wrapper">
                    <img src="images/${item.image}" alt="${item.title}" class="item-image">
                </div>
                <div class="item-info">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-price">Ціна: ${item.price} UAH</p>
                    <button class="item-button">Оглянути</button>
                </div>
            </div>
        `;
    }

    function renderItems(items) {
        const itemsContainer = document.querySelector(".items");
        if (!itemsContainer) return;
        itemsContainer.innerHTML = "";
        items.forEach(item => {
            itemsContainer.insertAdjacentHTML("beforeend", createItemCard(item));
        });
        checkLoginStatus();
    }

    function applyFiltersAndSort() {
        const itemType = document.getElementById("item-type").value;
        const minPrice = parseFloat(document.querySelector(".input-min").value) || 0;
        const maxPrice = parseFloat(document.querySelector(".input-max").value) || Infinity;
        currentFilteredItems = itemsData.filter(item => {
            const typeMatch = itemType === "all" || item.type === itemType;
            const priceMatch = item.price >= minPrice && item.price <= maxPrice;
            return typeMatch && priceMatch;
        });
        sortItems();
    }

    function sortItems() {
        const sortedItems = [...currentFilteredItems].sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
        renderItems(sortedItems);
    }

    function toggleSortOrder() {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortButton = document.getElementById('sort-by-price');
        if(sortButton) {
             sortButton.textContent = sortOrder === 'asc' ? 'Ціна: Від дешевих до дорогих' : 'Ціна: Від дорогих до дешевих';
        }
        sortItems();
    }

    const applyBtn = document.getElementById("apply-filters");
    const sortBtn = document.getElementById("sort-by-price");
    if (applyBtn) applyBtn.addEventListener("click", applyFiltersAndSort);
    if (sortBtn) {
        sortBtn.textContent = sortOrder === 'asc' ? 'Ціна: Від дешевих до дорогих' : 'Ціна: Від дорогих до дешевих';
        sortBtn.addEventListener("click", toggleSortOrder);
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
            } else {
                  userInfo.style.display = 'none';
            }
        }
        if (typeof updateCartCount === 'function') {
            updateCartCount('rust_cart');
        }
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        checkLoginStatus();
    }

    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    applyFiltersAndSort();
    checkLoginStatus();
});