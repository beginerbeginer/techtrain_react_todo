import * as React from 'react';
import axios from 'axios';
import { Threads } from './Threads';
const baseUrl = process.env.REACT_APP_BASEURL;

export const ThreadsListContainer = () => {
  const [threads, setThreads] = React.useState([]);

  // 最新のスレッドを取得
  React.useEffect(() => {
    axios.get(`${baseUrl}/threads?offset=0`).then((res) => {
      setThreads(res.data);
    });
  }, []);

  return (
    <main className="main">
      <h1>新着スレッド</h1>
      <Threads threads={threads} />
    </main>
  );
};
