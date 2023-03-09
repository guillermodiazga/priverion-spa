import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './actions';

function Logout(props) {
  const { isLoggedIn, logout } = props;
  const navigate = useNavigate();

  function closeSession() {
    axios.post('http://127.0.0.1:8000/api/logout', null, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        // Handle response
        logout();
        localStorage.clear();
        navigate('/posts');
      })
      .catch(error => {
        // Handle error
        console.log(error);
        navigate('/login');
      });
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/posts");
    } else {
      closeSession();
    }
  }, [isLoggedIn, navigate, closeSession]);

  return;
};

function mapStateToProps(state) {
  return {
    username: state.username,
    isLoggedIn: state.isLoggedIn
  };
}

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
