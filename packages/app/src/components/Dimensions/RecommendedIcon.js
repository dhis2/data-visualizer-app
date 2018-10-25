import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import i18n from '@dhis2/d2-i18n';
import { sGetFetchedIds } from '../../reducers/recommendedIds';
import { styles } from './styles/RecommendedIcon.style';

export class RecommendedIcon extends Component {
    state = { anchorEl: null };

    onMouseOver = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    onMouseExit = () => {
        this.setState({ anchorEl: null });
    };

    checkIfRecommended = () => {
        const { isRecommended, isSelected, id } = this.props;
        return isRecommended.includes(id) && !isSelected;
    };

    showTooltip = () => {
        const HINT_TEXT = i18n.t('Dimension recommended with selected data');

        return (
            <Popper
                anchorEl={this.state.anchorEl}
                open={Boolean(this.state.anchorEl)}
                placement="bottom"
            >
                <Paper style={styles.toolTip}>{HINT_TEXT}</Paper>
            </Popper>
        );
    };

    render = () => {
        const TooltipOnHover = Boolean(this.state.anchorEl)
            ? this.showTooltip()
            : null;

        return this.checkIfRecommended() ? (
            <div
                style={styles.recommendedIcon}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
            >
                {TooltipOnHover}
            </div>
        ) : null;
    };
}

const mapStateToProps = state => ({
    isRecommended: sGetFetchedIds(state),
});

RecommendedIcon.propTypes = {
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isRecommended: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(RecommendedIcon);
