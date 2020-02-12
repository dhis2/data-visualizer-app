const userAuthorityQuery = {
    authority: {
        resource: 'me/authorization',
        id: ({ authorityId }) => authorityId,
    },
}

export const apiFetchUserAuthority = (dataEngine, authorityId) =>
    dataEngine.query(userAuthorityQuery, { variables: { authorityId } })
