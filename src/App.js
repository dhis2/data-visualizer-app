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

            map[prop].push(
                modelObj.collection ? modelObj.collectionName : modelObj.name
            );
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
            const names = entry[1];

            if (!lengthMap[names.length]) {
                lengthMap[names.length] = [];
            }

            lengthMap[names.length].push(entry);
        });

        return Object.entries(lengthMap);
    };

    renderList = map => {
        const entriesByLength = this.getEntriesByLength(map);
        console.log('map', map);
        console.log('entriesByLength', entriesByLength);

        const tables = entriesByLength.map(entry => {
            const [len, propObjects] = entry;

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
                            const [prop, names] = obj;

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
            <div style={{ margin: 30 }}>
                <h3>Props sort by number of objects</h3>
                {tables}
            </div>
        );
    };

    renderMap = map => {
        const comboMap = {};
        const entries = Object.entries(map);

        entries.forEach(entry => {
            const [prop, names] = entry;
            const nameId = names.join('-');

            if (!comboMap.hasOwnProperty(nameId)) {
                comboMap[nameId] = [];
            }

            comboMap[nameId].push(prop);
        });

        return (
            <div style={{ margin: 30 }}>
                <h3>Props by combination</h3>
                <table>
                    <thead>
                        <tr>
                            <th className="prop">Combination</th>
                            <th>Props</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(comboMap).map(entry => {
                            const [combo, names] = entry;

                            return (
                                <tr key={combo}>
                                    <td>{combo}</td>
                                    <td>{names.join(', ')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    render() {
        const { map } = this.state;

        if (map) {
            return (
                <Fragment>
                    {this.renderMap(map)}
                    {this.renderList(map)}
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
