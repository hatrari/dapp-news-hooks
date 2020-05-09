// ACTIONS
const SET_WEB3 = 'SET_WEB3';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_CONTRACT = 'SET_CONTRACT';
const SET_LOADING = 'SET_LOADING';

// REDUCER
const Reducer = (state, action) => {
  switch(action.type) {
    case SET_WEB3:
      return {...state, web3: action.payload};
    case SET_ACCOUNTS:
      return {...state, accounts: action.payload};
    case SET_CONTRACT:
      return {...state, contract: action.payload};
    case SET_LOADING:
      return {...state, loading: action.payload};
  }
}

export default Reducer;