import { getInstance } from 'd2/lib/d2';
import { onError } from './index';

export const apiFetchVisualization = (type, id) =>
    getInstance()
        .then(d2 =>
            d2.models[type].get(id, {
                fields:
                    '*,interpretations[*,user[id,displayName],likedBy[id,displayName],comments[id,lastUpdated,text,user[id,displayName]]],columns[id,filter,legendSet[id],items[dimensionItem~rename(id),dimensionItemType,displayName~rename(name)]],rows[id,filter,legendSet[id],items[dimensionItem~rename(id),dimensionItemType,displayName~rename(name)]],filters[id,filter,legendSet[id],items[dimensionItem~rename(id),dimensionItemType,displayName~rename(name)]],access,userGroupAccesses,publicAccess,displayDescription,user[displayName],!href,!rewindRelativePeriods,!userOrganisationUnit,!userOrganisationUnitChildren,!userOrganisationUnitGrandChildren,!externalAccess,!relativePeriods,!columnDimensions,!rowDimensions,!filterDimensions,!organisationUnitGroups,!itemOrganisationUnitGroups,!indicators,!dataElements,!dataElementOperands,!dataElementGroups,!dataSets,!periods,!organisationUnitLevels,!organisationUnits',
            })
        )
        .catch(onError);
