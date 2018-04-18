import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import DataTabCheckBoxes from './DataTabCheckBoxes';
import strings from './utils';

const styles = {
	formControl: {
		minWidth: 200,
	},
	inputLabeltextSize: {
		fontSize: 13,
	},
	textFields: {
		marginRight: 20,
		width: 100,
	},
	formControlCoverWholeRow: {
		marginRight: '100%',
	},
	textFieldCoverWholeRow: {
		marginRight: '55%',
		width: 200,
	},
	divBorder: {
		borderBottom: '1px solid rgb(158, 158, 158)',
		paddingBottom: 35,
	},
};

const renderTextFields = (classes, tabContent, onChange) => {
	return tabContent.map(([key, value], i) => (
		<TextField 
			className={i % 2 === 0 ? classes.textFields : classes.textFieldCoverWholeRow} // 2nd and 4th TextField component pads out rest of the row space 
			InputLabelProps={{ className: classes.inputLabeltextSize }}
			label={strings.data[key]}
			onChange={(event) => { onChange(key, event.target.value); }} // TODO (?) use parseInt on number? onChange will always pass a string
			type={i % 2 === 0 ? 'number' : 'string'} // 1st and 3rd TextField component are number specific
			value={value}
			key={i}
		/>
	));
};

const renderSelectFields = (classes, tabContent, onChange) => {
	//render first two select components
	// call			{renderTextFields(classes, textFields, onChange)} (?)
	//render last select component
};

const DataTab = props => {
	const { classes, tabContent, onChange } = props;
	let textFields = Object.entries(tabContent).slice(5, 9); // slice the prop object, to render DataTab's textfield values 
	return (
		<div className={classes.divBorder}>
			<DataTabCheckBoxes 
				tabContent={tabContent}
				onChange={onChange}
			/>

			<FormControl className={classes.formControl}>
				<InputLabel className={classes.inputLabeltextSize}> {strings.data.hideEmptyCategories.defaultValue} </InputLabel>
				<Select
					value={tabContent.category}
					onChange={(event) => { onChange('category', event.target.value); }}
				>
					{strings.data.hideEmptyCategories.alternatives.map((alternative, id) => (
						<MenuItem key={id} value={alternative}> {alternative } </MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classNames(classes.formControl, classes.formControlCoverWholeRow)}>
				<InputLabel className={classes.inputLabeltextSize}> {strings.data.trendLine.defaultValue} </InputLabel>
				<Select
					value={tabContent.trendLine}
					onChange={(event) => { onChange('trendLine', event.target.value); }}
				>
					{strings.data.trendLine.alternatives.map((alternative, id) => (
						<MenuItem key={id} value={alternative}> {alternative } </MenuItem>
					))}
				</Select>
			</FormControl>

			{renderTextFields(classes, textFields, onChange)}

			<FormControl className={classes.formControl}>
				<InputLabel className={classes.inputLabeltextSize}>{strings.data.sortOrder.defaultValue}</InputLabel>
				<Select
					value={tabContent.sortOrder}
					onChange={(event) => { onChange('sortOrder', event.target.value); }}
				>
					{strings.data.sortOrder.alternatives.map((alternative, id) => (
						<MenuItem key={id} value={alternative}> {alternative} </MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

DataTab.propTypes = {
	onChange: PropTypes.func.isRequired,
	tabContent: PropTypes.shape({
		showValues: PropTypes.bool,
		useCumulative: PropTypes.bool,
		useStacked: PropTypes.bool,
		category: PropTypes.string,
		trendLine: PropTypes.string,
		targetLineValue: PropTypes.string,
		targetLineTitle: PropTypes.string,
		baseLineValue: PropTypes.string,
		baseLineTitle: PropTypes.string,
		sortOrder: PropTypes.string,
	}),
};
DataTab.defaultProps = {
	tabContent: {
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
	}, 
};

export default withStyles(styles)(DataTab);
