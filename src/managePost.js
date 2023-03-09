import React, { useState, useEffect } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

function ManagePost(props) {
  const { isLoggedIn } = props;
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const { idEdit } = useParams();

  const cleanData = () => {
    setTitle('');
    setBody('');
  }

  const getPost = function (idEdit) {
    axios.get(`http://127.0.0.1:8000/api/post/${idEdit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        setBody(response.data.body);
        setTitle(response.data.title);
        setId(response.data.id);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if (idEdit) {
      getPost(idEdit);
    }
  }, [idEdit]);

  const update = function () {
    let user_id = localStorage.user_id;
    const editPost = { user_id, id, title, body };

    axios.put(`http://127.0.0.1:8000/api/post/${idEdit}`, editPost, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        cleanData();
        navigate('/posts');
      })
      .catch(error => console.log(error));
  }

  const save = function () {
    let user_id = localStorage.user_id;
    const newPost = { user_id, title, body };

    axios.post('http://127.0.0.1:8000/api/post', newPost, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        cleanData();
        navigate('/posts');
      })
      .catch(error => console.log(error));
  }

  const submit = function (e) {
    e.preventDefault();

    if (idEdit) {
      update();
    } else {
      save();
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/posts");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Form onSubmit={submit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={event => setTitle(event.target.value)} name="title" type="text" placeholder="My post" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post</Form.Label>
        <Form.Control value={body} onChange={event => setBody(event.target.value)} name="body" as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">Send</Button>
    </Form>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(ManagePost);
