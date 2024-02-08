export const convertDate = (date: Date): string => {
    const dateValue = new Date(date).valueOf();
    const timezoneOffset = new Date(date).getTimezoneOffset();
    const localDate = new Date(dateValue - timezoneOffset * 60000)
    return localDate.toLocaleDateString();
};