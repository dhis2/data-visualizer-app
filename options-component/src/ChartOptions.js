import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import DataTab from './DataTab';
import TabComponent from './TabComponent';
import StyleTab from './StyleTab';
import AxesAndLegendsTab from './AxesAndLegendsTab';
import strings from './utils';


const styles = {
	title: {
		paddingLeft: 20,
		paddingTop  : 20,
	},
	chart: {
		marginLeft: 120,
		marginRight: 120,
		width: '35%',
	},
	hideButton: {
		left: '90%',
	},
};

const showSelectedTab = (props) => {
	const { activeTab, optionsValues, onChange } = props;
	const tabComponentArray = [ 
		<DataTab
			tabContent={optionsValues}
			onChange={onChange}
		/>, 
		<AxesAndLegendsTab 
			tabContent={optionsValues}
			onChange={onChange}
		/>, 
		<StyleTab 
			tabContent={optionsValues}
			onChange={onChange}
		/> 
	];
	return tabComponentArray[activeTab];
};

const ChartOptions = (props) => {
	const { activeTab, onChange, classes } = props;
	return (
		<div className={classes.chart}>
			<Card>
				<h3 className={classes.title}> {strings.chartOptionsTitle} </h3>
				<TabComponent activeTab={activeTab} onChange={onChange} />
				<CardContent>
					{showSelectedTab(props)}
					<Button className={classes.hideButton} size={'small'} color={'primary'}> Hide </Button>
				</CardContent>
			</Card>
		</div>
	);
};

ChartOptions.propTypes = {
	activeTab: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	optionsValues: PropTypes.object,
};

ChartOptions.defaultProps = {
	activeTab: 0,
};
export default withStyles(styles)(ChartOptions);
