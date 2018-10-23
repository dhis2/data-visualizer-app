import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sGetCurrent } from '../../reducers/current';
import { sGetChart } from '../../reducers/chart';
import { apiDownloadImage, apiDownloadData } from '../../api/analytics';

import DownloadMenu from './DownloadMenu';

export class Download extends Component {
    downloadImage = async type => {
        const { current, chart } = this.props;

        const formData = new URLSearchParams();

        formData.append('filename', current.name);

        if (chart && chart.getSVGForExport) {
            formData.append('svg', chart.getSVGForExport());
        }

        const blob = await apiDownloadImage(type, formData);
        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');
    };

    downloadData = async (type, idScheme, path) => {
        const { current } = this.props;

        const url = await apiDownloadData(current, type, idScheme, path);

        window.open(url, type.match(/(xls|csv)/) ? '_top' : '_blank');
    };

    render() {
        const { current } = this.props;

        return (
            <DownloadMenu
                analyticObject={current}
                downloadImage={this.downloadImage}
                downloadData={this.downloadData}
            />
        );
    }
}

const mapStateToProps = state => ({
    current: sGetCurrent(state),
    chart: sGetChart(state),
});

export default connect(
    mapStateToProps,
    {}
)(Download);
