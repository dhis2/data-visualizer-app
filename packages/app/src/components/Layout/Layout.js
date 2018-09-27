import React from 'react';
import { connect } from 'react-redux';

import Axis from './Axis';
import { sGetUiLayout } from '../../reducers/ui';
import { sGetDimensions } from '../../reducers/dimensions';
import { colors } from '../../colors';

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
    },
    item: {
        borderColor: colors.greyLight,
        borderStyle: 'solid',
        borderWidth: '0 0 1px 1px',
    },
    filters: {
        gridRowStart: 'span 2',
    },
};

const axisStyles = {
    columns: {
        height: 36,
    },
    rows: {
        height: 36,
    },
    filters: {
        height: 81,
    },
};

class Layout extends React.Component {
    state = {
        dimensions: [],
    };

    renderAxisDropzone = axisName => {
        const itemStyle = {
            ...styles.item,
            ...styles[axisName],
        };

        return (
            <div
                className={`${axisName}-container grid-item`}
                style={itemStyle}
            >
                <Axis
                    axisName={axisName}
                    axisStyle={{ ...axisStyles[axisName] }}
                />
            </div>
        );
    };

    render() {
        return (
            <div className="layout-container" style={styles.container}>
                {this.renderAxisDropzone('columns')}
                {this.renderAxisDropzone('filters')}
                {this.renderAxisDropzone('rows')}
            </div>
        );
    }
}

Layout.displayName = 'Layout';

const mapStateToProps = state => ({
    layout: sGetUiLayout(state),
    dimensions: sGetDimensions(state),
});

export default connect(mapStateToProps)(Layout);
