import PropTypes from 'prop-types'
import React, { createContext } from 'react'

const provided = {}
const snapshot = {}
const providerValue = {}
const DnDCtx = createContext({})
export const DragDropContext = ({ children }) => (
    <DnDCtx.Provider value={providerValue}>{children}</DnDCtx.Provider>
)
export const Draggable = ({ children }) => children((provided, snapshot))
export const Droppable = ({ children }) => children(provided)
DragDropContext.propTypes = {
    children: PropTypes.node,
}
