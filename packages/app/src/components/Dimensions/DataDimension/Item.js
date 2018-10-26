import React from 'react';
import PropTypes from 'prop-types';
import { RemoveSelectedItemButton } from './buttons';
import { UnselectedIcon } from '../../../assets/UnselectedIcon';
import { SelectedIcon } from '../../../assets/SelectedIcon';
import { styles } from './styles/Item.style';

import './DataDimension.css';

const Icon = ({ iconType }) => {
    const icons = {
        unselected: <UnselectedIcon />,
        selected: <SelectedIcon />,
    };

    return icons[iconType];
};

export const Item = props => {
    const handleClick = event =>
        props.onItemClick(event.metaKey, event.shiftKey, props.index, props.id);

    return (
        <div
            style={props.isHighlighted ? styles.highlighted : {}}
            className={`${props.className}-list-item`}
            onClick={handleClick}
        >
            <Icon iconType={props.className} />
            <span className={`${props.className}-label`}>
                {props.displayName}
            </span>
            <RemoveSelectedItemButton
                showButton={props.className}
                action={() => props.onRemoveItem(props.id)}
            />
        </div>
    );
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
};
