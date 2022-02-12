export function isArrayOfStrings(value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return !value.map((x) => typeof x !== 'string').includes(true);
}

export function test(value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return !value.map((x) => typeof x !== 'string').includes(true);
}
