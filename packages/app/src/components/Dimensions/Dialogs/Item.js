import React from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { RemoveSelectedItemButton } from './buttons';
import UnselectedIcon from '../../../assets/UnselectedIcon';
import HighlightedIcon from '../../../assets/HighlightedIcon';
import SelectedIcon from '../../../assets/SelectedIcon';
import { styles } from './styles/Item.style';

const Icon = ({ iconType, isHighlighted }) => {
    if (isHighlighted) {
        return <HighlightedIcon />;
    }

    const icons = {
        unselected: <UnselectedIcon />,
        selected: <SelectedIcon />,
    };

    return icons[iconType];
};

const onClickWrapper = props => event =>
    props.onItemClick(event.metaKey, event.shiftKey, props.index, props.id);

export const Item = props => (
    <div
        style={props.isHighlighted ? styles.highlightedItem : {}}
        className={`${props.className}-list-item`}
        onClick={onClickWrapper(props)}
    >
        <Icon iconType={props.className} isHighlighted={props.isHighlighted} />
        <span
            style={props.isHighlighted ? styles.highlightedText : {}}
            className={`${props.className}-item-label`}
        >
            {i18n.t(props.displayName)}
        </span>
        <RemoveSelectedItemButton
            showButton={props.className}
            isHighlighted={props.isHighlighted}
            onClick={() => props.onRemoveItem(props.id)}
        />
    </div>
);

Item.defualtProps = {
    onRemoveItem: () => null,
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func,
    className: PropTypes.string.isRequired,
};

export default Item;
