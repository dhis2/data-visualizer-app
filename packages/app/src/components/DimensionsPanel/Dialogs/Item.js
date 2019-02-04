import React from 'react';
import PropTypes from 'prop-types';
import RemoveDimensionButton from './buttons/RemoveDimensionButton';
import ItemIcon from '../../../assets/ItemIcon';
import { colors } from '../../../modules/colors';
import { styles } from './styles/Item.style';

const Icon = ({ selected, highlighted }) => {
    const { grey, white, accentSecondary } = colors;
    const bgColor = !selected ? grey : highlighted ? white : accentSecondary;

    return <ItemIcon backgroundColor={bgColor} />;
};

const onClickWrapper = (id, index, onItemClick) => event =>
    onItemClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);

export const Item = ({
    selected,
    highlighted,
    id,
    index,
    onRemoveItem,
    onItemClick,
    name,
}) => {
    const selectedState = selected ? 'selected' : 'unselected';

    return (
        <div
            data-test={`dimension-item-${id}`}
            style={highlighted ? styles.highlightedItem : {}}
            className={`${selectedState}-list-item`}
            onClick={onClickWrapper(id, index, onItemClick)}
        >
            <Icon selected={selected} highlighted={highlighted} />
            <span
                style={highlighted ? styles.highlightedText : {}}
                className={`${selectedState}-item-label`}
            >
                {name}
            </span>
            {selected && (
                <RemoveDimensionButton
                    highlighted={highlighted}
                    onClick={() => onRemoveItem(id)}
                />
            )}
        </div>
    );
};

Item.defualtProps = {
    onRemoveItem: () => null,
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    highlighted: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func,
    selected: PropTypes.bool,
};

export default Item;
