import { isYearOverYear } from '../../modules/chartTypes';

getAxisMenuItems = dimensionId =>
    AXIS_NAMES.filter(key => key !== this.props.axisName).map(key => (
        <MenuItem
            key={`${dimensionId}-to-${key}`}
            onClick={this.props.getMoveHandler({ [dimensionId]: key })}
        >{`${i18n.t('Move to')} ${axisLabels[key]}`}</MenuItem>
    ));

getRemoveMenuItem = dimensionId => (
    <MenuItem
        key={`remove-${dimensionId}`}
        onClick={this.props.getRemoveHandler(dimensionId)}
    >
        {i18n.t('Remove')}
    </MenuItem>
);

getMenuItems = dimensionId => [
    ...this.getAxisMenuItems(dimensionId),
    this.getRemoveMenuItem(dimensionId),
];
