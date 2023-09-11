import React, { FunctionComponent } from 'react'
import MarkdownEditor from '@uiw/react-markdown-editor'

type EditorProps = {
    content: string,
    onChange: (s: string) => void
}

const Editor: FunctionComponent<EditorProps> = ({ content, onChange }) => {
    return (
        <MarkdownEditor height="30em"
            value={content}
            visible={true}
            onChange={(value, viewUpdate) => {
                onChange(value)
            }}
        />
    )
}

export default Editor
