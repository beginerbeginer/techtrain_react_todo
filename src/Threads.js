import * as React from 'react';
import PropTypes from 'prop-types';

export const Threads = ({ threads }) => {
  return (
    <ul className="thread_list">
      {threads.map((thread) => (
        <li className="thread_title" key={thread.id}>
          {thread.title}
        </li>
      ))}
    </ul>
  );
};

// eslintでPropTypesが不足しているとエラーが出たため、PropTypesを追加。
Threads.propTypes = {
  threads: PropTypes.array.isRequired,
};
