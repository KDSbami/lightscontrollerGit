import React, { useState } from 'react';
import Router from 'next/router';
import { postData } from '../../services/apiServices';
const qs = require('querystring')

export default function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const setInputHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    try {
      const loginRes = await postData('LOGIN_USER', qs.stringify(payload));
      
      switch (loginRes.serverStat) {
        case 0:
          {
            localStorage.setItem('token', btoa(loginRes.token));
            Router.push('/control');
            break;
          }
        case 1:
          {
            setMessage("Incorrect email.")
            break;
          }

        case 2:
          {
            setMessage("Incorrect password.")
            break;
          }

        case 3:
          {
            setMessage("Server error. Try again :)")
            break;
          }

      }
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <style jsx>
        {`
          .login-container {
            background-color: #ccd0d4;
            width: 100%;
            height: 100%;
          }
          .input-label {
            color: #fff;
            font-size: 24px;
            text-shadow: 1px 1px 3px #ccd0d4, 0 0 0 rgba(0,0,0,0.8), 1px 1px 4px #fff;
          }
          .form-container {
            margin:auto;
            width:280px;
            display:flex;
            flex-direction:column;
            align-content:center;
            height:100%;
          }
          .inputs-container {
            width:260px;
            margin:auto;
          }
          .input-field {
            width: 260px;
            height: 38px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            -webkit-appearance: none;
          }
          .squishy-rev {
            position: relative;
            display: inline-block;
            color: #333;
            text-align: center;
            background: 1e1e1f;
            box-shadow: 0 10px 15px -2px rgba(50,50,50,0.1), inset 0 -8px 30px 1px rgba(255,255,255,0.6), 0 -10px 15px -1px rgba(255,255,255,0.3), inset 0 8px 25px 0 rgba(0,0,0,0.6), inset 0 0 10px 1px rgba(255,255,255,0.6);
            transition: box-shadow .07s;
          }
          textarea:focus, input:focus{
            box-shadow: 0 15px 25px -4px rgba(0,0,0,0.5), inset 0 -3px 4px -1px rgba(0,0,0,0.2), 0 -10px 15px -1px rgba(255,255,255,0.6), inset 0 3px 4px -1px rgba(255,255,255,0.2), inset 0 0 5px 1px rgba(255,255,255,0.8), inset 0 20px 30px 0 rgba(255,255,255,0.2);
            background: #ccd0d4;
            outline:none;
        }
          .squishy {
            position: relative;
            display: inline-block;
            color: #fff;
            text-align: center;
            background: #1e1e1f;
            box-shadow: 0 15px 25px -4px rgba(0,0,0,0.5), inset 0 -3px 4px -1px rgba(0,0,0,0.2), 0 -10px 15px -1px rgba(255,255,255,0.6), inset 0 3px 4px -1px rgba(255,255,255,0.2), inset 0 0 5px 1px rgba(255,255,255,0.8), inset 0 20px 30px 0 rgba(255,255,255,0.2);
            background: #ccd0d4;
            transition: box-shadow .07s;
          }
          
          .squishy:active {
            background: 1e1e1f;
            box-shadow: 0 10px 15px -2px rgba(50,50,50,0.1), inset 0 -8px 30px 1px rgba(255,255,255,0.6), 0 -10px 15px -1px rgba(255,255,255,0.3), inset 0 8px 25px 0 rgba(0,0,0,0.6), inset 0 0 10px 1px rgba(255,255,255,0.6);
          }
          
          .squishy span {
            position: absolute;
            display: inline-block;
            white-space: nowrap;
            top: 0;
            left: 0;
            line-height: 50px; /*change to btn height*/
            width: 100%;
            height: 100%;
            transition: transfrom .1s;
          }
          
          .squishy:active span {
            -webkit-transform: scale(.95);
            transform: scale(.95);
          }
          
          /* So they don't accidentially highlight btn text */
          a.squishy {
            cursor: pointer;
            -webkit-touch-callout: none; 
            -webkit-user-select: none;
            -khtml-user-select: none; 
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          
          .login-button {
            border-radius: 10px;
            width: 260px;
            font-size: 16px;
            height: 48px;
          }
          .logo {
            font-size:5em;
            font-weight:700;
            position:absolute;
            top:30px;
            color:#444;
          }
        `}
      </style>
      <div className="login-container">
        <form className="form-container" onSubmit={loginUser}>
          <div className="inputs-container">
            <p className="logo">Bami.</p>
          {message}
            <div className="input-container mb32">
              <label htmlFor="email">
                <div className="input-label mr24 mb8">Username</div>
                <input
                  type="text"
                  className="input-field squishy-rev ph16"
                  placeholder="Enter Username"
                  value={state.email}
                  onChange={setInputHandler}
                  name="email"
                  id="email"
                  required
                />
              </label>
            </div>
            <div className="input-container mb32">
              <label htmlFor="password">
                <div className="input-label  mr24 mb8">Password</div>
                <input
                  type="password"
                  className="input-field squishy-rev ph16"
                  placeholder="Enter Password"
                  value={state.password}
                  onChange={setInputHandler}
                  name="password"
                  id="password"
                  required
                />
              </label>
            </div>
            <button type="submit" className="squishy login-button mt24">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
