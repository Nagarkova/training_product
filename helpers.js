function customSort(arr, field, order = 'asc') {
    return arr.sort((a, b) => {
        const tempA = a[field];
        const tempB = b[field];
        if (typeof tempA === 'string' && typeof tempB === 'string') {
            return compareString(a,b,field,order)
        }
        return compareNumber(a,b,field,order)



    });
}
function compareString(a,b,field,order) {
    const valA = a[field]?.toString().toLowerCase() || '';
    const valB = b[field]?.toString().toLowerCase() || '';

    if (order === 'asc') {
        return valA.localeCompare(valB);
    } else {
        return valB.localeCompare(valA);
    }
}
function compareNumber(a,b,field,order) {
    const valA = Number(a[field]) || 0;
    const valB = Number(b[field]) || 0;

    return order === 'asc' ? valA - valB : valB - valA;
}
