import { getInstance } from 'd2'
import { onError } from './index'

export const apiFetchFavourites = () => {
    const endPoint = '/favorites?eventType=VISUALIZATION_VIEW&pageSize=10'

    return getInstance()
        .then(d2 => d2.Api.getApi().get(endPoint))
        .catch(onError)
}
