const translations = {
    zh: {
        title: "生气猫交易策略分享网",
        searchPlaceholder: "搜索策略（币种/类型）"
    },
    en: {
        title: "Angry Cat Trading Strategy Hub",
        searchPlaceholder: "Search strategies (coin/type)"
    }
};

let strategies = JSON.parse(localStorage.getItem("strategies")) || [];
let currentLang = "zh";

function saveStrategies() {
    localStorage.setItem("strategies", JSON.stringify(strategies));
}

function renderStrategies(filter = "") {
    const list = document.getElementById("strategyList") || document.getElementById("adminStrategyList");
    list.innerHTML = "";
    
    const displayStrategies = list.id === "strategyList" && !filter 
        ? strategies.slice(-2).reverse() 
        : strategies.filter(s => s.title.includes(filter) || s.coin.includes(filter) || s.type.includes(filter));

    displayStrategies.forEach((strategy, index) => {
        const card = document.createElement("div");
        card.className = "strategy-card";
        card.innerHTML = `
            <h2>${strategy.title}</h2>
            <p>日期: ${strategy.date}</p>
            <p>币种: ${strategy.coin}</p>
            <p>交易类型: ${strategy.type}</p>
            <p>入场位: ${strategy.entry}</p>
            <p>补仓位: ${strategy.addPosition}</p>
            <p>止损: ${strategy.stopLoss}</p>
            <p>仓位: ${strategy.position}%</p>
            <p>方向: ${strategy.direction}</p>
            <p>杠杆: ${strategy.leverage}倍</p>
            <p>止盈位: ${strategy.takeProfit}</p>
            ${list.id === "adminStrategyList" ? `<button onclick="deleteStrategy(${index})">删除</button>` : ""}
        `;
        list.appendChild(card);
    });
}

document.getElementById("strategyForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const newStrategy = {
        title: form.title.value,
        date: new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" }),
        coin: form.coin.value,
        type: form.type.value,
        entry: form.entry.value,
        addPosition: form.addPosition.value,
        stopLoss: form.stopLoss.value,
        position: form.position.value,
        direction: form.direction.value,
        leverage: form.leverage.value,
        takeProfit: form.takeProfit.value
    };
    strategies.push(newStrategy);
    saveStrategies();
    renderStrategies();
    form.reset();
});

function deleteStrategy(index) {
    strategies.splice(index, 1);
    saveStrategies();
    renderStrategies();
}

function searchStrategies() {
    const query = document.getElementById("searchInput").value;
    renderStrategies(query);
}

function switchLang(lang) {
    currentLang = lang;
    document.querySelector("[data-lang='title']").textContent = translations[lang].title;
    document.querySelector("[data-lang-placeholder='searchPlaceholder']").placeholder = translations[lang].searchPlaceholder;
}

document.addEventListener("DOMContentLoaded", () => {
    renderStrategies();
});