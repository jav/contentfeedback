import React, { FunctionComponent } from 'react'

type ReviewerAvatarProps = {
    name: string
}

const ReviewerAvatar: FunctionComponent<ReviewerAvatarProps> = ({ name }) => {
    const attribution = "Image by pikisuperstar on Freepik"

    const avatarNo = name.split("").reduce((acc, val) => acc + val.charCodeAt(0), 0) % 8 + 1
    const avatarSrc = `images/crop${avatarNo}.svg`

    return (
        <img
            className={`ReviewerAvatar`}
            src={avatarSrc}
            alt={attribution} />
    )
}

export default ReviewerAvatar
