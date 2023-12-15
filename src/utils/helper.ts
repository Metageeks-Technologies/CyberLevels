export function getDate(date: string) {

    const monthArr = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const createdAtDate = new Date(date);
    let day = createdAtDate.getDate();
    const month = createdAtDate.getMonth(); // Months are zero-based, so we add 1
    const year = createdAtDate.getFullYear();



    return `${day} ${monthArr[month]} ${year} `;
};

export function camelCaseToNormal(str: string) {
    // Use a regular expression to find all occurrences of a lowercase letter
    // followed by an uppercase letter, and replace them with a space and the lowercase letter.
    return str.replace(/([a-z])([A-Z])/g, '$1 $2')
        // Capitalize the first letter of the resulting string.
        .replace(/^./, function (char) {
            return char.toUpperCase();
        });
}

