import React from 'react';
import logo from './logo.svg';
import './App.css';

type FullFeedback = {
  [key: string]: Feedback
}

type Feedback = {
  "score": number,
  "feedback": string
}

function App() {
  const [postContent, setPostContent] = React.useState<string>("No post content yet")
  const [fullFeedback, setFullFeedback] = React.useState<FullFeedback>(
    {})


  const getFeedback = (postContent: string) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentToGetFeedbackOn: postContent })
    }
    fetch('http://localhost:9000/api/getFeedback', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const feedback = data.feedback
        console.log(feedback)
        setFullFeedback(JSON.parse(feedback) as FullFeedback)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="App" style={{ flex: 2 }}>
      <button name="getFeedback" onClick={() => getFeedback(postContent)}>Get Feedback</button>
      <div style={{ flex: 1 }}>
        <textarea id="postContent"
          cols={50} rows={50}
          value={postContent}
          onChange={(e) => setPostContent(e.currentTarget.value)} ></textarea>
        <textarea id="feedback" cols={60} rows={20} value={JSON.stringify(fullFeedback)}></textarea>

      </div>
    </div>
  );
}


export default App;
