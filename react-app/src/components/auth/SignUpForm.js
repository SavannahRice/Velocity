import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from './SignUpForm.module.css'
import photo from './coen-van-de-broek-m3deylWrxHw-unsplash.jpg'


const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [avatar, setAvatar] = useState(null)

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, city, state, avatar, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value)
  }

  const updateState = (e) => {
    setState(e.target.value)
  }

  const updateAvatar = (e) => {
    e.preventDefault()
    setAvatar(e.target.files[0])
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.entirePage}>
        <div className={styles.leftSide}>
          <h2>Welcome! Create an account here.</h2>
          <form onSubmit={onSignUp}>
            <div className={styles.formInput}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className={styles.formInput}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className={styles.formInput}>
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={updateCity}
                value={city}
              ></input>
            </div>
            <div className={styles.formInput}>
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={updateState}
                value={state}
              ></input>
            </div>
            <div className={styles.formInput}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className={styles.formInput}>
              <input
                type="password"
                name="repeat_password"
                placeholder="Confirm password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            {/* <div className={styles.formInput}>
            <input
                className={styles.fileUpload}
                type="file"
                name="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              ></input>

            </div> */}
            <div className={styles.btnDiv}>
                  <button type="submit" className={styles.formBtn}>Login</button>
                  <button className={styles.formBtn}>Sign Up</button>
            </div>
          </form>
        </div>
      <div className={styles.rightSide}><img src={photo} alt=""/></div>
    </div>
  );
};

export default SignUpForm;
