function getWheelResult() {
    const rand = Math.random() * 100; // Число от 0 до 100

    if (rand <= 5) {
        return { type: 'VIP_24', label: 'ВИП на день', discount: 4 };
    } else if (rand <= 15) { // 5 + 10
        return { type: 'DISCOUNT_ONCE', label: 'Скидка 2%', discount: 2 };
    } else if (rand <= 40) { // 5 + 10 + 25
        return { type: 'RESPIN_HOUR', label: 'Крутани через час' };
    } else {
        return { type: 'EMPTY', label: 'Пусто' };
    }
}

function spinWheel() {
    const stats = loadStats();
    const now = Date.now();

    // Проверка на 24 часа
    const ONE_HOUR_MS = 60 * 60 * 1000; // 1 час в миллисекундах
    const TWENTY_FOUR_HOURS_MS = 24 * ONE_HOUR_MS; // 24 часа в миллисекундах
    const timeSinceLastSpin = now - stats.lastSpin; // Время, прошедшее с последнего спина

    // Если с момента последнего спина прошло меньше 24 часов
    if (timeSinceLastSpin < TWENTY_FOUR_HOURS_MS) {
        // Проверяем, было ли разрешение на спин через час (canSpinInHour)
        // И прошло ли уже как минимум 1 час с момента последнего спина
        if (stats.canSpinInHour && timeSinceLastSpin >= ONE_HOUR_MS) {
            // Если да, то разрешаем крутить (код продолжается после этого блока)
        } else {
            // Иначе, спинить еще рано
            tg.showAlert("Еще не время! Жди.");
            return; // Прерываем выполнение функции spinWheel
        }
    }
    // Если прошло 24 часа или были выполнены условия для спина через час,
    // то выполнение функции продолжается, и спин будет разрешен.
    

    const result = getWheelResult();
    stats.lastSpin = now;
    stats.canSpinInHour = false; // Сбрасываем флаг часа

    if (result.type === 'VIP_24') {
        stats.dailyVipUntil = now + (24 * 60 * 60 * 1000);
        tg.showAlert("🔥 Выпал VIP на 24 часа!");
    } 
    else if (result.type === 'DISCOUNT_ONCE') {
        stats.oneTimeDiscount = true;
        // Уведомление админу
        sendAdminMsg(`Привет! Мне выпала одноразовая скидка! Предупредил(а).`);
        tg.showAlert("🎁 Скидка 2% активирована!");
    } 
    else if (result.type === 'RESPIN_HOUR') {
        stats.canSpinInHour = true;
        tg.showAlert("🌀 Повезет через час! Заходи снова.");
    } 
    else {
        tg.showAlert("😞 Сегодня пусто, заходи завтра!");
    }

    saveStats(stats);
    renderPage(); // Перерисовываем витрину с новыми ценами
}
