import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import './CommunityBoard.css';

function CommunityBoard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // 게시물 상태 관리

  // 게시물 불러오기
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts'); // 게시물 목록 불러오기
      setPosts(response.data); // 서버에서 가져온 데이터 설정
    } catch (error) {
      console.error('게시물 불러오기 실패:', error);
    }
  };

  // 게시글 작성 함수
  const createPost = async (postData) => {
    try {
      await axios.post('http://localhost:8080/api/posts', postData); // 게시글 작성
      fetchPosts();  // 게시글 작성 후 목록 갱신
      navigate('/');  // 게시글 작성 후 메인 페이지로 이동
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  // 컴포넌트가 마운트될 때 게시물 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="community-board">
      <header className="board-header">
        <h1>Community Board</h1>
        <button className="new-post-button" onClick={() => navigate('/new-post')}>New post +</button>
        <div 
        className="go-home-button" 
        onClick={() => navigate('/main')} // 로고 클릭 시 메인 페이지로 이동
        style={{ cursor: 'pointer' }} // 클릭 가능한 스타일 추가
      >
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Fitsweat Logo" className="logo" />
      </div>
      </header>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-item" onClick={() => navigate(`/post/${post.id}`)}>
              <div className="post-title">{post.title}</div>
              <div className="post-content">{post.content}</div>
              
            </div>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CommunityBoard;
