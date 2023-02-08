import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Posts } from './Posts';
const baseUrl = process.env.REACT_APP_BASEURL;

export const PostsListContainer = () => {
  const { threadId } = useParams();

  // useQueryを使ってAPIデータを取得する
  const {
    status,
    data = [],
    error,
  } = useQuery(
    ['posts', threadId],
    async () => {
      const res = await axios.get(
        `${baseUrl}/threads/${threadId}/posts?offset=0`,
      );
      return res.data.posts || [];
    },
    {
      // cacheTimeにキャッシュ時間を設定する。5分
      cacheTime: 5 * 60 * 1000,
    },
  );

  return (
    <main className="main">
      <h3>全てのコメント</h3>
      <Posts status={status} data={data} error={error} />
    </main>
  );
};
