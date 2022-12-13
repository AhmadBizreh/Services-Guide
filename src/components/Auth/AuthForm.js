import { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth';

import { useHistory } from 'react-router-dom';


import classes from './AuthForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoding, setIsLoding] = useState(false);


  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoding(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSrVcbFFY5pAuN1s0ouA6h_Tx3J3UnvgQ';

    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSrVcbFFY5pAuN1s0ouA6h_Tx3J3UnvgQ';

    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    ).then((res) => {
      setIsLoding(false);
      if (res.ok) {
        toast("done");

        return (
          res.json()

        );
      } else {
        res.json().then((data) => {
          console.log(data.error.message);
          let errorMassage = "Connection Failed";
          if (data.error.message) {
            errorMassage = data.error.message;
          }
          toast(errorMassage);
          throw new Error(errorMassage);
        });
      }
    }).then((data) => {
      const id = data.idToken;
      const email = data.email;
      // console.log("data");

      dispatch(
        authAction.login({
          email,
          id
        })
      );
      history.replace('/');
      
      console.log(data);
    }).catch(() => { });
  };

  return (
    <section className={classes.auth}>

      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={authHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoding && <button>{isLogin ? 'Login' : 'Create Account'}
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </button>}
          {isLoding && <p>loding..</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}

          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
