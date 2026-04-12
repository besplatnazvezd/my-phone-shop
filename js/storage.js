const BOSS_KEY = "boss_store_data";

function loadStats() {
    return JSON.parse(localStorage.getItem(BOSS_KEY)) || {
        hasVipCard: false,
        dailyVipUntil: 0,
        oneTimeDiscount: false,
        referralCount: 0,
        lastSpin: 0,
        canSpinInHour: false
    };
}

function saveStats(stats) {
    localStorage.setItem(BOSS_KEY, JSON.stringify(stats));
}
