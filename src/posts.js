import axios from 'axios';
import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { connect  } from 'react-redux';

class Posts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.getPosts();
  }

  setData(data) {
    this.setState({ posts: data });
  }

  deletePost(id) {
    axios.delete(`http://127.0.0.1:8000/api/post/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
        this.getPosts();
      })
    .catch(error => {
        console.log(error);
      });
  }

  getPosts() {
    axios.get('http://127.0.0.1:8000/api/post', {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        this.setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Post</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>{ this.props.isLoggedIn &&
              <>
                <Button variant="primary" href={`/edit/${post.id}`}>Edit</Button> {' '}
                <Button variant="danger" onClick={(e)=> this.deletePost(post.id)}>Delete</Button>
              </>
              }</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps, null)(Posts);
