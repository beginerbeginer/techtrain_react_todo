import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Threads = ({ threads }) => {
  return (
    <ul className="thread_list">
      {threads.map((thread) => (
        <li className="thread_title" key={thread.id}>
          <Link to={`/threads/${thread.id}/posts`} className="thread_link">
            {thread.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// eslintでPropTypesが不足しているとエラーが出たため、PropTypesを追加。
Threads.propTypes = {
  threads: PropTypes.array.isRequired,
};
