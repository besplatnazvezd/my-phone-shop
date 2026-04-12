function calculateFinalPrice(basePrice) {
    const stats = loadStats();
    let totalDiscount = 0;

    // 1. Карта (навсегда 3%)
    if (stats.hasVipCard) totalDiscount += 3;

    // 2. VIP на день (4%)
    if (stats.dailyVipUntil > Date.now()) totalDiscount += 4;

    // 3. Рефералы (1.25% за каждого)
    totalDiscount += (stats.referralCount * 1.25);

    // 4. Одноразовая скидка (2%)
    let isHot = false;
    if (stats.oneTimeDiscount) {
        totalDiscount += 2;
        isHot = true; // Будет гореть кнопка
    }

    const finalPrice = Math.floor(basePrice * (1 - totalDiscount / 100));
    return { finalPrice, isHot };
}
