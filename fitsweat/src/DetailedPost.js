/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailedPost.css';

function DetailedPost() {
  const { id } = useParams(); // URL에서 게시물 ID 가져오기
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // 댓글 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 입력 값
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태
  const [emojis, setEmojis] = useState([]); // 선택된 이모티콘 상태
  const [isEditing, setIsEditing] = useState(null); // 수정 중인 댓글 ID
  const [editedComment, setEditedComment] = useState(''); // 수정된 댓글 입력 값

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(response.data); // 게시물 데이터 설정
        fetchComments(response.data.id); // 게시물에 대한 댓글 불러오기
      } catch (error) {
        console.error('게시물 상세 정보를 불러오는 중 오류 발생:', error);
      }
    };

    const fetchComments = async (post_id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/${post_id}`);
        setComments(response.data); // 댓글 목록 설정
      } catch (error) {
        console.error('댓글을 불러오는 중 오류 발생:', error);
      }
    };

    // 로그인 여부를 localStorage에서 확인하거나 상태 관리 (예시)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // 로그인 상태 설정
    }

    fetchPost();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditedComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/comments/${id}`, {
        content: newComment,
        emojis: emojis, // 이모티콘도 함께 전송
      });
      setComments([...comments, response.data]); // 새 댓글 추가
      setNewComment(''); // 댓글 입력 필드 초기화
      setEmojis([]); // 이모티콘 초기화
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
      alert('댓글 추가 실패');
    }
  };

  const handleEditComment = async (comment_id) => {
    if (!editedComment.trim()) {
      alert('수정할 댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/comments/${comment_id}`, {
        content: editedComment,
        emojis: emojis, // 이모티콘도 함께 전송
      });
      setComments(
        comments.map((comment) =>
          comment.id === comment_id ? { ...comment, content: editedComment, emojis: emojis } : comment
        )
      ); // 수정된 댓글 업데이트
      setIsEditing(null); // 수정 모드 종료
      setEditedComment(''); // 수정 필드 초기화
      setEmojis([]); // 이모티콘 초기화
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
      alert('댓글 수정 실패');
    }
  };

  const handleDeleteComment = async (comment_id) => {
    try {
      await axios.delete(`http://localhost:8080/api/comments/${comment_id}`);
      setComments(comments.filter((comment) => comment.id !== comment_id)); // 삭제된 댓글 목록에서 제거
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
      alert('댓글 삭제 실패');
    }
  };

  const handleEmojiClick = (emoji) => {
    // 이모티콘 선택
    setEmojis((prevEmojis) => {
      if (prevEmojis.includes(emoji)) {
        return prevEmojis.filter((e) => e !== emoji); // 이미 선택된 이모티콘은 제거
      } else {
        return [...prevEmojis, emoji]; // 새 이모티콘 추가
      }
    });
  };

  if (!post) {
    return <p>게시물을 불러오는 중입니다...</p>;
  }

  return (
    <div className="detailed-post">
      <div className="header">
        <h1 className="post-title">{post.title}</h1>
        {/* 로그인이 안 되어 있으면 댓글/공감 기능 숨기기 */}
        {!isLoggedIn && <p>로그인 후 댓글과 공감 기능을 이용할 수 있습니다.</p>}
      </div>

      <div className="post-content">
        <div className="post-header">
          <h2>{post.title}</h2>
          <button className="like-button">👍</button>
        </div>
        <p className="post-body">{post.content}</p>
      </div>

      {/* 댓글 입력 섹션 (로그인한 사용자만 가능) */}
      {isLoggedIn && (
        <div className="comments-section">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요"
            className="comment-input"
          />
          <div className="emoji-buttons">
            <button onClick={() => handleEmojiClick('❤️')}>❤️</button>
            <button onClick={() => handleEmojiClick('😂')}>😂</button>
            <button onClick={() => handleEmojiClick('😮')}>😮</button>
            <button onClick={() => handleEmojiClick('😢')}>😢</button>
          </div>
          <button onClick={handleAddComment} className="add-comment-button">
            댓글 추가
          </button>
        </div>
      )}

      {/* 댓글 목록 */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            {isEditing === comment.id ? (
              <div>
                <textarea
                  value={editedComment}
                  onChange={handleEditChange}
                  placeholder="댓글을 수정하세요"
                  className="edit-comment-input"
                />
                <button onClick={() => handleEditComment(comment.id)} className="save-comment-button">
                  수정 저장
                </button>
              </div>
            ) : (
              <div>
                <p>{comment.content}</p>
                <div className="comment-footer">
                  <p>작성자: {comment.author}</p>
                  <p>이모티콘: {comment.emojis.join(' ')}</p>
                  {isLoggedIn && (
                    <>
                      <button onClick={() => setIsEditing(comment.id)} className="edit-comment-button">
                        수정
                      </button>
                      <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-button">
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailedPost;
