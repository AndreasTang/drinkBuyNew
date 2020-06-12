const makeOrderReducer = (state, action) => {
    switch (action.type) {

        case 'POPULATE_ORDER_DATA': 

            return action.order

        case 'INPUT_ORDER_ADDRESS':

            return {
                ...state,
                address: action.address
            }

        case 'SELECT_SHOP':

            return {
                ...state,
                shop: action.shop
            }

        case 'SELECT_DISCOUNT':

            return {
                ...state,
                discount: action.discount
            }
        
        case 'SET_TOTAL_COUNT':

            return {
                ...state,
                totalCount: action.totalCount,
                remainedCount: action.totalCount
            }

        case 'DECREASE_REMAINED_COUNT':

            return {
                ...state,
                remainedCount: state.remainedCount - action.remainedCount
            }

        case 'INCREASE_REMAINED_COUNT':

            return {
                ...state,
                remainedCount: state.remainedCount + action.remainedCount
            }

        default:

            return state

    }
}

export default makeOrderReducer