import React, { FunctionComponent } from 'react'

type ReviewerProps = {
    name: string,
    score: number,
    feedback: string
}

const Reviewer: FunctionComponent<ReviewerProps> = ({ name, score, feedback }) => {

    return (
        <div style={{ flex: 1 }}>
            <div>
                <span>{name}</span>
                <span>Score: {score} </span>
                <span>Feedback: {feedback} </span>
            </div>
        </div>
    )
}

export default Reviewer
