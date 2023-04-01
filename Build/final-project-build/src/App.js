import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid'

// importing pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import OcrReaderPage from './pages/ocrPages/OcrReaderPage';
import ViewAllOcrPage from './pages/ocrPages/ViewAllOcrPage';
import TextEditorPage from './pages/TextEditorPage';
import FoldersIndex from './pages/folderPages/folderIndex';
import ViewSingleFolder from './components/foldersComponent/viewSingleFolder'

//importing components
import NavBar from './components/NavBar'
import TextEditor from './components/TextEditor';
import CreateDocument from './components/modals/documentModals/CreateDocument';
import CreateFolderComponent from './components/foldersComponent/createFolderComponent'

const App = () => {

  const [showNav, setShowNav] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  let protectedPaths;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthenticated(true);
    }
  }, []);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  //Used to change the state from true or false / Also stores my token
  const onAuthenticated = (auth, token, userID) => {
    setAuthenticated(auth);

    // if statement to check to set a token to local storage when logging in
    if (auth) {
      localStorage.setItem('token', token);
      localStorage.setItem('userID', userID);

    }
    else {
      localStorage.removeItem('token');
      localStorage.removeItem('userID')

    }
  };

  const userID = localStorage.getItem('userID');

  if (authenticated) {
    protectedPaths = (
      <>
        <Route path={`/select-document/${userID}`} element={<TextEditorPage userID={userID} />} />
        <Route path={`/saved_ocr_files/${userID}`} element={<ViewAllOcrPage userID={userID} />} />

        <Route path={`/folder/:userId`} element={<FoldersIndex userID={userID} />} />
        <Route path={`/create_folder`} element={<CreateFolderComponent userID={userID} />} />
        <Route path={`/view_folder/:userId/:folderId`} element={<ViewSingleFolder userID={userID} />} />

        <Route path="/documents" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        <Route path="/create-document/:folderId" element={<CreateDocument />} />
        <Route path="/documents/:id" element={<TextEditor />} />
      </>
    )
  }

  return (
    <div>
      <Router>
        <NavBar onAuthenticated={onAuthenticated} authenticated={authenticated} userID={userID} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ocr" element={<OcrReaderPage />} />
          {protectedPaths}
          <Route path="/login" element={<Login onAuthenticated={onAuthenticated} authenticated={authenticated} />} />
          <Route path="/register" element={<Register onAuthenticated={onAuthenticated} authenticated={authenticated} />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
