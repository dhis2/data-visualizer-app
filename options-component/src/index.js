import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ChartOptions from './ChartOptions';
import registerServiceWorker from './registerServiceWorker';

import i18n from './locales';
import { config, getUserSettings } from 'd2/lib/d2';

const configI18n = (userSettings) => {
    const uiLocale = userSettings.keyUiLocale;

    if (uiLocale && uiLocale !== 'en') {
        config.i18n.sources.add(`./i18n/i18n_module_${uiLocale}.properties`);
    }

    config.i18n.sources.add('./i18n/i18n_module_en.properties');
    i18n.changeLanguage(uiLocale);
};

class App extends Component {
    state = { 
        //temporary state container to in order to keep the component as "controlled components" and avoid warnings.
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

    handleChange = (content, value) => {   
        console.log(content, value);
        content === 'activeTab' ? (
            this.setState({ activeTab: value })
        ) : (
            this.setState({
                ...this.state,
                optionsValues: {
                    ...this.state.optionsValues,
                    [content]: value,
                },
            }) 
        );
    };

    render = () => (
        <ChartOptions 
            activeTab={this.state.activeTab}
            onChange={this.handleChange}
            optionsValues={this.state.optionsValues}
        />
    );
}

getUserSettings()
    .then(configI18n)
    .then(() => {
        ReactDOM.render(
            <App />, document.getElementById('root')
        );
    });


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
