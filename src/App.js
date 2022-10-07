
import './App.css';
import { CreatePost } from './components/createPost/CreatePost';
import {Posts} from './components/posts/Posts';
import { Registration } from './components/registration/Registration';
import {Routes, Route} from "react-router-dom";
import { ProfilePage } from './components/profile/ProfilePage';
import { EditPost } from './components/editPost/EditPost';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path="/posts" element={<Posts />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/editpost' element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
