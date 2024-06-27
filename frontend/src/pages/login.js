// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Loader from '../component/Loader';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        setIsLoading(false);

        if (res.ok) {
            router.push('/dashboard');
        } else {
            setError(data.message);
        }
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
                </form>
                <div className={styles.links}>
                    <a href="#">Forgot password?</a>
                    <p>Don't have an account? <a href="#">Create new</a></p>
                </div>
            </div>
        </div>
    );
}
