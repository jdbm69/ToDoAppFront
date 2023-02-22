import { useState} from 'react';
import { useCookies } from'react-cookie';
import '../styles/Auth.css';

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [error, setError] = useState(null);
    const [isLogIn, setIsLogIn] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const viewLogin = (status) => {
        setIsLogIn(status);
        setError(null);
    };

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault();
        if (!isLogIn && password !== confirmPassword) {
            setError('Passwords do not match');
            return
        }

        const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        })

        const data = await response.json();

        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);

            window.location.reload();
        }
        
    }
    return (
        <div className='auth-container'>
            <div className='auth-box'>
                <form>
                    <div className='auth-title'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(92, 168, 168)" class="bi bi-list-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        <h1>TO DO APPP</h1>
                    </div>
                    <h2>{isLogIn ? 'Please Log In' : 'Please Sign Up'}</h2>
                    <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    {!isLogIn && <input type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />}
                    <input type='submit' className='create' value={isLogIn ? 'Log In' : 'Sign Up'} onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}/>
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>
            <div className='auth-options'>
                    <button 
                    onClick={() => viewLogin(false)} 
                    style={{borderTop: !isLogIn ? '2px solid rgb(92, 168, 168)' : 'none', color: !isLogIn ? 'rgb(92, 168, 168)' : 'black'}}>
                        Sign up
                    </button>
                    <button 
                    onClick={() => viewLogin(true)} 
                    style={{borderTop: isLogIn ? '2px solid rgb(92, 168, 168)' : 'none', color: isLogIn ? 'rgb(92, 168, 168)' : 'black'}}>
                        Log in
                    </button>
                </div>
        </div>
    )
}
  
  export default Auth;