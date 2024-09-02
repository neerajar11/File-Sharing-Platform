import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import background from './background.jpg'
function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }
  const myStyle = {
    backgroundImage:`url(${background})`,
  }
  return (
    <div className='container' style={myStyle}>
      <div className='wrapper'>
        <h1 className="main">Simple file sharing Platform</h1>
        <p>Upload the File and then Share the link anywhere</p>
        
        <button onClick={() => onUploadClick()} className="uploadButton">
          <span className='message'>Choose a File</span>
          <span className='plus'>+</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <a href={result} target='_blank'>{result}</a> 
      </div>
    </div>
  );
}

export default App;