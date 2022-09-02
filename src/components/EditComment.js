import React, { useRef, useEffect } from 'react'
import { useGlobal } from '../context'

const EditComment = () => {
    const textAreaEditRef = useRef(null)
    const { editId, comments, editComment } = useGlobal()
    const inputValue = comments.find(comment => comment.id === editId).content
    useEffect(() => {
        textAreaEditRef.current.focus()
    }, [])
    const handleSubmit = e => {
        e.preventDefault();
        editComment(textAreaEditRef.current.value)
    }
    return (
        <section className="bg-white rounded-md w-full p-4">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" rows="3" className="border border-lightGray rounded-md p-2 text-grayishBlue text-base placeholder:text-grayishBlue focus:outline-none focus:border-moderateBlue/80" placeholder='Add a comment...' ref={textAreaEditRef} defaultValue={inputValue}></textarea>
                <button type="submit" className="w-20 self-end bg-moderateBlue text-white font-medium uppercase text-base py-1 rounded-md hover:bg-lightGrayishBlue">edit</button>
            </form>
        </section>
    )
}

export default EditComment