import { VIS_TYPE_COLUMN } from '@dhis2/analytics'
import { render } from '@testing-library/react'
import VisualizationTypeListItem from '../VisualizationTypeListItem.jsx'

test('VisualizationTypeListItem renders Column item', () => {
    const props = {
        iconType: VIS_TYPE_COLUMN,
        label: 'Column Chart',
        description: 'A chart that displays data in columns',
        disabled: false,
        isSelected: false,
        onClick: jest.fn(),
    }

    const { container } = render(<VisualizationTypeListItem {...props} />)
    expect(container).toMatchSnapshot()
})
