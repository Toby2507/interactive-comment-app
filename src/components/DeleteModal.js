import React from 'react'
import { useGlobal } from '../context'

const DeleteModal = () => {
    const { deleteId, deleteComment } = useGlobal();
    return (
        <main className="fixed -top-6 left-0 w-full h-full bg-black/40 z-20 px-4 grid place-items-center">
            <article className="bg-white rounded-md w-full p-5 md:w-96">
                <h2 className="text-lg font-bold text-grayishBlue mb-3">Delete comment</h2>
                <p className="text-base text-grayishBlue mb-4">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="flex items-center space-x-4">
                    <button className="flex-1 bg-grayishBlue text-white uppercase text-base rounded-md p-2" onClick={() => deleteComment(deleteId, "cancel")}>no, cancel</button>
                    <button className="flex-1 bg-softRed text-white uppercase text-base rounded-md p-2" onClick={() => deleteComment(deleteId, "confirm")}>yes, delete</button>
                </div>
            </article>
        </main>
    )
}

export default DeleteModal