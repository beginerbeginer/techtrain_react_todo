import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASEURL;

export const CommentForm = ({ threadId }) => {
  const [posts, setPosts] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/threads/${threadId}/posts`,
        {
          post: posts,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="投稿しよう!"
        value={posts}
        onChange={(e) => setPosts(e.target.value)}
      />
      <div>
        <button type="submit" className="button">
          投稿
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
};
