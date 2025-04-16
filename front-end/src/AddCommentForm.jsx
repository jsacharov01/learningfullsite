import { useState } from "react";
import "./AddCommentForm.css";

export default function AddCommentForm({ onAddComment }) {
  const [nameText, setNameText] = useState("");
  const [commentText, setCommentText] = useState("");

  function clearData() {
    setNameText("");
    setCommentText("");
  }

  return (
    <div className="form-container">
      <div className="comment-form">
        <h3>Add a Comment</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={nameText}
            onChange={(e) => setNameText(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment here..."
          />
        </div>
        <button
          className="submit-button"
          onClick={() => {
            onAddComment(nameText, commentText);
            clearData();
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
