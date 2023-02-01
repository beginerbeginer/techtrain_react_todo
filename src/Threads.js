import * as React from 'react';
import PropTypes from 'prop-types';
const baseUrl = process.env.REACT_APP_BASEURL;

export const Threads = ({ threads }) => {
  return (
    <ul className="thread_list">
      {threads.map((thread) => (
        <li className="thread_title" key={thread.id}>
          <a
            href={`${baseUrl}/threads/${thread.id}/posts?offset=0`}
            className="thread_link"
          >
            {thread.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

// eslintでPropTypesが不足しているとエラーが出たため、PropTypesを追加。
Threads.propTypes = {
  threads: PropTypes.array.isRequired,
};
