import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Modify.css';

function Modify() {
  const { post_id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', image: null });
  const [imageUrl, setImageUrl] = useState(null); // 이미지 URL을 저장하는 state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 게시물 데이터 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${post_id}`);
        setPost(response.data);

        // 이미지가 있을 경우, 서버에서 이미지를 가져와 URL을 설정
        if (response.data.image) {
          setImageUrl(`http://localhost:8080/path/to/images/${response.data.image}`);
        }
      } catch (error) {
        setError('게시물을 불러오는 데 실패했습니다.');
        console.error(error);
      }
    };

    fetchPost();
  }, [post_id]);

  // 파일 선택 시 이미지 미리보기 업데이트
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, image: file });

    // 파일을 선택하면 로컬 URL로 미리보기 업데이트
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    }
  };

  // 게시물 수정 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);

    if (post.image) {
      formData.append('image', post.image); // 새로운 이미지가 있을 경우 추가
    } else if (!post.image && imageUrl) {
      formData.append('image', null); // 기존 이미지가 그대로 유지되도록 null 값 추가
    }

    try {
      await axios.put(`http://localhost:8080/api/posts/${post_id}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // multipart/form-data로 설정하여 파일 업로드
        },
      });
      alert('게시물이 수정되었습니다.');
      navigate('/community-board'); // 수정 후 목록 페이지로 이동
    } catch (error) {
      setError('게시물 수정에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="modify-page">
      {/* 메인 페이지로 이동하는 로고 버튼 */}
      <div 
        className="go-home-button" 
        onClick={() => navigate('/main')} // 로고 클릭 시 메인 페이지로 이동
        style={{ cursor: 'pointer', marginBottom: '15px' }} // 클릭 가능한 스타일 추가
      >
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
      </div>

      <h1 className="modify-header">게시물 수정</h1> 
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="modify-form">
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            className="modify-input"
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
            className="modify-textarea"
          />
        </div>
        <div className="form-group">
          <label>이미지</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="modify-file-input"
          />
        </div>
        
        {/* 이미지가 있으면 미리보기로 표시 */}
        {imageUrl && <img src={imageUrl} alt="미리보기 이미지" className="image-preview" />}
        
        <button type="submit" className="submit-button">수정 완료</button>
      </form>
    </div>
  );
}

export default Modify;
