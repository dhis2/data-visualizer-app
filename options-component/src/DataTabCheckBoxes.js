import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import strings from './utils';

const DataTabCheckBoxes = (props) => {
	const { tabContent, onChange } = props;
	return(
		<FormGroup>
			<FormControlLabel
				label={strings.data.values}
				control={<Checkbox
					checked={tabContent.showValues}
					color={'primary'}
					onChange={(event) => { onChange('showValues', event.target.checked); }}
				/>}
			/>
			<FormControlLabel
				label={strings.data.cumulative}
				control={<Checkbox
					checked={tabContent.useCumulative}
					color={'primary'}
					onChange={(event) => { onChange('useCumulative', event.target.checked); }}
				/>}
			/>
			<FormControlLabel
				label={strings.data.stacked}
				control={<Checkbox
					checked={tabContent.useStacked}
					color={'primary'}
					onChange={(event) => { onChange('useStacked', event.target.checked); }}
				/>}
			/>
		</FormGroup>
	);
};

DataTabCheckBoxes.propTypes = {
	tabContent: PropTypes.shape({
		showValues: PropTypes.bool,
		useCumulative: PropTypes.bool,
		useStacked: PropTypes.bool,
	}),
	onChange: PropTypes.func.isRequired,
};

DataTabCheckBoxes.defaultProps = {
	tabContent: {
		showValues: false,
		useCumulative: false,
		useStacked: false,
	},
};
export default DataTabCheckBoxes;