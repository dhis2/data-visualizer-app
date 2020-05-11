import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { Tooltip, Popper } from '@dhis2/ui-core'

const styles = {
    backdrop: {
        position: 'fixed',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
    },
    content: {
        padding: 20,
        border: '1px solid red',
        background: 'white',
    },
}

const SimpleTooltip = () => (
    <p>
        A paragraph containing a tooltip.{' '}
        <Tooltip content="Tooltip text">Hover me!!!</Tooltip>
    </p>
)

const SimplePopper = () => {
    const ref = useRef()
    const [showPopper, setShowPopper] = useState(false)

    return (
        <>
            <button onClick={() => setShowPopper(true)} ref={ref}>
                Toggler
            </button>
            {showPopper &&
                createPortal(
                    <div
                        onClick={() => setShowPopper(false)}
                        style={styles.backdrop}
                    >
                        <Popper placement="bottom" reference={ref}>
                            <div style={styles.content}>
                                I have just popped up
                            </div>
                        </Popper>
                    </div>,
                    document.body
                )}
        </>
    )
}

export const Trigger = ({ onToggle }) => {
    const elRef = useRef()

    const onClick = () => onToggle(elRef)

    return (
        <div
            style={{ width: 200, backgroundColor: 'magenta' }}
            onClick={onClick}
        >
            <div ref={elRef}>cell content (click here)</div>
        </div>
    )
}
Trigger.propTypes = {
    onToggle: PropTypes.func,
}

class CodeSandBoxReproduction extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            elRef: undefined,
        }
    }

    onToggle = ref => this.setState({ elRef: ref })

    render() {
        return (
            <div>
                stuff...
                <Trigger onToggle={this.onToggle} />
                {this.state.elRef &&
                    createPortal(
                        <div
                            style={styles.backdrop}
                            onClick={() => this.setState({ elRef: undefined })}
                        >
                            <Popper
                                reference={this.state.elRef}
                                placement="right"
                            >
                                <div style={styles.content}>popper content</div>
                            </Popper>
                        </div>,
                        document.body
                    )}
            </div>
        )
    }
}

const HendriksTestComponent = () => (
    <div>
        <h1>Test 1: Does a simple popper-based component work?</h1>
        <SimpleTooltip />

        <h1>Test 2: Can we use the Popper directly in its simplest form?</h1>
        <SimplePopper />

        <h1>Test 3: Will a reproduction of the code-sandbox work?</h1>
        <CodeSandBoxReproduction />
    </div>
)

export default HendriksTestComponent
