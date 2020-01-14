import { getInstance } from 'd2'
import { onError } from './index'

export const apiFetchFavorites = () => {
    const endPoint =
        '/dataStatistics/favorites?eventType=VISUALIZATION_VIEW&pageSize=5'

    return getInstance()
        .then(d2 => d2.Api.getApi().get(endPoint))
        .then(result => result)
        .catch(onError)
}
