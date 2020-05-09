import React, {useState, useContext} from 'react';
import StoreContext from '../store/StoreContext';

const Create = () => {
  const {state, dispatch} = useContext(StoreContext);
  const [content, setContent] = useState('');
  const submit = () => {
    dispatch({type: 'SET_LOADING', payload: true});
    let date = new Date().toLocaleDateString();
    state.contract.methods
      .create(content, date)
      .send({from: state.accounts[0]}, (err, hash) => {
        setContent('');
        dispatch({type: 'SET_MESSAGE', payload: 'TxHash : '.concat(hash)});
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        dispatch({
          type: 'SET_MESSAGE', 
          payload: error.message.substring(0,100).concat('...')
        });
      })
      .finally(() => {
        dispatch({type: 'SET_LOADING', payload: false});
      })
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