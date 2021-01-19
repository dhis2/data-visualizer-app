const lengthOfIDs = 11

const getRouteFromHash = hash => hash.slice(hash.lastIndexOf('/') + 1)

export const expectRouteToBeAOId = () =>
    cy
        .location()
        .should(loc =>
            expect(getRouteFromHash(loc.hash)).to.match(
                new RegExp(`[A-Za-z0-9]{${lengthOfIDs}}`, 'gm')
            )
        )

export const expectRouteToBeEmpty = () =>
    cy
        .location()
        .should(loc => expect(getRouteFromHash(loc.hash)).to.have.length(0))
