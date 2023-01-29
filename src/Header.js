import * as React from 'react';
import { THREAD } from './Routes';

export const Header = () => {
  return (
    <header className="header">
      <div className="title">掲示板</div>
      <div className="menu-item">
        <a href={THREAD.NEW_PATH}>スレッドをたてる</a>
      </div>
    </header>
  );
};
