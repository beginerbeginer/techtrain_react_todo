import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASEURL;

export const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const threadId = location.state.threadId;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/threads/${threadId}/posts?offset=0`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="main">
      <ul className="thread_list">
        {posts.map((post) => (
          <li className="thread_title" key={post.id}>
            {post.post}
          </li>
        ))}
      </ul>
    </main>
  );
};
