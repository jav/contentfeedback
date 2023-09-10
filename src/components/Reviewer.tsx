import React, { FunctionComponent } from 'react'
import CSS from 'csstype'
import ReviewerAvatar from './ReviewerAvatar'

type ReviewerProps = {
    name: string,
    score: number,
    feedback: string
}

const Reviewer: FunctionComponent<ReviewerProps> = ({ name, score, feedback }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <ReviewerAvatar name={name} />
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        position: "relative", top: "-1.5em"
                    }}>
                        <span style={styles.scoreSign}>
                            Score: {score}
                        </span>
                        <span style={styles.nameSign}>
                            {name}
                        </span>
                    </div>

                </div>
                <div style={styles.speechBubble}>
                    {feedback}
                </div>
            </div>


        </div>
    )
}

export default Reviewer

const styles = {
    scoreSign: {
        backgroundColor: '#F4F4F4',
        padding: "0.2em 0.7em",
        borderRadius: "0.4em"
    } as CSS.Properties,
    nameSign: {
        backgroundColor: '#F4F4F4',
        padding: "0.2em 0.7em",
        top: "-1.5em",
        borderRadius: "0.4em"
    } as CSS.Properties,
    speechBubble: {
        margin: "1em 2em",
        position: "relative",
        background: "#deddda",
        padding: "1em 2em",
        borderRadius: "0.4em"
    } as CSS.Properties,
}
