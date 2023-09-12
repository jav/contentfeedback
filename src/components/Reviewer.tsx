import React, { FunctionComponent } from 'react'
import ReviewerAvatar from './ReviewerAvatar'

type ReviewerProps = {
    name: string,
    score: number,
    feedback: string,
    enabled: boolean
}

const Reviewer: FunctionComponent<ReviewerProps> = ({ name, score, feedback, enabled }) => {

    return (
        <div className="Reviewer">
            <div className="ReviewerBox">
                <div className="ReviewerAvatarBox">
                    {enabled ? <ReviewerAvatar name={name} /> : null}
                    <div className="SignsBox">
                        <span className={`ScoreSign ${enabled ? '' : 'NoDisplay'}`}>
                            Score: {score}
                        </span>
                        <span className={`NameSign`}>
                            {name}
                        </span>
                    </div>
                </div>
            </div>
            <div className={`SpeechBubble ${enabled ? '' : 'NoDisplay'}`}>
                {feedback}
            </div>
        </div>
    )
}

export default Reviewer