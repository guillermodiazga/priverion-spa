import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Posts from './posts';
import ManagePost from './managePost';
import Logout from './logout';

function AppRouter() {
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/create" element={<ManagePost />} />
          <Route exact path="/edit/:idEdit" element={<ManagePost />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
