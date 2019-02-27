export const YEAR_OVER_YEAR_LINE = 'YEAR_OVER_YEAR_LINE';
export const YEAR_OVER_YEAR_COLUMN = 'YEAR_OVER_YEAR_COLUMN';

const yearOverYearTypes = [YEAR_OVER_YEAR_LINE, YEAR_OVER_YEAR_COLUMN];

export const isYearOverYear = type => yearOverYearTypes.includes(type);
