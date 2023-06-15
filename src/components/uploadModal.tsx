import { uploadArtwork } from '@/services/apiService';
import React, { useState } from 'react';

interface FormFields {
    title: string;
    description: string;
    image: File | null;
}

export default function UploadModal({ onClose }: { onClose: Function }) {
    const [isLoading, setisLoading] = useState(false);
    const [formFields, setFormFields] = useState<FormFields>({
        title: '',
        description: '',
        image: null,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setFormFields((prevState) => ({
            ...prevState,
            image: file,
        }));
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setisLoading(true);
        await uploadArtwork(formFields.title, formFields.description, formFields.image!);
        setisLoading(false);
        onClose();
    };


    return (
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
                <h2 className="mt-5 text-3xl font-bold text-gray-900">Upload Artworok</h2>
                <p className="mt-2 text-sm text-gray-400">
                    Upload and Publish Your Creative Artwork
                </p>
            </div>
            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Title
                    </label>
                    <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        type="text"
                        id="title"
                        name="title"
                        value={formFields.title}
                        onChange={handleInputChange}
                        placeholder="My Mona Lisa"
                    />
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Description
                    </label>
                    <input
                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        id="description"
                        name="description"
                        value={formFields.description}
                        onChange={handleInputChange}
                        placeholder="This is my Mona Lisa"
                    />
                </div>
                <div className="grid grid-cols-1 space-y-2">
                    <label className="text-sm font-bold text-gray-500 tracking-wide">
                        Attach Document
                    </label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                            {
                                !formFields.image ? <> <div className="h-full w-full text-center flex flex-col items-center justify-center  ">

                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                        <img
                                            className="has-mask h-36 object-center"
                                            src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                            alt="freepik image"
                                        />
                                    </div>
                                    <p className="pointer-none text-gray-500 ">
                                        <span className="text-sm">Drag and drop</span> files here <br />{" "}
                                        or{" "}
                                        Click to Upload
                                    </p>
                                </div>
                                    <input type="file" id="image" name="image" onChange={handleImageChange} className="hidden" /></>
                                    :
                                    <img
                                        className="has-mask h-36 object-center"
                                        src={URL.createObjectURL(formFields.image)}
                                        alt="freepik image"></img>
                            }

                        </label>
                    </div>
                </div>
                <p className="text-sm text-gray-300">
                    <span>File type: images</span>
                </p>
                <div>
                    {isLoading ? <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div> : <button
                        type="submit"
                        className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                    >
                        Upload
                    </button>
                    }

                </div>
            </form>
        </div>

    );
}