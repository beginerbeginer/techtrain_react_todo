import * as React from 'react';
import axios from 'axios';
import { Threads } from './Threads';
const baseUrl = 'https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com';

export const ThreadsListContainer = () => {
  const [threads, setThreads] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${baseUrl}/threads?offset=1`).then((res) => {
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
