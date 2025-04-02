import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPost.css';

function MyPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // 게시물 상태

  // 게시물 불러오기
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      setPosts(response.data); // 서버에서 받은 게시물 데이터를 상태에 저장
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    }
  };

  // 이미지 URL 생성 함수
  const getImageUrl = (image) => {
    return `data:image/png;base64,${image}`; // Base64로 변환하여 이미지 URL 생성
  };

  // 게시물 삭제
  const deletePost = async (post_id) => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${post_id}/delete`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== post_id)); // 상태를 이전 값으로 업데이트
      alert('게시물이 삭제되었습니다.');
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
      alert('게시물 삭제에 실패했습니다.');
    }
  };

  // 컴포넌트가 마운트될 때 게시물 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="my-post-board">
      <header className="my-post-header">
        <h1>My Post</h1>
        <button className="my-new-post-button" onClick={() => navigate('/new-post')}>New post +</button>
        <div 
        className="go-home-button" 
        onClick={() => navigate('/main')} // 로고 클릭 시 메인 페이지로 이동
        style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
      >
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
      </div>
      </header>
      
      <div className="my-post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="my-post-item" key={post.id}>
              {/* 제목 */}
              <div className="my-post-title" onClick={() => navigate(`/modify/${post.id}`)}>
                {post.title}
              </div>
              <hr className="divider" /> {/* 제목과 내용 사이 구분선 */}

              {/* 내용 */}
              <div className="my-post-content">{post.content}</div>
              <hr className="divider" /> {/* 내용과 이미지 사이 구분선 */}

              {/* 이미지 */}
              {post.image && (
                <div className="post-image">
                  <img
                    src={getImageUrl(post.image)} // 이미지를 Base64로 변환하여 표시
                    alt={post.title}
                    className="my-post-image"
                  />
                </div>
              )}
              <div className="my-post-actions">
                <button
                  className="my-modify-button"
                  onClick={(e) => {
                    e.stopPropagation(); // 제목 클릭 이벤트 방지
                    navigate(`/modify/${post.id}`); // 수정 페이지로 이동
                  }}
                >
                  수정
                </button>
                <button
                  className="my-photo-button"
                  onClick={(e) => {
                    e.stopPropagation(); // 제목 클릭 이벤트 방지
                    deletePost(post.id); // post.id 사용
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default MyPost;
