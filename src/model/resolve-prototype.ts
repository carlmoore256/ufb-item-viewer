import { deepMerge } from './utils';

// function deepMerge(target: any, source: any, isPrototype: boolean = false) {
//     Object.keys(source).forEach((key) => {
//         const sourceValue = source[key];
//         const isObject = sourceValue && typeof sourceValue === 'object';
//         const isArray = Array.isArray(sourceValue);

//         if (isObject) {
//             if (!target[key]) {
//                 target[key] = isArray ? [] : {};
//             }

//             if (isArray) {
//                 // If it's an array, concatenate and tag each element if it's from the prototype
//                 target[key] = target[key].concat(sourceValue.map((element: any) => {
//                     return isPrototype ? { ...element, inherited: true } : element;
//                 }));
//             } else {
//                 // If it's an object, recursively merge and tag
//                 deepMerge(target[key], sourceValue, isPrototype);
//             }
//         } else if (!target.hasOwnProperty(key)) {
//             // Assign primitive values directly
//             target[key] = sourceValue;
//         }
//     });
//     return target;
// }

export const mergePrototype = (item: any, items: any[], markAsInherited: boolean = true): any => {
    if (!item.prototype) {
        return item;
    }

    const prototypeItem = items.find((i) => i.id === item.prototype);
    if (!prototypeItem) {
        throw new Error(
            `Prototype item with id '${item.prototype}' not found.`
        );
    }
    // Create a deep copy of the item
    let resolvedItem = JSON.parse(JSON.stringify(item));
    // Recursively resolve the prototype
    let resolvedPrototype = mergePrototype(prototypeItem, items);
    // Deep merge the resolved prototype into the resolved item
    return deepMerge(resolvedItem, resolvedPrototype, true, markAsInherited);
};
