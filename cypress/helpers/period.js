const getPreviousYearStr = () => (new Date().getFullYear() - 1).toString()

const getCurrentYearStr = () => new Date().getFullYear().toString()

export { getPreviousYearStr, getCurrentYearStr }
