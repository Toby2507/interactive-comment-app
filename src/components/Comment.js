import React from 'react'
import { useGlobal } from '../context'
import CreateComment from './CreateComment'
import EditComment from './EditComment';
import { dateToString } from '../helperFunctions';
// ICONS
import { FaReply } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const Comment = ({ id, content, createdAt, score, user: { username, image: { webp } }, replies, isReply, replyingTo }) => {
    const { comments, isEditing, editId, isReplying, replyId, currentUser: { username: user }, alterScore, deleteComment, initiateReply, initiateEdit } = useGlobal();
    return (
        <div className='flex flex-col space-y-3'>
            <article className="bg-white rounded-md w-full p-4 md:px-5">
                {/* SEPARATE MOBILE VIEW AS REQUIRED BY THE DESIGN */}
                <div className="flex flex-col space-y-4 md:hidden">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img src={webp} alt={username} className='w-8' />
                            <h3 className="text-lg font-medium text-darkBlue">{username} {user === username && <span className='bg-moderateBlue text-white text-base px-1 pb-[2px]'>you</span>}</h3>
                        </div>
                        <p className="text-xs text-grayishBlue">{dateToString(createdAt)}</p>
                    </div>
                    {isEditing && editId === id ? (
                        <EditComment />
                    ) : (
                        <>
                            <p className="text-base text-grayishBlue"><span className="text-moderateBlue font-medium pr-1">{isReply && `@${replyingTo.fromuser}`}</span>{content}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 px-3 py-1 rounded-md bg-veryLightGray">
                                    <button onClick={() => alterScore(id, "up")}><AiOutlinePlus className='text-sm text-grayishBlue hover:text-darkBlue' /></button>
                                    <span className="text-base text-moderateBlue font-medium">{score}</span>
                                    <button onClick={() => alterScore(id, "down")}><AiOutlineMinus className='text-sm text-grayishBlue hover:text-darkBlue' /></button>
                                </div>
                                {user === username ? (
                                    <div className="flex items-center space-x-3">
                                        <button className="flex space-x-1 items-center text-base text-softRed capitalize hover:text-paleRed" onClick={() => deleteComment(id, "start")}><MdDelete /><span>delete</span></button>
                                        <button className="flex space-x-1 items-center text-base text-moderateBlue capitalize hover:text-lightGrayishBlue" onClick={() => initiateEdit(id)}><MdEdit /><span>edit</span></button>
                                    </div>
                                ) : (
                                    <button className="flex items-center space-x-2 text-base text-moderateBlue font-medium hover:text-lightGrayishBlue" onClick={() => initiateReply(id)}><FaReply /> <span>Reply</span></button>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {/* SEPARATE DESKTOP VIEW AS REQUIRED BY THE DESIGN */}
                <div className="hidden md:flex items-start space-x-5">
                    <div className="flex flex-col justify-center items-center space-y-3 px-3 py-2 rounded-md bg-veryLightGray">
                        <button onClick={() => alterScore(id, "up")}><AiOutlinePlus className='text-sm text-grayishBlue hover:text-darkBlue' /></button>
                        <span className="text-base text-moderateBlue font-medium">{score}</span>
                        <button onClick={() => alterScore(id, "down")}><AiOutlineMinus className='text-sm text-grayishBlue hover:text-darkBlue' /></button>
                    </div>
                    <div className="flex-1 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={webp} alt={username} className='w-8' />
                                <h3 className="text-lg font-medium text-darkBlue">{username} {user === username && <span className='bg-moderateBlue text-white text-base px-1 pb-[2px]'>you</span>}</h3>
                                <p className="text-xs text-grayishBlue">{dateToString(createdAt)}</p>
                            </div>
                            {user === username ? (
                                <div className="flex items-center space-x-3">
                                    <button className="flex space-x-1 items-center text-base text-softRed capitalize hover:text-paleRed" onClick={() => deleteComment(id, "start")}><MdDelete /><span>delete</span></button>
                                    <button className="flex space-x-1 items-center text-base text-moderateBlue capitalize hover:text-lightGrayishBlue" onClick={() => initiateEdit(id)}><MdEdit /><span>edit</span></button>
                                </div>
                            ) : (
                                <button className="flex items-center space-x-2 text-base text-moderateBlue font-medium hover:text-lightGrayishBlue" onClick={() => initiateReply(id)}><FaReply /> <span>Reply</span></button>
                            )}
                        </div>
                        {isEditing && editId === id ? (
                            <EditComment />
                        ) : (
                            <p className="text-base text-grayishBlue"><span className="text-moderateBlue font-medium pr-1">{isReply && `@${replyingTo.fromuser}`}</span>{content}</p>
                        )}
                    </div>
                </div>
            </article>
            {(isReplying && replyId === id) && <CreateComment id={id} btnValue='reply' />}
            <div className="pl-4 border-l-2 border-lightGray md:ml-10 md:pl-8">
                {replies?.map(reply => {
                    const replyComment = comments.find(comment => comment.id === reply);
                    return <Comment key={reply} {...replyComment} />
                })}
            </div>
        </div>
    )
}

export default Comment
