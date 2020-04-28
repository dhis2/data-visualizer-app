import React, { Component } from 'react'
import PropTypes from 'prop-types'
import i18n from '@dhis2/d2-i18n'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import styles from './styles/FatalErrorBoundary.module.css'
import { genericErrorTitle } from '../../modules/error'

const translatedErrorHeading = i18n.t(
    'An error occurred in the DHIS2 Data Visualizer application.'
)

const replaceNewlinesWithBreaks = text =>
    text
        .split('\n')
        .reduce((out, line, i) => [...out, line, <br key={i} />], [])

export class FatalErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            errorInfo: null,
            drawerOpen: false,
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        })
    }

    toggleTechInfoDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen,
        })
    }

    render() {
        const { children } = this.props
        if (this.state.error) {
            return (
                <div className={styles.mask}>
                    <div className={styles.container}>
                        <InfoIcon className={styles.icon} />
                        <div className={styles.message}>
                            {genericErrorTitle}
                        </div>
                        <div
                            className={styles.link}
                            onClick={() => window.location.reload()}
                        >
                            {i18n.t('Refresh to try again')}
                        </div>
                        <div
                            className={styles.drawerToggle}
                            onClick={this.toggleTechInfoDrawer}
                        >
                            {this.state.drawerOpen
                                ? i18n.t('Hide technical details')
                                : i18n.t('Show technical details')}
                        </div>
                        <div
                            className={
                                this.state.drawerOpen
                                    ? styles.drawerVisible
                                    : styles.drawerHidden
                            }
                        >
                            <div className={styles.errorIntro}>
                                {translatedErrorHeading}
                                <br />
                                {i18n.t(
                                    'The following information may be requested by technical support.'
                                )}
                            </div>
                            <div className={styles.errorDetails}>
                                {[
                                    replaceNewlinesWithBreaks(
                                        this.state.error.stack +
                                            '\n---' +
                                            this.state.errorInfo.componentStack
                                    ),
                                ]}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return children
    }
}

FatalErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FatalErrorBoundary
