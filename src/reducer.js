export const reducer = (state, action) => {
    switch (action.type) {
        case "ALTER_SCORE":
            const { id, type } = action.payload;
            const newComments = state.comments.map(comment => {
                if (comment.id === id) {
                    if (type === "up") return { ...comment, score: comment.score + 1 }
                    if (type === "down" && comment.score > 0) return { ...comment, score: comment.score - 1 }
                }
                return comment
            })
            return { ...state, comments: newComments }
        case "DELETE_COMMENT":
            const { phase } = action.payload;
            if (phase === "start") return { ...state, isDeleting: true, deleteId: action.payload.id }
            if (phase === "confirm") {
                let newComments = state.comments
                let deleteComment = state.comments.find(comment => comment.id === state.deleteId);
                if (deleteComment.isReply) {
                    newComments = newComments.map(comment => {
                        if (comment.id === deleteComment.replyingTo.id) return { ...comment, replies: comment.replies.filter(reply => reply !== state.deleteId) }
                        return comment
                    })
                }
                return { ...state, comments: newComments.filter(comment => comment.id !== state.deleteId), isDeleting: false, deleteId: null }
            }
            if (phase === "cancel") return { ...state, isDeleting: false, deleteId: null }
            break;
        case "INITIATE_REPLY":
            const newReply = state.isReplying ? false : true;
            const newReplyId = state.replyId ? null : action.payload;
            return { ...state, isReplying: newReply, replyId: newReplyId }
        case "REPLY_COMMENT":
            const replyComments = state.comments.map(comment => {
                if (state.replyId === comment.id) return { ...comment, replies: [...comment.replies, action.payload.id] }
                return comment
            })
            return { ...state, isReplying: false, replyId: null, comments: [...replyComments, action.payload] }
        case "INITIATE_EDIT":
            return { ...state, isEditing: true, editId: action.payload }
        case "EDIT_COMMENT":
            const editComments = state.comments.map(comment => {
                if (comment.id === state.editId) return { ...comment, content: action.payload }
                return comment
            })
            return { ...state, isEditing: false, editId: null, comments: editComments }
        case "CREATE_COMMENT":
            return { ...state, comments: [...state.comments, action.payload] }
        default:
            throw new Error(`No Matching "${action.type}" - action type`)
    }
}