import React from 'react';
import './App.css';

import Reviewer from './components/Reviewer';
import Editor from './components/Editor';

type FullFeedback = {
  [key: string]: Feedback
}

type Feedback = {
  "score": number,
  "feedback": string
}

const initReviewers = () => {
  return {
    "the critic": {
      score: 0,
      feedback: "You haven't even started yet!"
    },
    "the grammarian": {
      score: 0,
      feedback: "You haven't even started yet!"
    },
  }
}

const App = () => {
  const [postContent, setPostContent] = React.useState<string>("No post content yet")
  const [fullFeedback, setFullFeedback] = React.useState<FullFeedback>(() => initReviewers())

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
    <div className="App">
      <div className="ContentPanel">
        <Editor
          content={postContent}
          onChange={(content) => setPostContent(content)} />
      </div>
      <div className="ReviewersPanel">
        <button name="getFeedback" onClick={() => getFeedback(postContent)}>Get Feedback</button>

        {Object.keys(fullFeedback).map((reviewerName) => (
          <div>
            <Reviewer name={reviewerName}
              enabled={false}
              key={reviewerName}
              score={fullFeedback[reviewerName].score}
              feedback={fullFeedback[reviewerName].feedback} />
          </div>
        ))}
      </div>
    </div>
  )
}


export default App;
