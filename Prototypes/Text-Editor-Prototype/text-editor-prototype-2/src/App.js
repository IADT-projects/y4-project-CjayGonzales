import TextEditor from "./components/TextEditor";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom' // importing these components from react-router-dom
import { v4 as uuidV4 } from 'uuid'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* generates to a random document when in the home page */}
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        {/* <Route path="/" element={<Navigate to={`/documents/`} />} /> */}

        {/* gets the same document with an ID */}
        <Route path="/documents/:id" element={<TextEditor />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
