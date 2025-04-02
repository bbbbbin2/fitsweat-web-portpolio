import axios from 'axios';

const API_URL = 'http://localhost:8080/api/posts'; // API URL을 상수로 설정

export const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL, post);
    return response.data;
};

// 추가된 API 함수
export const updatePost = async (postId, updatedContent) => {
    const response = await axios.put(`${API_URL}/${postId}`, updatedContent);
    return response.data;
};

export const deletePost = async (postId) => {
    await axios.delete(`${API_URL}/${postId}`);
};
