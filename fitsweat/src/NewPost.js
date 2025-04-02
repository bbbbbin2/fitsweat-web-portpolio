import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewPost.css';

function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const username = 'exampleUser'; // 로그인된 사용자 이름이 여기에 포함된다고 가정합니다.

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

   

    try {
      const response = await axios.post('http://localhost:8080/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        alert('게시물이 성공적으로 등록되었습니다!');
        navigate('/community-board');
      }
    } catch (error) {
      console.error('게시물 등록 중 오류 발생:', error);
      alert('게시물 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="new-post-page">
      <header className="new-post-header">
        <h1>New Post</h1>
      </header>
      <div className="new-post-container">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {image && <img src={URL.createObjectURL(image)} alt="미리보기" className="image-preview" />}
        <button onClick={handleSubmit}>게시하기</button>
      </div>
    </div>
  );
}

export default NewPost;
