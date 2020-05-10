// ACTIONS
const SET_WEB3 = 'SET_WEB3';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_CONTRACT = 'SET_CONTRACT';
const SET_LOADING = 'SET_LOADING';
const SET_MESSAGE = 'SET_MESSAGE';
const SET_NEWS = 'SET_NEWS';
const SET_ERROR = 'SET_ERROR';

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
    case SET_MESSAGE:
      return {...state, message: action.payload};
    case SET_NEWS:
      return {...state, news: action.payload};
    case SET_ERROR:
      return {...state, error: action.payload};
  }
}

export default Reducer;