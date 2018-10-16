import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import i18n from '@dhis2/d2-i18n';
import * as fromReducers from '../../reducers';
import { colors } from '../../colors';

const style = {
    toolTip: {
        color: colors.white,
        backgroundColor: '#4a4a4a',
        boxShadow: 'none',
        width: 150,
        borderRadius: 3,
        position: 'relative',
        top: 5,
        fontSize: 12,
        padding: 5,
    },
    recommendedIcon: {
        backgroundColor: colors.accentSecondaryLight,
        height: 7,
        width: 7,
        marginTop: 10,
        marginLeft: 4,
        borderRadius: 5,
    },
};

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
                <Paper style={style.toolTip}>{HINT_TEXT}</Paper>
            </Popper>
        );
    };

    render = () => {
        const TooltipOnHover = Boolean(this.state.anchorEl)
            ? this.showTooltip()
            : null;

        return this.checkIfRecommended() ? (
            <div
                style={style.recommendedIcon}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseExit}
            >
                {TooltipOnHover}
            </div>
        ) : null;
    };
}

const mapStateToProps = state => ({
    isRecommended: fromReducers.fromRecommendedIds.sGetRecommendedIds(state),
});

RecommendedIcon.propTypes = {
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isRecommended: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(RecommendedIcon);
