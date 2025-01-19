import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

function SignUp() {
  const navigate = useNavigate();
  const Username = useRef();
  const Password = useRef();

  // sign up function
  async function signup(event) {
    event.preventDefault();

    try {
      const username = Username.current.value;
      const password = Password.current.value;
      const selectedGender = document.querySelector('input[name="gender"]:checked')?.value;

      if (!username) {
        toast.error("Please enter your username!");
        return;
      }
      if (!password) {
        toast.error("Please enter your password!");
        return;
      }

      if (!selectedGender) {
        toast.error("Please select a gender!");
        return;
      }

      console.log('Username:', username);
      console.log('Selected Gender:', selectedGender);

      toast.info(`Successfully Registered !`, {
        onClose: () => {
          navigate('/home');
        },
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error("Invalid Credentials!");
    }
  }

  return (
    <div className="signin-container">
      <section className="signin-section">
        <div className="signin-content">
          <p href="#" className="signin-logo">
            Probe
          </p>
          <div className="signin-form-wrapper">
            <div className="signin-form-container">
              <h1>Create your account</h1>
              <form onSubmit={signup} className='signin-form'>
                <div className="signin-input-group">
                  <label htmlFor="email">Username</label>
                  <input ref={Username} type="text" name="email" id="email" placeholder="Probe@ecea"  />
                </div>
                <div className="signin-input-group">
                    <label htmlFor="password">Password</label>
                    <input ref={Password} type="password" id="password" placeholder="Enter your password" />
                </div>


                <div className="gender-selection">
                  <label className="option">
                    <input type="radio" name="gender" value="male" /> Male
                  </label>
                  <label className="option">
                    <input type="radio" name="gender" value="female" /> Female
                  </label>
                </div>

                <button type="submit" className="signin-button">Sign in</button>

                <p className="signin-link">
                  Already Have account ? <a onClick={() => navigate('/')}>Sign In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default SignUp;
