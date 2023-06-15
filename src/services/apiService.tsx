import axios from "axios";
import { getSession } from "next-auth/react";


const axios_instance = axios.create({
    baseURL: process.env.API_ENDPOINT  ,
    timeout: 10000,
    timeoutErrorMessage: "Request timed out",
});

export const uploadArtwork = async (title: string, description: string, image: Blob) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        let accessToken = await getSession();
        const response = await axios_instance.post('/artwork/upload', formData, {
            headers: {
                'Authorization': `Bearer ${(accessToken?.user as any).token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getArtworks = async () => {
    try {
        let accessToken = await getSession();
        const response = await axios_instance.get('/artwork/all', {
            headers: {
                'Authorization': `Bearer ${(accessToken?.user as any).token}`,
            }
        });
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const getComments = async (artworkId: number) => {

    try {
        let accessToken = await getSession();
        const response = await axios_instance.get(`/artwork/${artworkId}/comments`, {
            headers: {
                'Authorization': `Bearer ${(accessToken?.user as any).token}`,
            }
        });
        console.log('Response:', response.data);
        return response.data;
    }
    catch (error) {
    }
}




export const postComment = async (artworkId: number, comment: string) => {


    try {
        let accessToken = await getSession();
        const response = await axios_instance.post(`/artwork/${artworkId}/comment`,
            {
                comment: comment,
            },
            {
                headers: {
                    'Authorization': `Bearer ${(accessToken?.user as any).token}`,
                }
            }
        );
        console.log('Response:', response.data);

    }
    catch (error) {
        console.error(error);
    }
}