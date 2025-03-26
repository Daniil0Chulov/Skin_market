document.addEventListener('DOMContentLoaded', function() {

    let sortOrder = 'asc';
    let currentFilteredItems = [];

   // ОБНОВЛЕННЫЙ СПИСОК ПРЕДМЕТОВ TF2 (Удалены отсутствующие)
   const itemsData = [
        // --- ШАПКИ (type: "hat") ---
        { title: "Team Captain", tf2_quality: "unique", qualityText: "Unique", price: 2100, image: "team_captain.png", type: "hat", class: "soldier", effect: null },
        { title: "Max's Severed Head", tf2_quality: "unique", qualityText: "Unique", price: 18000, image: "max_head.png", type: "hat", class: "multi-class", effect: null },
        { title: "Tough Guy's Toque", tf2_quality: "unique", qualityText: "Unique", price: 35, image: "tough_guys_toque.png", type: "hat", class: "heavy", effect: null },
        { title: "Noble Amassment of Hats", tf2_quality: "unique", qualityText: "Unique", price: 40, image: "noble_amassment.png", type: "hat", class: "multi-class", effect: null },
        { title: "Troublemaker's Tossle Cap", tf2_quality: "unique", qualityText: "Unique", price: 70, image: "tossle_cap.png", type: "hat", class: "scout", effect: null },
        { title: "Tyrant's Helm", tf2_quality: "unique", qualityText: "Unique", price: 55, image: "tyrants_helm.png", type: "hat", class: "soldier", effect: null },
        { title: "Pyromancer's Mask", tf2_quality: "unique", qualityText: "Unique", price: 65, image: "pyromancers_mask.png", type: "hat", class: "pyro", effect: null },
        { title: "Bill's Hat", tf2_quality: "vintage", qualityText: "Vintage", price: 1500, image: "bills_hat.png", type: "hat", class: "multi-class", effect: null },
        { title: "Vintage Tyrolean", tf2_quality: "vintage", qualityText: "Vintage", price: 1200, image: "vintage_tyrolean.png", type: "hat", class: "medic", effect: null },
        { title: "Fancy Fedora", tf2_quality: "vintage", qualityText: "Vintage", price: 1000, image: "fancy_fedora.png", type: "hat", class: "spy", effect: null },
        { title: "Burning Flames Team Captain", tf2_quality: "unusual", qualityText: "Unusual", price: 95000, image: "team_captain_unusual.png", type: "hat", class: "soldier", effect: "Burning Flames" },
        { title: "Orbiting Fire Bubble Pipe", tf2_quality: "unusual", qualityText: "Unusual", price: 8000, image: "bubble_pipe_unusual.png", type: "hat", class: "pyro", effect: "Orbiting Fire" },
        { title: "Green Energy Modest Pile of Hat", tf2_quality: "unusual", qualityText: "Unusual", price: 7500, image: "modest_pile_unusual.png", type: "hat", class: "multi-class", effect: "Green Energy" },
        { title: "Cloud 9 Well-Rounded Rifleman", tf2_quality: "unusual", qualityText: "Unusual", price: 6000, image: "rifleman_unusual.png", type: "hat", class: "sniper", effect: "Cloud 9" },
        { title: "Proof of Purchase", tf2_quality: "genuine", qualityText: "Genuine", price: 200, image: "proof_of_purchase.png", type: "hat", class: "multi-class", effect: null },
        { title: "Genuine Anger", tf2_quality: "genuine", qualityText: "Genuine", price: 700, image: "anger.png", type: "hat", class: "sniper", effect: null },
        { title: "Monoculus!", tf2_quality: "genuine", qualityText: "Genuine", price: 300, image: "monoculus.png", type: "hat", class: "multi-class", effect: null },
        { title: "Haunted Ghosts Executioner", tf2_quality: "haunted", qualityText: "Haunted", price: 400, image: "executioner_haunted.png", type: "hat", class: "pyro", effect: null },
        { title: "Haunted Cadaver's Cranium", tf2_quality: "haunted", qualityText: "Haunted", price: 350, image: "cadavers_cranium.png", type: "hat", class: "multi-class", effect: null },
        { title: "Haunted Sir Hootsalot", tf2_quality: "haunted", qualityText: "Haunted", price: 450, image: "sir_hootsalot_haunted.png", type: "misc", class: "sniper", effect: null },

        // --- ОРУЖИЕ (type: "weapon") ---
        { title: "Australium Medi Gun", tf2_quality: "strange", qualityText: "Strange", price: 25000, image: "australium_medigun.png", type: "weapon", class: "medic", effect: null },
        { title: "Strange Specialized Killstreak Grenade Launcher", tf2_quality: "strange", qualityText: "Strange", price: 450, image: "grenade_launcher_spec_ks.png", type: "weapon", class: "demoman", effect: null },
        { title: "Strange Rocket Launcher", tf2_quality: "strange", qualityText: "Strange", price: 300, image: "rocket_launcher.png", type: "weapon", class: "soldier", effect: null },
        { title: "Strange Frontier Justice", tf2_quality: "strange", qualityText: "Strange", price: 150, image: "frontier_justice.png", type: "weapon", class: "engineer", effect: null },
        { title: "The Original", tf2_quality: "genuine", qualityText: "Genuine", price: 500, image: "the_original.png", type: "weapon", class: "soldier", effect: null },
        { title: "AWPer Hand", tf2_quality: "genuine", qualityText: "Genuine", price: 600, image: "awper_hand.png", type: "weapon", class: "sniper", effect: null },
        { title: "Sharp Dresser", tf2_quality: "genuine", qualityText: "Genuine", price: 400, image: "sharp_dresser.png", type: "weapon", class: "spy", effect: null },
        { title: "Axtinguisher", tf2_quality: "haunted", qualityText: "Haunted", price: 150, image: "axtinguisher.png", type: "weapon", class: "pyro", effect: null },
        { title: "Horseless Headless Horsemann's Headtaker", tf2_quality: "haunted", qualityText: "Haunted", price: 1200, image: "headtaker.png", type: "weapon", class: "demoman", effect: null },
        { title: "Bat Outta Hell", tf2_quality: "haunted", qualityText: "Haunted", price: 180, image: "bat_outta_hell.png", type: "weapon", class: "multi-class", effect: null },
        { title: "Festive Black Box", tf2_quality: "unique", qualityText: "Unique", price: 300, image: "festive_blackbox.png", type: "weapon", class: "soldier", effect: null },
        { title: "Kritzkrieg", tf2_quality: "unique", qualityText: "Unique", price: 10, image: "kritzkrieg.png", type: "weapon", class: "medic", effect: null },
        { title: "Panic Attack", tf2_quality: "unique", qualityText: "Unique", price: 5, image: "panic_attack.png", type: "weapon", class: "multi-class", effect: null },
        { title: "Wrench", tf2_quality: "unique", qualityText: "Unique", price: 2, image: "wrench.png", type: "weapon", class: "engineer", effect: null },
        { title: "Sniper Rifle", tf2_quality: "unique", qualityText: "Unique", price: 3, image: "sniper_rifle.png", type: "weapon", class: "sniper", effect: null },
        { title: "Knife", tf2_quality: "unique", qualityText: "Unique", price: 4, image: "knife.png", type: "weapon", class: "spy", effect: null },
        { title: "Ambassador", tf2_quality: "vintage", qualityText: "Vintage", price: 200, image: "ambassador.png", type: "weapon", class: "spy", effect: null },
        { title: "Vintage Flare Gun", tf2_quality: "vintage", qualityText: "Vintage", price: 180, image: "flare_gun.png", type: "weapon", class: "pyro", effect: null },
        { title: "Vintage Natascha", tf2_quality: "vintage", qualityText: "Vintage", price: 220, image: "natascha.png", type: "weapon", class: "heavy", effect: null },
        { title: "Collector's Shortstop", tf2_quality: "collectors", qualityText: "Collector's", price: 5000, image: "shortstop_collectors.png", type: "weapon", class: "scout", effect: null },
        { title: "Collector's Stickybomb Launcher", tf2_quality: "collectors", qualityText: "Collector's", price: 6000, image: "stickybomb_launcher_collectors.png", type: "weapon", class: "demoman", effect: null },
        { title: "Collector's Wrench", tf2_quality: "collectors", qualityText: "Collector's", price: 5500, image: "wrench_collectors.png", type: "weapon", class: "engineer", effect: null },

        // --- АКСЕССУАРЫ (type: "misc") ---
        { title: "Earbuds", tf2_quality: "unique", qualityText: "Unique", price: 3500, image: "earbuds.png", type: "misc", class: "multi-class", effect: null },
        { title: "Photo Badge", tf2_quality: "unique", qualityText: "Unique", price: 20, image: "photo_badge.png", type: "misc", class: "multi-class", effect: null },
        { title: "Bonk Boy", tf2_quality: "unique", qualityText: "Unique", price: 45, image: "bonk_boy.png", type: "misc", class: "scout", effect: null },
        { title: "Sight for Sore Eyes", tf2_quality: "unique", qualityText: "Unique", price: 60, image: "sight_for_sore_eyes.png", type: "misc", class: "pyro", effect: null },
        { title: "Pocket Pyro", tf2_quality: "haunted", qualityText: "Haunted", price: 250, image: "pocket_pyro.png", type: "misc", class: "multi-class", effect: null },
        { title: "Voodoo-Cursed Soul (Scout)", tf2_quality: "haunted", qualityText: "Haunted", price: 200, image: "voodoo_soul_scout.png", type: "misc", class: "scout", effect: null },
        { title: "Second Opinion", tf2_quality: "haunted", qualityText: "Haunted", price: 180, image: "second_opinion.png", type: "misc", class: "medic", effect: null },
        { title: "All-Father", tf2_quality: "vintage", qualityText: "Vintage", price: 900, image: "all_father.png", type: "misc", class: "soldier", effect: null },
        { title: "Vintage Merryweather", tf2_quality: "vintage", qualityText: "Vintage", price: 850, image: "vintage_merryweather.png", type: "misc", class: "pyro", effect: null },
        { title: "Physician's Procedure Mask", tf2_quality: "vintage", qualityText: "Vintage", price: 950, image: "procedure_mask.png", type: "misc", class: "medic", effect: null },
        { title: "Genuine Companion Cube Pin", tf2_quality: "genuine", qualityText: "Genuine", price: 150, image: "companion_cube_pin.png", type: "misc", class: "multi-class", effect: null },
        { title: "Genuine Pip-Boy", tf2_quality: "genuine", qualityText: "Genuine", price: 400, image: "pip_boy.png", type: "misc", class: "engineer", effect: null },
        { title: "Genuine Quadwrangler", tf2_quality: "genuine", qualityText: "Genuine", price: 350, image: "quadwrangler.png", type: "misc", class: "heavy", effect: null },
        { title: "Strange Archimedes", tf2_quality: "strange", qualityText: "Strange", price: 500, image: "archimedes.png", type: "misc", class: "medic", effect: null },
        { title: "Strange Clan Pride", tf2_quality: "strange", qualityText: "Strange", price: 100, image: "clan_pride.png", type: "misc", class: "multi-class", effect: null },
        { title: "Strange Professor Speks", tf2_quality: "strange", qualityText: "Strange", price: 90, image: "professor_speks.png", type: "misc", class: "multi-class", effect: null },

        // --- НАСМЕШКИ (type: "taunt") ---
        { title: "Taunt: The Schadenfreude", tf2_quality: "unique", qualityText: "Unique", price: 1200, image: "schadenfreude.png", type: "taunt", class: "multi-class", effect: null },
        { title: "Taunt: Conga", tf2_quality: "unique", qualityText: "Unique", price: 1500, image: "conga.png", type: "taunt", class: "multi-class", effect: null },
        { title: "Taunt: Kazotsky Kick", tf2_quality: "unique", qualityText: "Unique", price: 1600, image: "kazotsky_kick.png", type: "taunt", class: "multi-class", effect: null },
        { title: "Taunt: High Five!", tf2_quality: "unique", qualityText: "Unique", price: 1100, image: "high_five.png", type: "taunt", class: "multi-class", effect: null },
        { title: "Taunt: Rock, Paper, Scissors", tf2_quality: "unique", qualityText: "Unique", price: 900, image: "rps_taunt.png", type: "taunt", class: "multi-class", effect: null },
        { title: "Taunt: Battin' a Thousand", tf2_quality: "unique", qualityText: "Unique", price: 500, image: "battin_a_thousand.png", type: "taunt", class: "scout", effect: null },

        // --- ИНСТРУМЕНТЫ (type: "tool") ---
        { title: "Name Tag", tf2_quality: "unique", qualityText: "Unique", price: 100, image: "name_tag.png", type: "tool", class: "multi-class", effect: null },
        { title: "Description Tag", tf2_quality: "unique", qualityText: "Unique", price: 80, image: "description_tag.png", type: "tool", class: "multi-class", effect: null },
        { title: "Mann Co. Supply Crate Key", tf2_quality: "unique", qualityText: "Unique", price: 6500, image: "mann_co_key.png", type: "tool", class: "multi-class", effect: null },
        { title: "Tour of Duty Ticket", tf2_quality: "unique", qualityText: "Unique", price: 250, image: "tour_of_duty_ticket.png", type: "tool", class: "multi-class", effect: null },
        { title: "Backpack Expander", tf2_quality: "unique", qualityText: "Unique", price: 300, image: "backpack_expander.png", type: "tool", class: "multi-class", effect: null },
        { title: "Gift Wrap", tf2_quality: "unique", qualityText: "Unique", price: 50, image: "gift_wrap.png", type: "tool", class: "multi-class", effect: null },
        { title: "Strange Part: Kills", tf2_quality: "strange", qualityText: "Strange", price: 150, image: "strange_part_kills.png", type: "tool", class: "multi-class", effect: null },
        { title: "Strange Filter: Hightower", tf2_quality: "strange", qualityText: "Strange", price: 80, image: "strange_filter_hightower.png", type: "tool", class: "multi-class", effect: null },
        { title: "Haunted Metal Scrap", tf2_quality: "haunted", qualityText: "Haunted", price: 1000, image: "haunted_metal.png", type: "tool", class: "multi-class", effect: null }
    ];

    function createItemCard(item) {
        const itemParams = new URLSearchParams({
            title: item.title, quality: item.tf2_quality, image: item.image, price: item.price, qualityText: item.qualityText, type: item.type
        });
        if (item.class) itemParams.append('class', item.class);
        if (item.effect) itemParams.append('effect', item.effect);
        const itemLink = `item.html?${itemParams.toString()}`;
        return `
            <div class="item-card" onclick="window.location.href='${itemLink}'">
                <div class="item-image-wrapper">
                    <img src="images/${item.image}" alt="${item.title}" class="item-image">
                </div>
                <div class="item-info">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-quality">Якість: ${item.qualityText}</p>
                    ${item.class && item.type !== 'tool' && item.type !== 'taunt' ? `<p class="item-class">Клас: ${item.class}</p>` : ''}
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
        const quality = document.getElementById("tf2-quality").value;
        const tf2Class = document.getElementById("tf2-class").value; // Возвращаем переменную
        const minPrice = parseFloat(document.querySelector(".input-min").value) || 0;
        const maxPrice = parseFloat(document.querySelector(".input-max").value) || Infinity;
        currentFilteredItems = itemsData.filter(item => {
            const typeMatch = itemType === "all" || item.type === itemType;
            const qualityMatch = quality === "all" || item.tf2_quality === quality;
            const classMatch = tf2Class === "all" || item.class === tf2Class || (item.class === "multi-class" && tf2Class !== "all") || (!item.class && tf2Class === "all");
            const priceMatch = item.price >= minPrice && item.price <= maxPrice;
            return typeMatch && qualityMatch && classMatch && priceMatch;
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
    if (applyBtn) {
        applyBtn.addEventListener("click", applyFiltersAndSort);
    }
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
            updateCartCount('tf2_cart');
        }
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        checkLoginStatus();
    }

    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    applyFiltersAndSort();
    checkLoginStatus();
});