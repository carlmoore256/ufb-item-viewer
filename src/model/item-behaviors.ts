export function combineNamedItemBehaviors(
    itemBehaviors: ItemBehavior[]
): ItemBehavior[] {
    const uniqueNames = [
        ...new Set(itemBehaviors.map((behavior) => behavior.name)),
    ];

    let combinedItemBehaviors: ItemBehavior[] = [];

    uniqueNames.forEach((name) => {
        const behaviorsWithName = itemBehaviors.filter(
            (behavior) => behavior.name === name
        );
        const combinedBehavior = mergeItemBehaviors(behaviorsWithName);
        console.log("Combined behavior", combinedBehavior);
        combinedItemBehaviors.push(combinedBehavior);
    });

    return combinedItemBehaviors;
}

export function mergeItemBehaviors(
    itemBehaviors: ItemBehavior[]
): ItemBehavior {
    let combinedBehavior = JSON.parse(JSON.stringify(itemBehaviors[0])); // Deep copy of the first behavior

    const itemEffectKey = (itemEffect: ItemEffect) => {
        return `${itemEffect.action}_${itemEffect.stat}_${itemEffect.target}`;
    };

    const effectMap: Record<string, ItemEffect[]> = {};

    // Aggregate all effects into a map based on their action_stat_target key
    itemBehaviors.forEach((behavior) => {
        behavior.effects?.forEach((effect) => {
            const key = itemEffectKey(effect);
            if (!effectMap[key]) {
                effectMap[key] = [];
            }
            effectMap[key].push(effect);
        });
    });

    // Combine effects with the same action, stat, and target
    combinedBehavior.effects = Object.values(effectMap).map((effects) => {
        if (effects.length === 1) {
            return effects[0]; // Only one effect, no need to merge
        } else {
            // Merge effects by summing values for each attribute
            return effects.reduce((acc, curr: any) => {
                for (let key in curr) {
                    if (
                        typeof curr[key] === "number" &&
                        acc.hasOwnProperty(key)
                    ) {
                        acc[key] += curr[key];
                    }
                }
                return acc;
            }, JSON.parse(JSON.stringify(effects[0]))); // Deep copy of the first effect as the starting point
        }
    });

    return combinedBehavior;
}

// import { deepMerge } from "./utils";

// // combine any behaviors in a list with the same name into a single behavior, modifying the array in place
// export function combineNamedItemBehaviors(itemBehaviors: ItemBehavior[]) {
//     // find all the unique names
//     const uniqueNames = [
//         ...new Set(itemBehaviors.map((behavior) => behavior.name)),
//     ];

//     // for each unique name, combine all the behaviors into a single behavior
//     uniqueNames.forEach((name) => {
//         // find all the behaviors with this name
//         const behaviors = itemBehaviors.filter(
//             (behavior) => behavior.name === name
//         );
//         if (name == "Bonus" && behaviors.length > 1) {
//             console.log("behaviors", behaviors);
//         }
//         // combine them into a single behavior
//         const combinedBehavior = mergeItemBehaviors(behaviors);
//         // remove the old behaviors
//         itemBehaviors = itemBehaviors.filter(
//             (behavior) => behavior.name !== name
//         );
//         // add the new behavior
//         itemBehaviors.push(combinedBehavior);
//     });

//     return itemBehaviors;
// }

// export function mergeItemBehaviors(itemBehaviors: ItemBehavior[]) {
//     // create a deep copy of the first behavior
//     let combinedBehavior = JSON.parse(JSON.stringify(itemBehaviors[0]));

//     const itemEffectKey = (itemEffect: ItemEffect) => {
//         return `${itemEffect.action}_${itemEffect.stat}_${itemEffect.target}`;
//     };

//     const allEffects: ItemEffect[] = [];

//     itemBehaviors.forEach(b => b.effects && allEffects.push(...b.effects))
//     console.log(allEffects)

//     // for (const effect of allEffects) {
//     //     console.log(itemEffectKey(effect));
//     // }
//     // const actionStatBehavior = itemBehaviors.map(b => `${b.}`)

//     // for each behavior after the first, merge it into the combined behavior
//     itemBehaviors.slice(1).forEach((behavior) => {
//         console.log("merging behavior", behavior.effects);
//         // find where the action, stat, and target are the same
//     });
//     return combinedBehavior;
// }

// // function mergeItemBehavior(behavior1: ItemBehavior, behavior2: ItemBehavior) {
// //     // create a deep copy of the first behavior
// //     let combinedBehavior = JSON.parse(JSON.stringify(behavior1));
// //     // merge the second behavior into the combined behavior
// //     combinedBehavior = deepMerge(combinedBehavior, behavior2, false, false);
// //     return combinedBehavior;
// // }
