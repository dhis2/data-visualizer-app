import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './App.css';

const getPropMap = modelObjects => {
    const map = {};

    modelObjects.forEach(modelObj => {
        modelObj.props.forEach(prop => {
            if (!map.hasOwnProperty(prop)) {
                map[prop] = [];
            }

            map[prop].push(modelObj.name);
        });
    });

    return map;
};

export default class App extends Component {
    state = {
        map: null,
    };

    componentDidMount() {
        const d2 = this.props.d2;
        console.log('d2', d2);

        const models = [
            d2.models.reportTable,
            d2.models.chart,
            d2.models.eventReport,
            d2.models.eventChart,
        ];

        this.setState({
            models,
            map: getPropMap([
                {
                    name: d2.models.reportTable.name,
                    props: Object.keys(d2.models.reportTable.modelProperties),
                },
                {
                    name: d2.models.chart.name,
                    props: Object.keys(d2.models.chart.modelProperties),
                },
                {
                    name: d2.models.eventReport.name,
                    props: Object.keys(d2.models.eventReport.modelProperties),
                },
                {
                    name: d2.models.eventChart.name,
                    props: Object.keys(d2.models.eventChart.modelProperties),
                },
            ]),
        });
    }

    getChildContext() {
        return {
            baseUrl: this.props.baseUrl,
            d2: this.props.d2,
        };
    }

    getEntriesByLength = map => {
        const entries = Object.entries(map);
        const lengthMap = {};

        entries.forEach(entry => {
            const prop = entry[0];
            const names = entry[1];

            if (!lengthMap[names.length]) {
                lengthMap[names.length] = [];
            }

            lengthMap[names.length].push(entry);
        });

        return Object.entries(lengthMap);
    };

    render() {
        const { map } = this.state;

        if (map) {
            const entriesByLength = this.getEntriesByLength(map);
            console.log('map', map);
            console.log('entriesByLength', entriesByLength);

            const tables = entriesByLength.map(entry => {
                const len = entry[0];
                const propObjects = entry[1];

                return (
                    <table key={len}>
                        <thead>
                            <tr>
                                <th className="prop">Prop</th>
                                <th>Object</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propObjects.map(obj => {
                                const prop = obj[0];
                                const names = obj[1];

                                return (
                                    <tr key={Math.random()}>
                                        <td>{prop}</td>
                                        <td>{names.join(', ')}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                );
            });

            return (
                <Fragment>
                    <h3>
                        Props for{' '}
                        {this.state.models.map(obj => obj.name).join(', ')}
                    </h3>
                    {tables}
                </Fragment>
            );
        }

        return '';
    }
}

App.childContextTypes = {
    baseUrl: PropTypes.string,
    d2: PropTypes.object,
};
