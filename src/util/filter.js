export function Filter(iterator, criteria) {
    const filtered = []

    // iterate values
    for (let value of iterator) {
        if (criteria(value)) filtered.push(value)
    }

    return filtered
}