import React, {useState} from 'react';

const Create = () => {
  const [content, setContent] = useState('');
  const submit = () => {
    console.log('submit');
  }
  return (
    <div id="create">
      <input 
        type="text" 
        value={content}
        placeholder="Content..."
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Create;