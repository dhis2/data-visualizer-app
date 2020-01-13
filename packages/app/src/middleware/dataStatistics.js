import { apiPostDataStatistics } from "../api/dataStatistics";

export default () => next => action => {
    typeof action.dataStatisticsId === 'string' &&
    apiPostDataStatistics(action.dataStatisticsId);

    next(action);
};