export const monthYearPattern = (month, year) =>
    new RegExp(`${month} ${year}|${year} ${month}`)
