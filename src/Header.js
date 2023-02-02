import * as React from 'react';
import { Link } from 'react-router-dom';
import { THREAD } from './Routes';

export const Header = () => {
  return (
    <header className="header">
      <div className="title">掲示板</div>
      <div className="menu-item">
        <Link to={THREAD.NEW_PATH}>スレッドをたてる</Link>
      </div>
    </header>
  );
};
