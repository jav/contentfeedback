import React, { FunctionComponent } from 'react'
import ReviewerAvatar from './ReviewerAvatar'

type ReviewerProps = {
    name: string,
    score: number | null,
    feedback: string,
    improvementSuggestion: string,
    enabled: boolean
}

const Reviewer: FunctionComponent<ReviewerProps> = ({ name, score, feedback, improvementSuggestion, enabled }) => {

    return (
        <div className="Reviewer">
            <div className="ReviewerBox">
                <div className="ReviewerAvatarBox">
                    {enabled ? <ReviewerAvatar name={name} /> : null}
                    <div className="SignsBox">
                        <span className={`ScoreSign ${enabled ? '' : 'NoDisplay'}`}>
                            Score: {score ?? "N/A"}
                        </span>
                        <span className={`NameSign`}>
                            {name}
                        </span>
                    </div>
                </div>
            </div>
            <div className={`SpeechBubble ${enabled ? '' : 'NoDisplay'}`}>
                {feedback}
                <hr />
                {improvementSuggestion}
            </div>
        </div>
    )
}

export default Reviewer