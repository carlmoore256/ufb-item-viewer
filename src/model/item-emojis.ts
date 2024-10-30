const ACTION_TYPE_EMOJI: Record<ActionType, string> = {
    Buff: "➕",
    Debuff: "➖",
    SetMax: "🔝",
    Summon: "🧙",
    Utility: "🔧",
    Bonus: "🎁",
    PowerBoost: "🔋",
};

export const STAT_EMOJI: Record<string, string> = {
    Health: "❤️",
    Energy: "⚡",
    Melee: "✊",
    Mana: "🔮",
    Gold: "💰",
    Counter: "⚔️",
    Reflect: "🪩",
    Block: "🛡️",
    Dodge: "💨",
    Charge: "🌟",
    Burn: "🔥",
    Freeze: "❄️",
    Steady: "🪨",
    Push: "🙌",
    Pull: "🧲",
    Wall: "🧱",
    Vampire: "🧛",
    Confuse: "💫",
    Poison: "🤢",
    Regenerate: "💖",
    Ghost: "👻",
    Arrow: "🏹",
    Bomb: "💣",
    Landmine: "💥",
    Potion: "🧪",
    Elixir: "🏺", 
    "Bomb Arrow": "💣🏹",
    "Fire Arrow": "🔥🏹",
    "Ice Arrow": "❄️🏹",
    "Poison Arrow": "🤢🏹",
    "Lightning Arrow": "⚡🏹",
};

const AMOUNT_MODIFIER_EMOJI: Record<AmountModifier, string> = {
    Roll: "🎲",
    Random: "🔀",
    Max: "🔝",
};

const TARGET_TYPE_EMOJI: Record<TargetType, string> = {
    Self: "👤",
    Enemy: "👹",
    Ally: "👥",
    Area: "♨️",
};


export const emojisForItemEffect = (itemEffect: ItemEffect) => {
    return {
        action: ACTION_TYPE_EMOJI[itemEffect.action],
        target: TARGET_TYPE_EMOJI[itemEffect.target],
        stat: itemEffect.stat && STAT_EMOJI[itemEffect.stat],
        amountModifier: itemEffect.amountModifier && AMOUNT_MODIFIER_EMOJI[itemEffect.amountModifier],
        isRecurring: "🔁",
    };
};
