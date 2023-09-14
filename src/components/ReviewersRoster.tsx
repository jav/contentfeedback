import React, { FunctionComponent } from 'react'
import Reviewer from './Reviewer'

type ReviewerProps = {
    reviewersSlugs: string[],
    names: { [slug: string]: string },
    scores: { [slug: string]: number | null },
    feedbacks: { [slug: string]: string | null },
    improvementSuggestions: { [slug: string]: string | null },
    muted: { [slug: string]: boolean | null }
    mute: (slug: string) => void
    unmute: (slug: string) => void
}

const ReviewersRoster: FunctionComponent<ReviewerProps> = ({ reviewersSlugs, names, scores, feedbacks, improvementSuggestions, muted, mute, unmute }) => {
    console.log("ReviewersRoster:", reviewersSlugs)
    return (
        <div className="ReviewersRosterBox">
            {reviewersSlugs.map(
                slug => (
                    <>
                        <Reviewer
                            key={slug}
                            name={names[slug]}
                            score={scores[slug]}
                            feedback={feedbacks[slug] ?? "Zzzzzz...."}
                            improvementSuggestion={improvementSuggestions[slug] ?? ""}
                            enabled={!(muted[slug] ?? false)}
                        />
                        <button name="toggleReviewer"
                            key={`${slug}MuteButton`}
                            onClick={() => {
                                (muted[slug] ?? false) ? unmute(slug) : mute(slug)
                            }}>
                            {(muted[slug] ?? false) ? "Unmute" : "Mute"}
                        </button>
                    </>
                )
            )}
        </div>
    )
}

export default ReviewersRoster