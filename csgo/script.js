// script.js (оновлений з точними діапазонами float)

document.addEventListener('DOMContentLoaded', function() {

    let sortOrder = 'asc';
    let currentFilteredItems = [];

    const itemsData = [
        // AK-47
        {
            title: "AK-47 | Redline", quality: "field-tested", qualityText: "Після польових випробувань",
            price: 1850, image: "ak47_redline_ft.jpg", type: "rifle", float: 0.2532,
            collection: "The Arms Deal Collection", releaseDate: "2013-08-14",
            info: "AK-47 | Redline - класичний скін з мінімалістичним дизайном."
        },
        {
            title: "AK-47 | Asiimov", quality: "field-tested", qualityText: "Після польових випробувань",
            price: getRandomPrice(1500, 3000), image: "ak47_asiimov_ft.jpg", type: "rifle", float: getRandomFloat(0.15, 0.38),
            collection: "The Winter Offensive Collection", releaseDate: "2013-12-18",
            info: "AK-47 | Asiimov - популярний скін, частина серії Asiimov, відомий своїм футуристичним дизайном."
        },
        {
            title: "AK-47 | Bloodsport", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(3500, 5500), image: "ak47_bloodsport_mw.jpg", type: "rifle", float: getRandomFloat(0.07, 0.15),
            collection: "The Spectrum Collection", releaseDate: "2017-03-15",
            info: "AK-47 | Bloodsport - яскравий скін з агресивним дизайном, популярний серед гравців."
        },
       {
            title: "AK-47 | Blue Laminate", quality: "factory-new", qualityText: "Прямо с завода",
            price: 3200, image: "ak47_blue_laminate_fn.jpg", type: "rifle", float: 0.0498,
            collection: "The Arms Deal Collection", releaseDate: "2013-08-14",
            info: "AK-47 | Blue Laminate - простий, але елегантний скін з синім ламінуванням."
        },
        {
            title: "AK-47 | Neon Rider", quality: 'factory-new', qualityText: 'Прямо с завода',
            price: 2800, image: "ak47_neon_rider_fn.jpg", type: "rifle", float: 0.0655,
            collection: "The Horizon Collection", releaseDate: "2018-08-02",
            info: "AK-47 | Neon Rider - яскравий скін в стилі кіберпанк."
        },

        // M4A4
        {
            title: "M4A1-S | Hyper Beast", quality: "field-tested", qualityText: "Після польових випробувань",
            price: 1300, image: "m4a1s_hyper_beast_ft.jpg", type: "rifle", float: 0.2045,
            collection: "The Falchion Collection", releaseDate: "2015-05-26",
            info: "M4A1-S | Hyper Beast - один з найвідоміших скінів, з яскравим зображенням монстра."
        },
        {
            title: "M4A4 | Neo-Noir", quality: "factory-new", qualityText: "Прямо с завода",
            price: getRandomPrice(4000, 6000), image: "m4a4_neo_noir_fn.jpg", type: "rifle", float: getRandomFloat(0.00, 0.07),
            collection: "The Clutch Collection", releaseDate: "2018-02-15",
            info: "M4A4 | Neo-Noir - стильний скін в стилі нуар, з зображенням жінки."
        },
        {
            title: "M4A4 | The Emperor", quality: "well-worn", qualityText: "Поношене",
            price: getRandomPrice(1800, 2800), image: "m4a4_emperor_ww.jpg", type: "rifle", float: getRandomFloat(0.38, 0.45),
            collection: "The Prisma Collection", releaseDate: "2019-03-13",
            info: "M4A4 | The Emperor - скін з зображенням карти Таро 'Імператор'."
        },
        {
            title: "M4A4 | Desert-Strike", quality: 'field-tested', qualityText: 'Після польових випробувань',
            price: 2400, image: "m4a4_desert_strike_ft.jpg", type: "rifle", float: 0.2916,
            collection: "The Arms Deal 2 Collection", releaseDate: "2013-11-08",
            info: "M4A4 | Desert-Strike - камуфляжний скін в пустельних тонах."
        },

        // AWP
        {
            title: "AWP | Asiimov", quality: "minimal-wear", qualityText: "Майже незношене",
            price: 1050, image: "awp_asiimov_mw.jpg", type: "sniper rifle", float: 0.1212,
            collection: "The Phoenix Collection", releaseDate: "2014-02-20",
            info: "AWP | Asiimov - дуже популярний скін, частина серії Asiimov."
        },
        {
            title: "AWP | Containment Breach", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(6000, 8500), image: "awp_containment_breach_mw.jpg", type: "sniper rifle", float: getRandomFloat(0.07, 0.15),
            collection: "The Shattered Web Collection", releaseDate: "2019-11-18",
            info: "AWP | Containment Breach - яскравий зелений скін з зображенням радіаційної небезпеки."
        },
        {
            title: "AWP | Wildfire", quality: "field-tested", qualityText: "Після польових випробувань",
            price: getRandomPrice(4500, 6500), image: "awp_wildfire_ft.jpg", type: "sniper rifle", float: getRandomFloat(0.15, 0.38),
            collection: "The CS20 Collection", releaseDate: "2019-10-18",
            info: "AWP | Wildfire - скін з зображенням вогняного дракона."
        },
       {
            title: "AWP | Graphite", quality: "minimal-wear", qualityText: "Майже незношене",
            price: 2950, image: "awp_graphite_mw.jpg", type: "sniper rifle", float: 0.1311,
            collection: "The eSports 2013 Collection", releaseDate: "2013-08-14",
            info: "AWP | Graphite - простий, але стильний скін з графітовим візерунком."
        },
        {
        title: "AWP | Electric Hive", quality: "minimal-wear", qualityText: "Майже незношене",
        price: 1180, image: "awp_electric_hive_mw.jpg", type: "sniper rifle", float: 0.1401,
            collection: "The eSports 2013 Winter Collection", releaseDate: "2013-12-18",
          info: "AWP | Electric Hive - скін з ефектом електричних розрядів."
    },
     {
            title: "AWP | Silk Tiger", quality: 'factory-new', qualityText: 'Прямо с завода',
            price: 2800, image: "awp_silk_tiger_fn.jpg", type: "sniper rifle", float: 0.0655,
            collection: "The Anubis Collection", releaseDate: "2023-04-24",
            info: "AWP | Silk Tiger - скін з тигровим візерунком."
        },
        {
            title: "AWP | Duality", quality: 'minimal-wear', qualityText: 'Майже незношене',
            price: 2800, image: "awp_duality_mw.jpg", type: "sniper rifle", float: 0.0855,
            collection: "The Revolution Collection", releaseDate: "2023-02-09",
            info: "AWP | Duality - скін з двома протилежними сторонами."
        },

        // Desert Eagle
        {
            title: "Desert Eagle | Blaze", quality: "well-worn", qualityText: "Поношене",
            price: 2400, image: "deagle_blaze_ww.jpg", type: "pistol", float: 0.4112,
            collection: "The Dust Collection", releaseDate: "2013-08-14",
            info: "Desert Eagle | Blaze - класичний скін з ефектом полум'я."
        },
        {
            title: "Desert Eagle | Code Red", quality: "factory-new", qualityText: "Прямо с завода",
            price: getRandomPrice(3800, 5800), image: "deagle_code_red_fn.jpg", type: "pistol", float: getRandomFloat(0.00, 0.07),
            collection: "The Horizon Collection", releaseDate: "2018-08-02",
            info: "Desert Eagle | Code Red - яскраво-червоний скін, що привертає увагу."
        },
        {
            title: "Desert Eagle | Printstream", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(5500, 7500), image: "deagle_printstream_mw.jpg", type: "pistol", float: getRandomFloat(0.07, 0.15),
            collection: "The Operation Broken Fang Collection", releaseDate: "2020-12-03",
            info: "Desert Eagle | Printstream - стильний чорно-білий скін з перламутровим ефектом."
        },
      {
            title: "Desert Eagle | Kumicho Dragon", quality: 'well-worn', qualityText: 'Поношене',
            price: 2800, image: "deagle_kumicho_dragon_ww.jpg", type: "pistol", float: 0.4300,
            collection: "The Chroma 3 Collection", releaseDate: "2016-04-27",
            info: "Desert Eagle | Kumicho Dragon - скін з зображенням дракона."
        },

        // Glock-18
        {
            title: "Glock-18 | Fade", quality: 'battle-scarred', qualityText: 'Закалене в боях',
            price: 1500, image: "glock_fade_bs.jpg", type: "pistol", float: 0.6554,
            collection: "The Assault Collection", releaseDate: "2013-08-14",
            info: "Glock-18 | Fade - один з найдорожчих скінів для Glock-18, з градієнтним переходом кольорів."
        },
        {
            title: "Glock-18 | Gamma Doppler (Emerald)", quality: "factory-new", qualityText: "Прямо с завода",
            price: getRandomPrice(9000, 12000), image: "glock_gamma_doppler_emerald_fn.jpg", type: "pistol", float: getRandomFloat(0.00, 0.07),
            collection: "The Gamma Collection", releaseDate: "2016-06-15",
            info: "Glock-18 | Gamma Doppler (Emerald) - рідкісний і дорогий скін з серії Doppler."
        },
        {
            title: "Glock-18 | Bullet Queen", quality: "field-tested", qualityText: "Після польових випробувань",
            price: getRandomPrice(1200, 2000), image: "glock_bullet_queen_ft.jpg", type: "pistol", float: getRandomFloat(0.15, 0.38),
            collection: "The Prisma 2 Collection", releaseDate: "2020-03-31",
            info: "Glock-18 | Bullet Queen - яскравий скін з зображенням 'Королеви куль'."
        },
        {
            title: "Glock-18 | Water Elemental", quality: 'battle-scarred', qualityText: 'Закалене в боях',
            price: 2800, image: "glock_water_elemental_bs.jpg", type: "pistol", float: 0.7000,
            collection: "The Breakout Collection", releaseDate: "2014-07-01",
            info: "Glock-18 | Water Elemental - скін з ефектом водяної стихії."
        },

        // MP5-SD
        {
            title: "MP5-SD | Phosphor", quality: "factory-new", qualityText: "Прямо с завода",
            price: getRandomPrice(800, 1500), image: "mp5sd_phosphor_fn.jpg", type: "smg", float: getRandomFloat(0.00, 0.07),
            collection: "The Control Collection", releaseDate: "2020-12-03",
            info: "MP5-SD | Phosphor - яскравий скін з ефектом світіння."
        },
        {
            title: "MP5-SD | Oxide Oasis", quality: "well-worn", qualityText: "Поношене",
            price: getRandomPrice(300, 700), image: "mp5sd_oxide_oasis_ww.jpg", type: "smg", float: getRandomFloat(0.38, 0.45),
            collection: "The Anubis Collection", releaseDate: "2023-04-24",
            info: "MP5-SD | Oxide Oasis - скін з пустельним камуфляжем."
        },

        // P90
        {
            title: "P90 | Emerald Dragon", quality: "well-worn", qualityText: "Поношене",
            price: 1350, image: "p90_emerald_dragon_ww.jpg", type: "smg", float: 0.4122,
            collection: "The Bravo Collection", releaseDate: "2013-09-19",
            info: "P90 | Emerald Dragon - скін з зображенням смарагдового дракона."
        },
       {
            title: "MP9 | Food Chain", quality: 'factory-new', qualityText: 'Прямо с завода',
            price: 2800, image: "mp9_food_chain_fn.jpg", type: "smg", float: 0.0655,
            collection: "The 2021 Dust 2 Collection", releaseDate: "2021-09-22",
            info: "MP9 | Food Chain - яскравий скін з різнокольоровими малюнками."
        },
        {
            title: "MP7 | Akoben", quality: 'minimal-wear', qualityText: 'Майже незношене',
            price: 2800, image: "mp7_akoben_mw.jpg", type: "smg", float: 0.0955,
            collection: "	The Ancient Collection", releaseDate: "2020-12-03",
            info: "MP7 | Akoben - скін з африканськими мотивами."
        },

        // USP-S
        {
            title: "USP-S | Caiman", quality: "battle-scarred", qualityText: "Закалене в боях",
            price: 750, image: "usp_caiman_bs.jpg", type: "pistol", float: 0.7243,
            collection: "The Chroma 2 Collection", releaseDate: "2015-04-15",
            info: "USP-S | Caiman - скін з текстурою шкіри каймана."
        },

        // Ножі
        {
            title: "★ Butterfly Knife | Fade", quality: "factory-new", qualityText: "Прямо с завода",
            price: 12500, image: "butterfly_fade_fn.jpg", type: "knife", float: 0.0212,
            collection: "The Operation Breakout Collection", releaseDate: "2014-07-01",
            info: "★ Butterfly Knife | Fade - один з найпопулярніших і найдорожчих ножів у грі."
        },
        {
            title: "★ Karambit | Doppler (Phase 2)", quality: "minimal-wear", qualityText: "Майже незношене",
            price: 11000, image: "karambit_doppler_p2_mw.jpg", type: "knife", float: 0.0855,
            collection: "The Chroma Collection", releaseDate: "2015-01-08",
            info: "★ Karambit | Doppler - ніж з характерним вигнутим лезом і різнокольоровим візерунком."
        },
        {
            title: "★ Bayonet | Slaughter", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(13000, 18000), image: "bayonet_slaughter_mw.jpg", type: "knife", float: getRandomFloat(0.07, 0.15),
            collection: "The Arms Deal 3 Collection", releaseDate: "2014-02-12",
            info: "★ Bayonet | Slaughter - ніж з характерним 'кривавим' візерунком."
        },
        {
            title: "★ M9 Bayonet | Lore", quality: "factory-new", qualityText: "Прямо с завода",
            price: getRandomPrice(18000, 25000), image: "m9_bayonet_lore_fn.jpg", type: "knife", float: getRandomFloat(0.00, 0.07),
            collection: "The Gamma 2 Collection", releaseDate: "2016-08-18",
            info: "★ M9 Bayonet | Lore - ніж з витонченим золотим візерунком."
        },
        {
            title: "★ Gut Knife | Freehand", quality: "field-tested", qualityText: "Після польових випробувань",
            price: getRandomPrice(7000, 10000), image: "gut_knife_freehand_ft.jpg", type: "knife", float: getRandomFloat(0.15, 0.38),
            collection: "The Prisma Collection", releaseDate: "2019-03-13",
            info: "★ Gut Knife | Freehand - ніж з пурпурно-білим візерунком, нанесеним вручну."
        },
        {
            title: "★ Flip Knife | Autotronic", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(14000, 19000), image: "flip_knife_autotronic_mw.jpg", type: "knife", float: getRandomFloat(0.07, 0.15),
            collection: "The Operation Hydra Collection", releaseDate: "2017-05-23",
            info: "★ Flip Knife | Autotronic - ніж з червоно-чорним дизайном і сітчастими вставками."
        },
        {
            title: "★ Shadow Daggers | Ultraviolet", quality: "battle-scarred", qualityText: "Закалене в боях",
            price: getRandomPrice(6500, 9000), image: "shadow_daggers_ultraviolet_bs.jpg", type: "knife", float: getRandomFloat(0.45, 1.00),
            collection: "The Spectrum 2 Collection", releaseDate: "2017-09-14",
            info: "★ Shadow Daggers | Ultraviolet - парні кинджали з чорно-фіолетовим покриттям."
        },
        {
            title: "★ Huntsman Knife | Black Laminate", quality: "well-worn", qualityText: "Поношене",
            price: getRandomPrice(11000, 15000), image: "huntsman_knife_black_laminate_ww.jpg", type: "knife", float: getRandomFloat(0.38, 0.45),
            collection: "The Huntsman Collection", releaseDate: "2014-05-01",
            info: "★ Huntsman Knife | Black Laminate - ніж з чорним ламінованим руків'ям і лезом."
        },

        // Рукавички
        {
            title: "★ Sport Gloves | Superconductor", quality: "factory-new", qualityText: "Прямо с завода",
            price: 15500, image: "gloves_superconductor_fn.jpg", type: "gloves", float: 0.0615,
            collection: "The Clutch Collection", releaseDate: "2018-02-15",
            info: "★ Sport Gloves | Superconductor - спортивні рукавички з чорно-сірим дизайном і яскравими помаранчевими акцентами."
        },
        {
           title: "★ Specialist Gloves | Crimson Kimono", quality: "minimal-wear", qualityText: "Майже незношене",
           price: 13200, image: "gloves_crimson_kimono_mw.jpg", type: "gloves", float: 0.0988,
           collection: "The Glove Collection", releaseDate: "2016-11-28",
           info: "★ Specialist Gloves | Crimson Kimono - рукавички з червоно-чорним візерунком, що нагадує кімоно."
        },
        {
            title: "★ Hand Wraps | Cobalt Skulls", quality: "field-tested", qualityText: "Після польових випробувань",
            price: getRandomPrice(9500, 14000), image: "hand_wraps_cobalt_skulls_ft.jpg", type: "gloves", float: getRandomFloat(0.15, 0.38),
            collection: "The Clutch Collection", releaseDate: "2018-02-15",
            info: "★ Hand Wraps | Cobalt Skulls - рукавички з синіми черепами на чорному тлі."
        },
        {
            title: "★ Driver Gloves | King Snake", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(16000, 22000), image: "driver_gloves_king_snake_mw.jpg", type: "gloves", float: getRandomFloat(0.07, 0.15),
            collection: "The Operation Hydra Collection", releaseDate: "2017-05-23",
            info: "★ Driver Gloves | King Snake - рукавички з текстурою зміїної шкіри."
        },
        {
            title: "★ Moto Gloves | Spearmint", quality: "factory-new", qualityText: "Прямо с завода",
            price: getRandomPrice(22000, 30000), image: "moto_gloves_spearmint_fn.jpg", type: "gloves", float: getRandomFloat(0.00, 0.07),
            collection: "The Operation Broken Fang Collection", releaseDate: "2020-12-03",
            info: "★ Moto Gloves | Spearmint - мотоциклетні рукавички з м'ятно-білим дизайном."
        },
        {
            title: "★ Specialist Gloves | Fade", quality: "minimal-wear", qualityText: "Майже незношене",
            price: getRandomPrice(18000, 24000), image: "specialist_gloves_fade_mw.jpg", type: "gloves", float: getRandomFloat(0.07, 0.15),
            collection: "The Glove Collection", releaseDate: "2016-11-28",
            info: "★ Specialist Gloves | Fade - рукавички з градієнтним переходом кольорів."
        },
        {
            title: "★ Bloodhound Gloves | Charred", quality: "well-worn", qualityText: "Поношене",
            price: getRandomPrice(5000, 7500), image: "bloodhound_gloves_charred_ww.jpg", type: "gloves", float: getRandomFloat(0.38, 0.45),
            collection: "The Operation Hydra Collection", releaseDate: "2017-05-23",
            info: "★ Bloodhound Gloves | Charred - рукавички з обвугленою текстурою."
        },
    ];



    // Функція для генерації випадкового float в заданому діапазоні
    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Функція для генерації випадкової ціни в заданому діапазоні
    function getRandomPrice(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// Оновлена функція для визначення якості тексту та кольору float
function getItemQuality(floatValue) {
    if (floatValue >= 0 && floatValue <= 0.07) {
        return { quality: "factory-new", qualityText: "Прямо с завода", color: 'linear-gradient(to right, #006400, #228B22)' };
    } else if (floatValue > 0.07 && floatValue <= 0.15) {
        return { quality: "minimal-wear", qualityText: "Майже незношене", color: 'linear-gradient(to right, #228B22, #90EE90)' };
    } else if (floatValue > 0.15 && floatValue <= 0.38) {
        return { quality: "field-tested", qualityText: "Після польових випробувань", color: 'linear-gradient(to right, #90EE90, #FFFF00)' };
    } else if (floatValue > 0.38 && floatValue <= 0.45) {
        return { quality: "well-worn", qualityText: "Поношене", color: 'linear-gradient(to right, #FFFF00, #FFA500)' };
    } else {
        return { quality: "battle-scarred", qualityText: "Закалене в боях", color: 'linear-gradient(to right, #FFA500, #FF0000)' };
    }
}

// Оновлена функція для створення HTML коду картки товару
function createItemCard(item) {
    const qualityData = getItemQuality(item.float);
    const floatBarColor = qualityData.color;
    const floatString = item.float.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
    const itemLink = `item.html?title=${encodeURIComponent(item.title)}&quality=${encodeURIComponent(qualityData.quality)}&image=${encodeURIComponent(item.image)}&float=${encodeURIComponent(item.float)}&price=${encodeURIComponent(item.price)}&collection=${encodeURIComponent(item.collection)}&releaseDate=${encodeURIComponent(item.releaseDate)}`;

    return `
        <div class="item-card" onclick="window.location.href='${itemLink}'">
            <div class="item-image-wrapper">
                <img src="images/${item.image}" alt="${item.title}" class="item-image">
            </div>
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-quality">Якість: ${qualityData.qualityText}</p>
                <div class="item-fill-bar-container">
                    <div class="item-fill-bar" style="width: ${item.float * 100}%; background: ${floatBarColor};"></div>
                </div>
                <p class="item-float">Float: ${floatString}</p>
                <p class="item-price">Ціна: ${item.price} UAH</p>
                <button class="item-button">Осмотрети</button>
            </div>
        </div>
    `;
}

    // Функція для відображення карток товарів (без змін)
    function renderItems(items) {
        const itemsContainer = document.querySelector(".items");
        itemsContainer.innerHTML = "";
        items.forEach(item => {
            itemsContainer.insertAdjacentHTML("beforeend", createItemCard(item));
        });
        checkLoginStatus();
    }

 // Функція для застосування фільтрів та сортування (без змін)
    function applyFiltersAndSort() {
        const weaponType = document.getElementById("weapon-type").value;
        const quality = document.getElementById("quality").value; // Використовуємо значення value, а не text
        const minPrice = parseFloat(document.querySelector(".input-min").value) || 0;
        const maxPrice = parseFloat(document.querySelector(".input-max").value) || Infinity;


        currentFilteredItems = itemsData.filter(item => {

            const itemQuality = getItemQuality(item.float).quality; // отримуємо স্যঁഖഖ quality

            return (
                (weaponType === "all" || item.type === weaponType) &&
                (quality === "all" || itemQuality === quality) && // Порівнюємо з item.quality
                item.price >= minPrice &&
                item.price <= maxPrice
            );
        });

        const sortedItems = [...currentFilteredItems].sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });

        renderItems(sortedItems);
    }


    // Функція для сортування (без змін)
    function sortItemsByPrice() {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        applyFiltersAndSort();
        document.getElementById('sort-by-price').textContent = sortOrder === 'asc' ? 'Ціна: Від дешевих до дорогих' : 'Ціна: Від дорогих до дешевих';
    }

    document.getElementById("apply-filters").addEventListener("click", applyFiltersAndSort);
    document.getElementById("sort-by-price").addEventListener("click", sortItemsByPrice);

    // Функція для перевірки статусу логіну (без змін)
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userName = localStorage.getItem('userName');
        const userGreeting = document.getElementById('user-greeting');
        const logoutButton = document.getElementById('logout-button');
          const userInfo = document.querySelector('.user-info');

        if (isLoggedIn === 'true' && userName) {
              if(userInfo){
                  userInfo.style.display = 'flex'; // Показываем блок .user-info
              }
              if (userGreeting) {
                  userGreeting.textContent = `Користувач: ${userName}`;
              }
              if (logoutButton) {
                logoutButton.style.display = 'inline-block';
              }
          } else {
              if(userInfo){ //  Скрываем блок .user-info
                userInfo.style.display = 'none';
              }
          }
    }
// script.js (оновлений з точними діапазонами float) - ПРОДОВЖЕННЯ

    function logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        checkLoginStatus();
        window.location.reload();
    }

    const logoutBtn = document.getElementById('logout-button');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    renderItems(itemsData); // Отображаем все товары при загрузке страницы
});