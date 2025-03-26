document.addEventListener('DOMContentLoaded', function() {
    let sortOrder = 'asc';
    let currentFilteredItems = [];

    const itemsData = [
        // --- Arcana ---
        { title: "Fractal Horns of Inner Abysm", hero: "terrorblade", slot: "Head", rarity: "arcana", rarityText: "Arcana", price: 1100, image: "tb_arcana.png", type: "item", description: "Фрагменти розуму демона..." },
        { title: "Manifold Paradox", hero: "phantom_assassin", slot: "Weapon", rarity: "arcana", rarityText: "Arcana", price: 1050, image: "pa_arcana.png", type: "item", description: "Зброя, що викривляє реальність." },
        { title: "Blades of Voth Domosh", hero: "legion_commander", slot: "Weapon", rarity: "arcana", rarityText: "Arcana", price: 950, image: "lc_arcana.png", type: "item", description: "Клинки, загартовані в пекельному полум'ї." },
        { title: "Feast of Abscession", hero: "pudge", slot: "Back", rarity: "arcana", rarityText: "Arcana", price: 1150, image: "pudge_arcana.png", type: "item", description: "Ненаситна сутність, що чіпляється за спину." },
        { title: "Bladeform Legacy", hero: "juggernaut", slot: "Head", rarity: "arcana", rarityText: "Arcana", price: 1000, image: "jug_arcana.png", type: "item", description: "Маска, що приховує древню силу." },
        { title: "Frost Avalanche", hero: "crystal_maiden", slot: null, rarity: "arcana", rarityText: "Arcana", price: 980, image: "cm_arcana.png", type: "set", description: "Крижане вбрання самої Зими." },

        // --- Immortal ---
        { title: "Golden Staff of Gun-Yu", hero: "monkey_king", slot: "Weapon", rarity: "immortal", rarityText: "Immortal", price: 1200, image: "mk_golden_staff.png", type: "item", description: "Легендарна золота палиця." },
        { title: "Fin King's Charm", hero: "slardar", slot: "Back", rarity: "immortal", rarityText: "Immortal", price: 80, image: "slardar_immortal_back.png", type: "item", description: "Оберіг із морських глибин." },
        { title: "Transversant Soul", hero: "spectre", slot: "Head", rarity: "immortal", rarityText: "Immortal", price: 150, image: "spectre_immortal_head.png", type: "item", description: "Погляд з потойбічного світу." },
        { title: "Crimson Edge of the Lost Order", hero: "juggernaut", slot: "Weapon", rarity: "immortal", rarityText: "Immortal", price: 3500, image: "jug_crimson_sword.png", type: "item", description: "Багряний клинок свідка." },
        { title: "Mace of Aeons", hero: "faceless_void", slot: "Weapon", rarity: "immortal", rarityText: "Immortal", price: 500, image: "fv_mace_of_aeons.png", type: "item", description: "Булава, що керує часом." },
        { title: "Shatterblast Core", hero: "ancient_apparition", slot: "Arms", rarity: "immortal", rarityText: "Immortal", price: 60, image: "aa_shatterblast.png", type: "item", description: "Крижане ядро руйнування." },
        { title: "Taunt: You Prefer Arrows?", hero: "drow_ranger", slot: null, rarity: "immortal", rarityText: "Immortal", price: 120, image: "drow_taunt_immortal.png", type: "other", description: "Насмішка безсмертної лучниці." },

        // --- Legendary ---
        { title: "Dragonclaw Hook", hero: "pudge", slot: "Weapon", rarity: "legendary", rarityText: "Legendary", price: 8000, image: "dc_hook.png", type: "item", description: "Крюк, що став легендою." },
        { title: "Dark Artistry", hero: "invoker", slot: null, rarity: "legendary", rarityText: "Legendary", price: 7500, image: "invoker_dark_artistry.png", type: "set", description: "Втілення темного мистецтва магії." },
        { title: "Eternal Harvest", hero: "phantom_assassin", slot: "Weapon", rarity: "legendary", rarityText: "Legendary", price: 500, image: "pa_eternal_harvest.png", type: "item", description: "Легендарний клинок для вічного полювання." },
        { title: "Battlefury", hero: "anti-mage", slot: "Weapon", rarity: "legendary", rarityText: "Legendary", price: 600, image: "am_battlefury.png", type: "item", description: "Розсікаючий клинок люті." },
        { title: "Helm of the Undying", hero: "undying", slot: "Head", rarity: "legendary", rarityText: "Legendary", price: 450, image: "undying_helm.png", type: "item", description: "Шолом невмирущого короля." },

        // --- Mythical ---
        { title: "Genuine Weather Rain", hero: "global", slot: null, rarity: "mythical", rarityText: "Mythical", price: 30, image: "weather_rain.png", type: "other", description: "Ефект погоди: Дощ." },
        { title: "Bindings of the Battleranger", hero: "windranger", slot: "Back", rarity: "mythical", rarityText: "Mythical", price: 90, image: "wr_battleranger_back.png", type: "item", description: "Плащ досвідченої мандрівниці." },
        { title: "Latticean Hierarchy Set", hero: "weaver", slot: null, rarity: "mythical", rarityText: "Mythical", price: 120, image: "weaver_latticean.png", type: "set", description: "Хітиновий панцир ткача реальностей." },
        { title: "Timebreaker", hero: "faceless_void", slot: "Weapon", rarity: "mythical", rarityText: "Mythical", price: 400, image: "fv_timebreaker.png", type: "item", description: "Зброя, що ламає плин часу." },
        { title: "Ice Burst", hero: "ancient_apparition", slot: "Head", rarity: "mythical", rarityText: "Mythical", price: 75, image: "aa_ice_burst.png", type: "item", description: "Вибух крижаної енергії." },
        { title: "Monument of Mortality", hero: "global", slot: null, rarity: "mythical", rarityText: "Mythical", price: 25, image: "monument_mortality_ward.png", type: "ward", description: "Вард, що спостерігає за смертністю." },
        { title: "Genuine Seekling", hero: "global", slot: null, rarity: "mythical", rarityText: "Mythical", price: 40, image: "seekling_courier.png", type: "courier", description: "Маленький шукач скарбів." },

        // --- Rare ---
        { title: "Inscribed Glaves of Wisdom", hero: "silencer", slot: "Weapon", rarity: "rare", rarityText: "Rare", price: 15, image: "silencer_glaives.png", type: "item", description: "Глефи, що несуть тишу." },
        { title: "Fluttering Staff", hero: "crystal_maiden", slot: "Weapon", rarity: "rare", rarityText: "Rare", price: 20, image: "cm_fluttering_staff.png", type: "item", description: "Посох з крижаними метеликами." },
        { title: "Humble Drifter Set", hero: "pangolier", slot: null, rarity: "rare", rarityText: "Rare", price: 35, image: "pango_humble_drifter.png", type: "set", description: "Вбрання скромного бродяги." },
        { title: "Infernal Ram", hero: "shadow_demon", slot: "Head", rarity: "rare", rarityText: "Rare", price: 18, image: "sd_infernal_ram.png", type: "item", description: "Пекельні роги демона." },
        { title: "Prismatic Drake", hero: "global", slot: null, rarity: "rare", rarityText: "Rare", price: 15, image: "prismatic_drake_courier.png", type: "courier", description: "Кур'єр-дракон, що переливається." },
        { title: "Eye of Foresight", hero: "global", slot: null, rarity: "rare", rarityText: "Rare", price: 8, image: "eye_of_foresight_ward.png", type: "ward", description: "Всевидяче око-вард." },

        // --- Uncommon ---
        { title: "Pauldrons of the Eternal Light", hero: "omniknight", slot: "Shoulder", rarity: "uncommon", rarityText: "Uncommon", price: 3, image: "omni_shoulders.png", type: "item", description: "Наплічники вічного світла." },
        { title: "Mask of the Mad Harvester", hero: "pudge", slot: "Head", rarity: "uncommon", rarityText: "Uncommon", price: 8, image: "pudge_mask.png", type: "item", description: "Маска божевільного м'ясника." },
        { title: "Gazing Eye Ward", hero: "global", slot: null, rarity: "uncommon", rarityText: "Uncommon", price: 2, image: "gazing_eye_ward.png", type: "ward", description: "Простий, але пильний вард." },
        { title: "Stumpy - Nature's Attendant", hero: "global", slot: null, rarity: "uncommon", rarityText: "Uncommon", price: 4, image: "stumpy_courier.png", type: "courier", description: "Маленький дерев'яний помічник." },
        { title: "Trappings of the Ravenous Fiend", hero: "shadow_fiend", slot: "Arms", rarity: "uncommon", rarityText: "Uncommon", price: 6, image: "sf_arms.png", type: "item", description: "Наручі ненаситного демона." },

        // --- Common ---
        { title: "Bracers of the Howling Wolf", hero: "lycan", slot: "Arms", rarity: "common", rarityText: "Common", price: 1, image: "lycan_bracers.png", type: "item", description: "Наручі виючого вовка." },
        { title: "Belt of the Bladeform Aesthete", hero: "juggernaut", slot: "Belt", rarity: "common", rarityText: "Common", price: 2, image: "jug_belt.png", type: "item", description: "Пояс майстра клинка." },
        { title: "Headdress of the Protector", hero: "dazzle", slot: "Head", rarity: "common", rarityText: "Common", price: 1, image: "dazzle_head.png", type: "item", description: "Головний убір захисника." },
        { title: "Pudgling", hero: "global", slot: null, rarity: "common", rarityText: "Common", price: 3, image: "pudgling_courier.png", type: "courier", description: "Маленька копія Паджа." },
        { title: "Observer Ward", hero: "global", slot: null, rarity: "common", rarityText: "Common", price: 1, image: "observer_ward.png", type: "ward", description: "Стандартний вард спостерігача." },
        { title: "Formed Alloy Set", hero: "alchemist", slot: null, rarity: "common", rarityText: "Common", price: 4, image: "alch_set.png", type: "set", description: "Простий набір алхіміка." },

        // --- Дополнительно для героев ---
        { title: "Molten Bore", hero: "axe", slot: "Head", rarity: "immortal", rarityText: "Immortal", price: 180, image: "axe_molten_bore.png", type: "item", description: "Розплавлений бур для шолома." },
        { title: "Rampant Outrage", hero: "axe", slot: "Back", rarity: "mythical", rarityText: "Mythical", price: 70, image: "axe_rampant_outrage.png", type: "item", description: "Спина, що випромінює лють." },
        { title: "Wyvernguard Edge", hero: "axe", slot: "Weapon", rarity: "rare", rarityText: "Rare", price: 30, image: "axe_wyvernguard.png", type: "item", description: "Сокира вівернової стражі." },
        { title: "Great Sage's Reckoning", hero: "monkey_king", slot: null, rarity: "arcana", rarityText: "Arcana", price: 1080, image: "mk_arcana.png", type: "set", description: "Суд великого мудреця." },
        { title: "Staff of Gun-Yu", hero: "monkey_king", slot: "Weapon", rarity: "rare", rarityText: "Rare", price: 15, image: "mk_staff.png", type: "item", description: "Легка та швидка палиця." },
        { title: "Yulsaria's Glacier", hero: "crystal_maiden", slot: "Back", rarity: "mythical", rarityText: "Mythical", price: 45, image: "cm_glacier.png", type: "item", description: "Крижаний плащ з півночі." },
        { title: "White Sentry", hero: "crystal_maiden", slot: "Head", rarity: "immortal", rarityText: "Immortal", price: 200, image: "cm_white_sentry.png", type: "item", description: "Капюшон білого стража." },
        { title: "Chains of the Black Death", hero: "pudge", slot: null, rarity: "mythical", rarityText: "Mythical", price: 250, image: "pudge_black_death.png", type: "set", description: "Ланцюги чорної смерті." },
        { title: "Shoulder Block of the Black Death", hero: "pudge", slot: "Shoulder", rarity: "common", rarityText: "Common", price: 2, image: "pudge_shoulder_bd.png", type: "item", description: "Наплічник чорної смерті." },
        { title: "Heaven-Piercing Pauldrons", hero: "invoker", slot: "Shoulder", rarity: "immortal", rarityText: "Immortal", price: 130, image: "invoker_heaven_pauldron.png", type: "item", description: "Наплічники, що пронизують небеса." },
        { title: "Magus Apex", hero: "invoker", slot: "Head", rarity: "arcana", rarityText: "Arcana", price: 800, image: "invoker_magus_apex.png", type: "item", description: "Вершина магічної майстерності (Persona)." },
        { title: "Vestige of the Arsenal Magus", hero: "invoker", slot: null, rarity: "rare", rarityText: "Rare", price: 40, image: "invoker_vestige_set.png", type: "set", description: "Спадщина мага-арсеналу." },
        { title: "Serrakura", hero: "juggernaut", slot: "Weapon", rarity: "mythical", rarityText: "Mythical", price: 80, image: "jug_serrakura.png", type: "item", description: "Клинок, що танцює у битві." },
        { title: "Pilgrimage of the Bladeform Aesthete", hero: "juggernaut", slot: null, rarity: "common", rarityText: "Common", price: 5, image: "jug_pilgrimage_set.png", type: "set", description: "Простий одяг мандрівного мечника." }
    ];

    function createItemCard(item) {
        const itemParams = new URLSearchParams({
            title: item.title, image: item.image, price: item.price, rarity: item.rarity, rarityText: item.rarityText, type: item.type,
            ...(item.hero && { hero: item.hero }),
            ...(item.slot && { slot: item.slot }),
            ...(item.description && { description: item.description }) // Добавляем описание в параметры
        });
        const itemLink = `item.html?${itemParams.toString()}`;
        return `
            <div class="item-card" onclick="window.location.href='${itemLink}'">
                <div class="item-image-wrapper">
                    <img src="images/${item.image}" alt="${item.title}" class="item-image">
                </div>
                <div class="item-info">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-rarity" style="color: ${getRarityColor(item.rarity)};">Рідкість: ${item.rarityText}</p>
                    ${item.hero && item.hero !== 'global' ? `<p class="item-hero">Герой: ${capitalizeFirstLetter(item.hero.replace('_',' '))}</p>` : ''}
                    <p class="item-description">${item.description || ''}</p> <!-- Отображаем описание -->
                    <p class="item-price">Ціна: ${item.price} UAH</p>
                    <button class="item-button">Оглянути</button>
                </div>
            </div>
        `;
    }

    function getRarityColor(rarity) {
        const colors = { 'common': '#b0c3d9', 'uncommon': '#5e98d9', 'rare': '#4b69ff', 'mythical': '#8847ff', 'legendary': '#d32ce6', 'immortal': '#e4ae39', 'arcana': '#ade55c' };
        return colors[rarity] || '#ffffff';
    }

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
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
        const rarity = document.getElementById("dota-rarity").value;
        const hero = document.getElementById("dota-hero").value;
        const minPrice = parseFloat(document.querySelector(".input-min").value) || 0;
        const maxPrice = parseFloat(document.querySelector(".input-max").value) || Infinity;
        currentFilteredItems = itemsData.filter(item => {
            const typeMatch = itemType === "all" || item.type === itemType;
            const rarityMatch = rarity === "all" || item.rarity === rarity;
            const heroMatch = hero === "all" || item.hero === hero || (!item.hero && hero === 'global');
            const priceMatch = item.price >= minPrice && item.price <= maxPrice;
            return typeMatch && rarityMatch && heroMatch && priceMatch;
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
            updateCartCount('dota2_cart');
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