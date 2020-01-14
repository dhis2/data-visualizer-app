import React, { Component } from 'react'
import { connect } from 'react-redux'
import i18n from '@dhis2/d2-i18n'
import styles from './styles/StartScreen.style'
import { sGetLoadError } from '../../reducers/loader'
import PropTypes from 'prop-types'
import chartErrorImg from '../../assets/chart-error-graphic.png'
import { apiFetchFavorites } from '../../api/favorites'
import history from '../../modules/history'

export class StartScreen extends Component {
    state = {
        favorites: [],
    }

    componentDidMount() {
        this.getFavorites()
    }

    getFavorites = async () => {
        const result = await apiFetchFavorites()
        this.setState({ favorites: result })
    }

    getContent = () =>
        this.props.error ? (
            <div>
                <img src={chartErrorImg} alt={i18n.t('Chart error')} />
                <p style={styles.title}>{this.props.error}</p>
            </div>
        ) : (
            <div>
                <div style={styles.section}>
                    <h3 style={styles.title}>Getting started</h3>
                    <ul style={styles.guide}>
                        <li style={styles.guideItem}>
                            All dimensions that you can use to build
                            visualizations are shown in the left sidebar
                        </li>
                        <li style={styles.guideItem}>
                            Add dimensions to the layout above
                        </li>
                        <li style={styles.guideItem}>
                            Double click a dimension to add or remove items
                        </li>
                    </ul>
                </div>
                <div style={styles.section}>
                    <h3 style={styles.title}>Most viewed charts and tables</h3>
                    {this.state.favorites.map((favorite, index) => (
                        <p
                            key={index}
                            style={styles.favorite}
                            onClick={() => history.push(`/${favorite.id}`)}
                        >
                            {favorite.name}
                        </p>
                    ))}
                </div>
            </div>
        )

    render() {
        return (
            <div style={styles.outer}>
                <div style={styles.inner}>{this.getContent()}</div>
            </div>
        )
    }
}

StartScreen.propTypes = {
    error: PropTypes.string,
}

const mapStateToProps = state => ({
    error: sGetLoadError(state),
})

export default connect(mapStateToProps)(StartScreen)
