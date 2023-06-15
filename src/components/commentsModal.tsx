import { getComments, postComment } from '@/services/apiService';
import React, { ChangeEvent, useEffect, useState } from 'react';

export default function CommentsModal({ artworkId, }: { artworkId: number }) {


    const [comments, setComments] = useState<CommentModel[]>([]);
    const [comment, setComment] = useState("");

    const getData = async () => {
        getComments(artworkId).then((res) => {
            setComments(res as CommentModel[]);
        });
    }

    useEffect(() => {
        getData();

    }, []);

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter') {
            await postComment(artworkId, comment);
            setComment("");
            getData();
        }
    };

    return (
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-900">Comments</h2>
            </div>
            <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Leave a Comment
                </label>
                <input
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type=""
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                    onKeyUp={handleKeyPress}
                    placeholder=""
                />
            </div>

            <div className='mt-2'>
                {

                    comments.length > 0 ? comments.map((comment: CommentModel, key) =>
                        <span className=' flex items-center' key={key}>
                            <h1 className="text-base font-bold ">{comment.user.username} &nbsp;</h1>

                            <p className="text-base font-medium">{comment.comment}</p>
                        </span>) : <></>
                }
            </div>
        </div>

    );
}