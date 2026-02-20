export function calculateLevelUp(userData, xpGain, goldGain) {

    let { level, currentXP, maxXP, hp, maxHp, gold } = userData;
    let didLevelUp = false;

    const newXP = currentXP + xpGain;

    if (newXP >= maxXP) {
        level += 1;
        currentXP = newXP - maxXP;   // carry over excess XP
        maxXP = Math.round(maxXP * 1.5);  // next level requires 50% more XP
        hp = 100;
        maxHp = 100;
        didLevelUp = true;
    } else {
        currentXP = newXP;
    }

    gold = (gold || 0) + goldGain;

    return {
        newStats: { level, currentXP, maxXP, hp, maxHp, gold },
        didLevelUp,
    };
}
