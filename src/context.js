import React, { useReducer, useContext, useEffect } from 'react'
import { reducer } from './reducer'
import data from './data.json'

const AppContext = React.createContext()
const initialState = { currentUser: data.currentUser, comments: data.comments, isEditing: false, editId: null, isReplying: false, replyId: null, isDeleting: false, deleteId: null }
const stateStorage = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : initialState

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, stateStorage);
    const alterScore = (id, type) => dispatch({ type: 'ALTER_SCORE', payload: { id, type } })
    const deleteComment = (id, phase) => dispatch({ type: 'DELETE_COMMENT', payload: { id, phase } })
    const initiateReply = id => dispatch({ type: 'INITIATE_REPLY', payload: id })
    const replyComment = comment => dispatch({ type: 'REPLY_COMMENT', payload: comment })
    const initiateEdit = id => dispatch({ type: 'INITIATE_EDIT', payload: id })
    const editComment = comment => dispatch({ type: 'EDIT_COMMENT', payload: comment })
    const createComment = comment => dispatch({ type: 'CREATE_COMMENT', payload: comment })

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
    }, [state])

    return <AppContext.Provider value={{ ...state, alterScore, deleteComment, initiateReply, replyComment, initiateEdit, editComment, createComment }}>{children}</AppContext.Provider>
}

export const useGlobal = () => useContext(AppContext)