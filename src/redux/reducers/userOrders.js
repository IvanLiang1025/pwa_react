


export const types = {
  FETCH_ORDERS: 'FETCH_ORDERS',
  SAVE_ORDERS: 'SAVE_ORDERS'
}

export const actions = {
  fetchOrders: (payload) => ({type: types.FETCH_ORDERS, payload}),
}



const defaulState = {
  data1: {
    list: undefined,
    // pagination: {pageSize:PAGESIZE,current:globalData.orderPage[0]},
  },
}

export default  (state=defaulState, action) => {
    const tempState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case types.SAVE_ORDERS:
            tempState.data1.list = action.payload;
            return {
              ...state,
              data1: tempState.data1
            }
        default:
            return state;
    }
}