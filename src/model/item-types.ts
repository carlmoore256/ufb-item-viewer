// some items are equippable.
// that means they can be considered "powers"
type ResourceType = "Health" | "Energy" | "Mana" | "Melee" | "Gold" | "Item";

type TargetType = "Self" | "Enemy" | "Ally" | "Area";

// setMax is for things like setting the max energy or health higher
type ActionType =
    // | "Damage"
    // | "Heal"
    | "Buff"
    | "Debuff" // reduces a stat
    | "SetMax" // sets the max value of a stat (like health or energy)
    | "Summon"
    | "Utility"// for things like teleporting or moving
    | "Bonus"
    | "PowerBoost"; // powerboost modifies the attack

type AmountModifier = "Roll" | "Random" | "Max"; // roll = 1-6; random = range of target value

// an item can be collected from the world in different places
type Item = {
    id: string;
    name: string;
    prototype?: string; // here's how we can inherit from other items
    description?: string;
    category: string;
    isEquippable: boolean;
    behaviors: ItemBehavior[];
};

type ItemBehavior = {
    name: string; // @default("Default"), covers things like "Ice Arrow", "Poison Arrow", "Fire Arrow", etc
    behaviorType: "Hold" | "Equip" | "Use" | "Craft"; // consider adding "Attack"
    requiredStates: string[];
    costs?: Cost[];
    effects?: ItemEffect[];
    range?: {
        type: "Linear" | "Radius";
        distance: number;
    };
    inherited?: boolean;
};

// defines how the application will react to the use of an item
type ItemEffect = {
    action: ActionType;
    target: TargetType;
    stat?: string;
    description?: string;
    amount?: number; // Optional, used for quantifiable effects like damage or heal
    amountModifier?: AmountModifier; // roll = 1-6; random = range of target value
    duration?: number; // For effects with a time component, sets a timeout
    isRecurring?: boolean; // Any effect that is applied every turn
};

type Cost = {
    resource: ResourceType;
    amount: number;
    amountModifier?: AmountModifier; // roll = 1-6; random = range of target value
};
