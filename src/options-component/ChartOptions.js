import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Card, { CardContent } from 'material-ui-next/Card';
import Button from 'material-ui-next/Button';
import i18n from 'd2-i18n';
import DataTab from './DataTab';
import TabsBar from './TabsBar';
import StyleTab from './StyleTab';
import AxesAndLegendsTab from './AxesAndLegendsTab';

const styles = {
    title: {
        height: 24,
        width: 747,
    },
    card: {
        width: 795,
        minWidth: 795,
        height: 668,
        minHeight: 668,
    },
    cardContent: {
        height: 527,
        width: 747,
    },
    hideButton: {
        left: '90%',
    },
};

class ChartOptions extends Component {
    state = {
        activeTab: 0,
        optionsValues: {
            // DataTab
            showValues: false,
            useCumululative: false,
            useStacked: false,
            category: '',
            trendLine: '',
            targetLineValue: '',
            targetLineTitle: '',
            baseLineValue: '',
            baseLineTitle: '',
            sortOrder: '',
            aggregation: '',
            // Axes&LegendTab
            axisMin: '',
            axisMax: '',
            tickSteps: '',
            decimals: '',
            rangeTitle: '',
            domainTitle: '',
            domainSubtitle: '',
            hideChartLegend: false,
            hideChartTitle: false,
            hideSubtitle: false,
            // StyleTab
            noSpace: false,
        },
    };
    handleContentChange = entry => event => {
        event.target.type === 'checkbox'
            ? this.setState({
                  ...this.state,
                  optionsValues: {
                      ...this.state.optionsValues,
                      [entry]: event.target.checked,
                  },
              })
            : this.setState({
                  ...this.state,
                  optionsValues: {
                      ...this.state.optionsValues,
                      [entry]: event.target.value,
                  },
              });
    };

    handleTabChange = (event, value) => {
        this.setState({ activeTab: value });
    };

    render = () => {
        const { classes } = this.props;
        let showCurrentTab = [
            <DataTab
                onChange={this.handleContentChange}
                tabContent={this.state.optionsValues}
            />,
            <AxesAndLegendsTab
                onChange={this.handleContentChange}
                tabContent={this.state.optionsValues}
            />,
            <StyleTab
                onChange={this.handleContentChange}
                tabContent={this.state.optionsValues}
            />,
        ];

        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <h3 className={classes.title}>{i18n.t('Chart Options')}</h3>
                    <TabsBar
                        activeTab={this.state.activeTab}
                        onChange={this.handleTabChange}
                    />
                    {showCurrentTab[this.state.activeTab]}
                    <Button
                        className={classes.hideButton}
                        color={'primary'}
                        size={'small'}
                        //TODO: Dispatch settings to Redux store (?)
                    >
                        {i18n.t('Hide')}
                    </Button>
                </CardContent>
            </Card>
        );
    };
}

ChartOptions.propTypes = {
    activeTab: PropTypes.number,
    classes: PropTypes.object,
};

ChartOptions.defaultProps = {
    activeTab: 0,
};
export default withStyles(styles)(ChartOptions);
