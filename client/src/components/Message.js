import React, {useContext} from 'react';
import StoreContext from '../store/StoreContext';

const Message = () => {
  const {state} = useContext(StoreContext);
  const href = "https://ropsten.etherscan.io/tx/".concat(state.message);
  return (
    <div id="message">
      <a href={href}>{href}</a>
    </div>
  )
}

export default Message;