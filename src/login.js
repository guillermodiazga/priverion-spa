import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect  } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from './actions';

function Login(props) {
  const {isLoggedIn, login, username } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axios.post('http://127.0.0.1:8000/api/login', { email, password })
        .then(response => {

          console.log(response.data); // token de acceso

          login(response.data.user.name);

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user_id', response.data.user.id);
          localStorage.setItem('username', response.data.user.name);

          return navigate('/create', {replace: true});
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/posts");
    }
  }, [isLoggedIn]);

  return (
    <div className="container" id="login">

      <form onSubmit={handleSubmit} className="form-signin" style={{ maxWidth: '330px', margin: '0 auto', paddingTop: '5rem' }}>
        <h2 className="form-signin-heading">Log in</h2>
        <label htmlFor="inputEmail" className="sr-only">E-mail</label>
        <input type="text" name="email" className="form-control" placeholder="Email address" required="" autoFocus=""
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input type="password" className="form-control" placeholder="Password" required=""
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="btn btn-lg btn-primary btn-block" type="submit">Go!</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    username: state.username,
    isLoggedIn: state.isLoggedIn
  };
}

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
