import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASEURL;

export const PostsListContainer = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const threadId = location.state.threadId;
  const threadTitle = location.state.threadTitle;

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/threads/${threadId}/posts?offset=0`)
      .then((res) => {
        setPosts(res.data.posts || []);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  return (
    <main className="main">
      <h>タイトル：{threadTitle}</h>
      {error ? (
        <div className="center">エラーが発生しました</div>
      ) : posts === null ? (
        <div className="center">Loading...</div>
      ) : posts.length ? ( // []の配列に対してlengthを取得すると0が返ってくるので、0の場合はfalseとなる。
        <ul className="post_list">
          {posts.map((post) => (
            <li className="post_title" key={post.id}>
              {post.post}
            </li>
          ))}
        </ul>
      ) : (
        <div className="center">このスレッドにはまだコメントがありません</div>
      )}
    </main>
  );
};
