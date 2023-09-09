import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [postContent, setPostContent] = React.useState<string>("No post content yet")
  const [feedback, setFeedback] = React.useState<string>("No feedback yet")


  const getFeedback = (postContent: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postContent: postContent })
    }
    fetch('http://localhost:9000/api/getFeedback', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const feedback = data.feedback
        console.log(feedback)
        setFeedback(feedback)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="App" style={{ flex: 2 }} onClick={() => getFeedback(postContent)}>
      <button name="getFeedback">Get Feedback</button>
      <div style={{ flex: 1 }}>
        <textarea id="postContent"
          cols={50} rows={50}
          value={postContent}
          onChange={(e) => setPostContent(e.currentTarget.value)} ></textarea>
        <textarea id="feedback" cols={30} rows={50} value={feedback}></textarea>
      </div>
    </div>
  );
}


export default App;
