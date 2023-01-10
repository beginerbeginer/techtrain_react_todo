import * as React from 'react';

export const Threads = ({ threads }) => {
  return threads.map((thread) => (
    <li className="thread_title" key={thread.id}>
      {thread.title}
    </li>
  ));
};
