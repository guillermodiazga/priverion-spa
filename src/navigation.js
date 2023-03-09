import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './images/logo.png';
import { connect } from 'react-redux';

function Navigation(props) {

  const { isLoggedIn, username } = props;
  let sessionLink = <Nav.Link href="/login">Login</Nav.Link>
  let createPostLink = <></>

  if (isLoggedIn) {
    sessionLink = <>
      <Nav.Link href="/logout">Logoff {username}</Nav.Link>
    </>
    createPostLink = <Nav.Link href="/create">Create Post</Nav.Link>
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            alt=""
            src={logo}
            width="120"
            height="50"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/posts">Post List</Nav.Link>
            {createPostLink}
            {sessionLink}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Navigation);