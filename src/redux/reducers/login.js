
export const types = {
  SET_LOGIN_STATUS: "SET_LOGIN_STATUS",
  LOG_OUT: "LOG_OUT",
  LOGIN: "LOGIN",
}

export const actions = {
  login: (payload) => ({type: types.LOGIN, payload}),
  setLogInStatus: (payload) => ({type: types.SET_LOGIN_STATUS}, payload),
}


const defaulState = {
    logInStatus: false
}

export default  (state=defaulState, action) => {
    const tempState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case types.SET_LOGIN_STATUS:
            // const {logInStatus} = action;
            return {
              ...state,
              logInStatus: action.payload
            }
        case types.LOG_OUT:
            tempState.logInStatus = false;
            return tempState;
        default:
            return state;
    }
}