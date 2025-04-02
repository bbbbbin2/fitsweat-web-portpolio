// NonCommunityBoard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NomCommunityBoard.css';

function NonCommunityBoard() {
  const navigate = useNavigate();

  const posts = [
    { id: 1, title: '제목 1', content: '게시글 내용 1' },
    { id: 2, title: '제목 2', content: '게시글 내용 2' },
    { id: 3, title: '제목 3', content: '게시글 내용 3' },
    { id: 4, title: '제목 4', content: '게시글 내용 4' },
  ];

  const handleNavigate = (path) => navigate(path);
  const handleStopPropagation = (e) => e.stopPropagation();

  return (
    <div className="community-board">
      <header className="board-header">
        <div className="board-header-left">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Fitsweat Logo"
            className="logo"
            onClick={() => handleNavigate('/main-logged')}
          />
          <h1>Community Board</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요"
            />
            <button className="search-button">검색</button>
          </div>
        </div>
        <button className="new-post-button" onClick={() => handleNavigate('/new-post')}>New post +</button>
      </header>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item" onClick={() => handleNavigate(`/post/${post.id}`)}>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.content}</div>
            <button className="photo-button" onClick={(e) => handleStopPropagation(e)}>사진</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonCommunityBoard;