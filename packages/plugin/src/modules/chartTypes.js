export const YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE';
export const YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN';
export const SINGLE_VALUE = 'SINGLE_VALUE';
export const PIVOT_TABLE = 'PIVOT_TABLE';

const yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];

export const isYearOverYear = type => yearOverYearTypes.includes(type);
export const isSingleValue = type => type === SINGLE_VALUE;
