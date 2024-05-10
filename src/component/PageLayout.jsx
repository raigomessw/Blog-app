import React from 'react';
import { useEffect } from 'react';

const PageLayout = ({ title = 'Blog App', children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="mx-10 my-10">
      <h1 className="font-bold mb-5">{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout;