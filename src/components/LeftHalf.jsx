import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/LeftHalf.css';

function LeftHalf() {
  const markdownContent = `
## Instructions

This is a **bold** text.

This is an _italic_ text.

### Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

### Links and Images

Link: [OpenAI](https://openai.com)

### Code

\`\`\`javascript
function helloWorld() {
  console.log('Hello, World!');
}
\`\`\`

### Blockquote

> This is a blockquote.

### Tables

| Name   | Age |
| ------ | --- |
| John   | 25  |
| Jane   | 30  |
| Robert | 40  |

`;

  return (
    <div className="instructions-container">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
}

export default LeftHalf;
