import React, { useEffect } from 'react';
import './App.css';

import Reviewer from './components/Reviewer';
import Editor from './components/Editor';
import ReviewersRoster from './components/ReviewersRoster';

type FullFeedback = {
  [key: string]: Feedback
}

type Feedback = {
  "score": number,
  "feedback": string
  "improvementSuggestion": string
}

type Reviewer = {
  slug: string,
  name: string,
  enabled?: boolean,
  score?: number,
  feedback?: string,
  improvementSuggestion?: string
}

const fetchAvailableReviewers = async () => {
  return await fetch('http://localhost:9000/api/reviewers').then(response => response.json())
}

type AllReviewersFeedback = {
  scores: { [slug: string]: number },
  feedback: { [slug: string]: string },
  improvementSuggestions: { [slug: string]: string }
}
const getAllReviewersFeedback = async (reviewersSlugs: string[], postContent: string): Promise<AllReviewersFeedback> => {

  let scoresAcc = {}
  let feedbacksAcc = {}
  let improvementSuggestionsAcc = {}

  const reviewersFeedback = await Promise.all(reviewersSlugs.map((slug) => getReviewerFeedback(slug, postContent)))

  reviewersFeedback.forEach((reviewerFeedback) => {
    scoresAcc = { ...scoresAcc, [reviewerFeedback.slug]: reviewerFeedback.score }
    feedbacksAcc = { ...feedbacksAcc, [reviewerFeedback.slug]: reviewerFeedback.feedback }
    improvementSuggestionsAcc = { ...improvementSuggestionsAcc, [reviewerFeedback.slug]: reviewerFeedback.improvementSuggestion }
  })

  return {
    scores: scoresAcc,
    feedback: feedbacksAcc,
    improvementSuggestions: improvementSuggestionsAcc
  }
}

const getReviewerFeedback = async (reviewerSlug: string, postContent: string): Promise<Reviewer> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentToGetFeedbackOn: postContent })
    }
    const reviewer = await fetch(`http://localhost:9000/api/reviewers/${reviewerSlug}/getFeedback`, requestOptions).then(response => response.json())
    reviewer.slug = reviewerSlug

    return reviewer

  } catch (error) {
    console.error(error)
    throw error
  }
}


const App = () => {

  const [reviewersSlugs, setReviewersSlugs] = React.useState<string[]>([])
  const [names, setNames] = React.useState<{ [slug: string]: string }>({})
  const [scores, setScores] = React.useState<{ [slug: string]: number | null }>({})
  const [feedbacks, setFeedbacks] = React.useState<{ [slug: string]: string | null }>({})
  const [improvementSuggestions, setImprovementSuggestions] = React.useState<{ [slug: string]: string | null }>({})
  const [postContent, setPostContent] = React.useState<string>("")
  const [muted, setMuted] = React.useState<{ [slug: string]: boolean }>({})

  const [loadingFeedback, setLoadingFeedback] = React.useState<boolean>(false)

  useEffect(() => {
    const initReviewers = async () => {
      const reviewers: Reviewer[] = await fetchAvailableReviewers()
      const reviewersSlugs = reviewers.map(reviewer => reviewer.slug)
      setReviewersSlugs(reviewersSlugs)


      let namesAcc = {}
      let scoresAcc = {}
      let feedbacksAcc = {}
      let improvementSuggestionsAcc = {}

      reviewers.forEach((reviewer) => {
        namesAcc = { ...namesAcc, [reviewer.slug]: reviewer.name }
        scoresAcc = { ...scoresAcc, [reviewer.slug]: null }
        feedbacksAcc = { ...feedbacksAcc, [reviewer.slug]: null }
        improvementSuggestionsAcc = { ...improvementSuggestionsAcc, [reviewer.slug]: null }
      })
      setNames(namesAcc)
      setScores(scoresAcc)
      setFeedbacks(feedbacksAcc)
      setImprovementSuggestions(improvementSuggestionsAcc)

    }

    initReviewers()
  }, [])

  return (
    <div className="App">
      <div className="ContentPanel">
        <Editor
          content={postContent}
          onChange={(content) => setPostContent(content)} />
      </div>
      <div className="ReviewersPanel">
        <div className="flexRow">
          <button name="getFeedback"
          onClick={() => {
            setLoadingFeedback(true)
            getAllReviewersFeedback(reviewersSlugs, postContent).then(
              (allReviewersFeedback) => {
                setScores(allReviewersFeedback.scores)
                setFeedbacks(allReviewersFeedback.feedback)
                setImprovementSuggestions(allReviewersFeedback.improvementSuggestions)

              }
            ).then(() => setLoadingFeedback(false))
          }

          }>Get Feedback</button> &nbsp;
          {loadingFeedback ? (
            <div className="loading-spinner" />
          ) : null
          }
        </div>
        <ReviewersRoster
          reviewersSlugs={reviewersSlugs}
          names={names}
          scores={scores}
          feedbacks={feedbacks ?? ""}
          improvementSuggestions={improvementSuggestions}
          muted={muted}
          mute={(slug) => setMuted({ ...muted, [slug]: true })}
          unmute={(slug) => setMuted({ ...muted, [slug]: false })}
        />

      </div>
    </div>
  )
}


export default App;
