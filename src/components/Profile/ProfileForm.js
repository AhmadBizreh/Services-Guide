// import { border } from '@mui/system';
import { useSelector } from 'react-redux';

import { useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';

import classes from './ProfileForm.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileForm = () => {
  const email = useSelector(state => state.auth.email);
  const id = useSelector(state => state.auth.id);
  const newPasswordRef = useRef();
  const history = useHistory();
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);

  const editPasswrdHanler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSrVcbFFY5pAuN1s0ouA6h_Tx3J3UnvgQ', {
      method: 'POST',
      body: JSON.stringify({
        idToken: id,
        password: newPassword,
        returnSecureToken: false,

      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.ok) {
        toast("done");
        console.log(res);
        history.push('/');
        return (
          res.json()
        );

      } else {
        res.json().then((data) => {
          console.log(data.error.message);
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

    }).catch(() => { });
    console.log(newPassword);
  };

  const changePasswordClickedHanler = () => {
    setChangePasswordClicked(true);
  };




  return (
    <form className={classes.form} onSubmit={editPasswrdHanler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        {changePasswordClicked && <input type='password' id='new-password' ref={newPasswordRef} />}
      </div>
      <div className={classes.action}>
        {!changePasswordClicked && <button type='button' onClick={changePasswordClickedHanler}>Change Password</button>}
        {changePasswordClicked && <button>
          Change Password
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
        <p>{email}</p>
        {/* <p>{id}</p> */}
      </div>
    </form>
  );
}

export default ProfileForm;
