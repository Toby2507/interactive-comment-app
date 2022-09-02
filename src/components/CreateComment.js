import React, { useRef } from 'react'
import { useGlobal } from '../context'
import { creationDateGenerator } from '../helperFunctions'

const CreateComment = ({ btnValue }) => {
    const textAreaRef = useRef(null)
    const { comments, currentUser: { image: { webp }, username }, isReplying, replyId, replyComment, createComment } = useGlobal()
    const handleSubmit = e => {
        e.preventDefault();
        if (textAreaRef.current.value.trim()) {
            if (isReplying && btnValue === 'reply') {
                const { user: { username: fromuser }, id } = comments.find(comment => comment.id === replyId)
                const newComment = {
                    id: Date.now(),
                    isReply: true,
                    content: textAreaRef.current.value,
                    createdAt: creationDateGenerator(),
                    score: 0,
                    replyingTo: { fromuser, id },
                    user: {
                        image: { webp },
                        username
                    },
                    replies: []
                }
                replyComment(newComment)
            } else {
                const newComment = {
                    id: Date.now(),
                    isReply: false,
                    content: textAreaRef.current.value,
                    createdAt: creationDateGenerator(),
                    score: 0,
                    user: {
                        image: { webp },
                        username
                    },
                    replies: []
                }
                createComment(newComment)
            }
        }
        textAreaRef.current.value = '';
    }
    return (
        <section className="bg-white rounded-md w-full p-4">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" rows="3" className="border border-lightGray rounded-md p-4 text-grayishBlue placeholder:text-grayishBlue focus:outline-none focus:border-moderateBlue/80" placeholder='Add a comment...' ref={textAreaRef}></textarea>
                <div className="flex items-center justify-between">
                    <img src={webp} alt='test' className='w-10' />
                    <button type="submit" className="bg-moderateBlue text-white font-medium uppercase text-lg px-8 py-2 rounded-md hover:bg-lightGrayishBlue">{btnValue}</button>
                </div>
            </form>
        </section>
    )
}

export default CreateComment;