import React, { useEffect } from 'react';
import Router from 'next/router';
import Login from '../src/components/Login';

function Home({ isLoggedIn }) {

  useEffect(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    if (isLoggedIn) {
      Router.push('/control');
      return null;
    }
  },[])
  return (
    <>
      <style jsx>
        {`
          .login-page {
            width:100%;
            height:100vh;
          }
        `}
      </style>
      <div className="login-page">
        <Login />
      </div>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const cookieCsrf = ctx?.req?.headers?.cookie;
  const isLoggedIn = cookieCsrf && cookieCsrf.includes('x-csrf-token-controller');
  return { isLoggedIn };
};

export default Home;
