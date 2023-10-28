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
