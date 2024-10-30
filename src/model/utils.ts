
export function deepMerge(
    target: any,
    source: any,
    isPrototype: boolean = false,
    markAsInherited: boolean = false
) {
    Object.keys(source).forEach((key) => {
        const sourceValue = source[key];
        const isObject = sourceValue && typeof sourceValue === "object";
        const isArray = Array.isArray(sourceValue);

        if (isObject) {
            if (!target[key]) {
                target[key] = isArray ? [] : {};
            }

            if (isArray) {
                // If it's an array, concatenate and tag each element if markAsInherited is true
                target[key] = target[key].concat(
                    sourceValue.map((element: any) => {
                        return markAsInherited
                            ? { ...element, inherited: true }
                            : element;
                    })
                );
            } else {
                // If it's an object, recursively merge and tag
                deepMerge(
                    target[key],
                    sourceValue,
                    isPrototype,
                    markAsInherited
                );
            }
        } else if (!target.hasOwnProperty(key)) {
            // Assign primitive values directly
            target[key] = sourceValue;
        }
    });
    return target;
}
