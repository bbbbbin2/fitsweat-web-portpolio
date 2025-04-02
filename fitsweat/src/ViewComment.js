import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewComment.css'; // CSS 파일 이름 일치

function ViewComment() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [editedEmojis, setEditedEmojis] = useState([]); // 수정 중인 댓글의 이모티콘 상태

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        if (response.status === 200) {
          setPost(response.data);
          fetchComments(postId);
        } else {
          console.error('게시물 조회 실패', response.status);
        }
      } catch (error) {
        console.error('게시물 상세 정보를 불러오는 중 오류 발생:', error.message);
      }
    };

    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/${postId}`);
        if (response.status === 200) {
          setComments(response.data);
        } else {
          console.error('댓글 조회 실패', response.status);
        }
      } catch (error) {
        console.error('댓글을 불러오는 중 오류 발생:', error.message);
      }
    };

    fetchPost();
  }, [postId]);

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
      const response = await axios.post(`http://localhost:8080/api/comments/${postId}`, {
        content: newComment,
        emojis: emojis,
      });
      setComments([...comments, response.data]);
      setNewComment('');
      setEmojis([]);
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
      alert('댓글 추가 실패');
    }
  };

  const handleEditComment = async (commentId) => {
    if (!editedComment.trim()) {
      alert('수정할 댓글을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/comments/${commentId}`, {
        content: editedComment,
        emojis: editedEmojis,
      });

      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: editedComment, emojis: editedEmojis }
              : comment
          )
        );
        setIsEditing(null);
        setEditedComment('');
        setEditedEmojis([]);
      }
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error.response ? error.response.data : error.message);
      alert('댓글 수정 실패');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
      alert('댓글 삭제 실패');
    }
  };

  const handleEmojiClick = (emoji) => {
    setEmojis((prevEmojis) => {
      if (prevEmojis.includes(emoji)) {
        return prevEmojis.filter((e) => e !== emoji);
      } else {
        return [...prevEmojis, emoji];
      }
    });
  };

  const handleEditEmojiClick = (emoji) => {
    setEditedEmojis((prevEmojis) => {
      if (prevEmojis.includes(emoji)) {
        return prevEmojis.filter((e) => e !== emoji);
      } else {
        return [...prevEmojis, emoji];
      }
    });
  };

  const getImageUrl = (image) => {
    return `data:image/png;base64,${image}`; // Base64로 변환하여 이미지 URL 생성
  };

  if (!post) {
    return <p>게시물을 불러오는 중입니다...</p>;
  }

  return (
    <div className="detailed-post">
      {/* 게시물 내용 */}
      <div className="post-content">
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
        </div>
        <p className="post-body">{post.content}</p>

        {/* 게시물 이미지 출력 */}
        {post.image && (
          <div className="post-image">
            <img
              src={getImageUrl(post.image)} // 이미지를 Base64로 변환하여 표시
              alt="게시물 이미지"
              className="post-image-display"
            />
          </div>
        )}
      </div>

      {/* 댓글 입력 섹션 */}
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
                <div className="emoji-buttons">
                  <button onClick={() => handleEditEmojiClick('❤️')}>❤️</button>
                  <button onClick={() => handleEditEmojiClick('😂')}>😂</button>
                  <button onClick={() => handleEditEmojiClick('😮')}>😮</button>
                  <button onClick={() => handleEditEmojiClick('😢')}>😢</button>
                </div>
                <button onClick={() => handleEditComment(comment.id)} className="save-comment-button">
                  수정 저장
                </button>
              </div>
            ) : (
              <div>
                <p>{comment.content}</p>
                <div className="comment-footer">
                  <p>{comment.emojis.join(' ')}</p>
                  <button onClick={() => setIsEditing(comment.id)} className="edit-comment-button">
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-button">
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 메인 페이지로 가는 버튼 */}
      <button onClick={() => navigate('/main')} className="back-to-main-button">
        메인 페이지로 돌아가기
      </button>
    </div>
  );
}

export default ViewComment;
