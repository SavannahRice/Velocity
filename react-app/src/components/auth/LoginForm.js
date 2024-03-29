import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import styles from './LoginForm.module.css'
import photo from './coen-van-de-broek-m3deylWrxHw-unsplash.jpg'
import { getActivities } from "../../store/activity";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) {
      setErrors(data.errors);
    }
    await dispatch(getActivities())
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.entirePage}>
      <div className={styles.leftSide}>
        <h2>Welcome Back. Please login to you account.</h2>
        <form onSubmit={onLogin} className={styles.loginForm}>
          <div className={styles.errors}>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className={styles.formInput}>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className={styles.formInput}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
        
            />
          </div>
          <div className={styles.btnDiv}>
            <button type="submit" className={styles.formBtn}>Login</button>
            <button className={styles.formBtn} onClick={demoLogin}>Demo User</button>
          </div>
          <div className={styles.terms}>
            <p>By signing up, you agree to Velocity's Terms and Conditions & Privacy Policy. </p>
          </div>
        </form>
      </div>
      {/* <div className={styles.rightSide}><img src={photo} alt=""/></div> */}
    </div>
  );
};

export default LoginForm;
