// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Loader from '../component/Loader';
import apiClient from '../axios';
import {  Alert } from 'react-bootstrap';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try{

           let res= await apiClient.post("url",{email,password});
           if (!res.data || !res.data.statusCode === 200) {
              throw Error("error");
            }
            
            let userData = res?.data?.data;
            
            let { token, userType } = userData;
            localStorage.setItem("authToken", token);
        localStorage.setItem(
          "userData",
          JSON.stringify(userData)
        );
        setLoginStatus("success")
        setError("")
        router.push(`/dashboard/${userType}`)
           
        }catch(error){
            setLoginStatus("error")
            console.log(error)
            setError(error.data.error.message)
            
        }
        
        
    };

    const handleSignUpRedirect = () => {
        router.push('/signup');
    };

    return (
        <div className={styles.container}>
            {isLoading && <Loader />}
            <div className={styles.loginCard}>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email ID</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.loginButton}>Login</button>
                    {/* Form Submission Status */}
              {loginStatus === "success" && (
                <Alert variant="success">LogIn successful!</Alert>
              )}
              {loginStatus === "error" && (
                <Alert variant="danger">
                  Error submitting the form. Please try again later.
                </Alert>
              )}
                </form>
                <div className={styles.links}>
                    {/* <a href="#">Forgot password?</a> */}
                    <p>Don't have an account? <a onClick={handleSignUpRedirect} href="#">Create new</a></p>
                
                </div>
            </div>
        </div>
    );
}
