import React, {useState, useContext} from 'react';
import StoreContext from '../store/StoreContext';

const Create = () => {
  const {state, dispatch} = useContext(StoreContext);
  const [content, setContent] = useState('');
  const submit = () => {
    dispatch({type: 'SET_LOADING', payload: true});
    dispatch({type: 'SET_MESSAGE', payload: undefined});
    let date = new Date().toLocaleDateString();
    state.contract.methods
      .create(content, date)
      .send({from: state.accounts[0]}, (err, hash) => {
        setContent('');
        dispatch({type: 'SET_MESSAGE', payload: hash});
      })
      .then(res => {
      })
      .catch(error => {
        dispatch({
          type: 'SET_MESSAGE', 
          payload: error.message.substring(0,100).concat('...')
        });
      })
      .finally(async () => {
        dispatch({type: 'SET_MESSAGE', payload: undefined});
        const news = await state.contract.methods.news().call();
        dispatch({type: 'SET_NEWS', payload: news});
        dispatch({type: 'SET_LOADING', payload: false});
      });
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