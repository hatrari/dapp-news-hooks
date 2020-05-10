import React, {useEffect, useReducer} from 'react';
import './App.css';
import Create from './components/Create';
import Reducer from './store/Reducer';
import InitialState from './store/InitialState';
import StoreContext from './store/StoreContext';
import GetWeb3 from './web3/GetWeb3';
import News from './contracts/News.json';
import Message from './components/Message';
import List from './components/List';
import Loading from './components/Loading';

function App() {
  // create the store
  const [state, dispatch] = useReducer(Reducer, InitialState);
  useEffect(() => {
    const init = async () => {
      try {
        dispatch({type: 'SET_LOADING', payload: true});
        const web3 = await GetWeb3();
        dispatch({type: 'SET_WEB3', payload: web3});
        const accounts = await web3.eth.getAccounts();
        dispatch({type: 'SET_ACCOUNTS', payload: accounts});
        const networkId = await web3.eth.net.getId();
        const deployedNetworkReg = News.networks[networkId];
        const contract = new web3.eth.Contract(
          News.abi,
          deployedNetworkReg && deployedNetworkReg.address,
        );
        dispatch({type: 'SET_CONTRACT', payload: contract});
        const news = await contract.methods.news().call();
        dispatch({type: 'SET_NEWS', payload: news});
        dispatch({type: 'SET_LOADING', payload: false});
      } catch {
        console.log('error');
      }
    }
    init();
  }, []);
  
  if(state.web3 && state.accounts && state.contract) {
    return (
      <StoreContext.Provider value={{state, dispatch}}>
        <div className="container">
          {state.message && <Message />}
          {state.loading && <Loading />}
          {!state.loading && <Create />}
          {state.news && <List />}
        </div>
      </StoreContext.Provider>
    )
  }

  return (
    <Loading />
  )
}

export default App;
