import { getInstance } from 'd2/lib/d2';

export const apiDownloadImage = async (type, formData) => {
    const d2 = await getInstance();
    const api = d2.Api.getApi();

    const url = `${api.baseUrl}/svg.${type}`;

    return api
        .fetch(url, {
            method: 'POST',
            body: formData,
            headers: new Headers(api.defaultHeaders),
        })
        .then(res => res.blob());
};

export const apiDownloadData = async (current, format, idScheme, path) => {
    const d2 = await getInstance();
    const api = d2.Api.getApi();

    let req = new d2.analytics.request()
        .fromModel(current, path === 'dataValueSet')
        .withFormat(format);

    if (path) {
        req = req.withPath(path);
    }

    if (idScheme) {
        req = req.withOutputIdScheme(idScheme);
    }

    const url = new URL(req.buildUrl(), api.baseUrl);

    Object.entries(req.buildQuery()).forEach(([key, value]) =>
        url.searchParams.append(key, value)
    );

    return url;
};
