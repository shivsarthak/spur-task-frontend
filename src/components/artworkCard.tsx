import React, { useState } from 'react';
import CommentsModal from './commentsModal';

export default function ArtworkCard({ artwork }: { artwork: ArtworkModel }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageBuffer = Buffer.from(artwork.image.data);
    const base64Image = imageBuffer.toString("base64");
    const dataURL = `data:image/jpeg;base64,${base64Image}`;
    return (
        <>
            {
                isModalOpen ? <div
                    className={`fixed z-50 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center visible }`}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsModalOpen(false);
                        }
                    }}>
                    <CommentsModal artworkId={artwork.id}  />
                </div> : <></>
            }
            <div className="bg-neutral-100 p-4 rounded-xl">
                <h1 className="text-base font-bold mb-2">{artwork.user.username}</h1>

                <img src={dataURL} className="rounded-xl h-72 bg-white" ></img>

                <div>
                    <h1 className="text-2xl font-bold mt-2">{artwork.title}</h1>
                    <p className="text-sm font-medium">{artwork.description}</p>
                </div>
                {
                    artwork.comments.length > 0 && <h3 className="text-xs mt-2">
                        <span className="font-bold">{artwork.comments[0].user.username} </span>{artwork.comments[0].comment}
                    </h3>
                }
                <h3 className="text-xs font-normal mt-1" onClick={() => {
                    setIsModalOpen(true);
                }} style={{ cursor: 'pointer' }}>
                    View Comments
                </h3>
            </div >
        </>
    );
}
