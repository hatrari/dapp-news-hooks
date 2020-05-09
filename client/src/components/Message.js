import React, {useContext} from 'react';
import StoreContext from '../store/StoreContext';

const Message = () => {
  const {state} = useContext(StoreContext);
  return (
    <div id="message">
      {state.message}
    </div>
  )
}

export default Message;