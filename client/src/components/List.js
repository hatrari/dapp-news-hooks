import React, {useContext} from 'react';
import StoreContext from '../store/StoreContext';

const List = () => {
  const {state, dispatch} = useContext(StoreContext);
  const itemsToShow = state.news.length > 5 ? state.news.length - 5 : 0;
  const like = (id) => {
    dispatch({type: 'SET_LOADING', payload: true});
    dispatch({type: 'SET_MESSAGE', payload: undefined});
    state.contract.methods
      .like(id)
      .send({from: state.accounts[0]}, (err, hash) => {
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
    <>
      <div id="title"><span>Last Five News</span></div>
      {state.news.slice(itemsToShow).map(item => (
      <div className="card" key={item[0]}>
          <div className="address">{item[1]}</div>
          <div className="date">{item[2]}</div>
          <div className="content">{item[3]}</div>
          <div className="reactions">
            <span className="like" onClick={() => like(item[0])}>
              &#x1F44F;
            </span> {item[4]}
          </div>
        </div>
      ))}
    </>
  )
}

export default List;