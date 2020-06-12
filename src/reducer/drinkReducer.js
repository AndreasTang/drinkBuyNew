import uuid from 'uuid/v1'

const drinkReducer = (state, action) => {
    switch (action.type) {

        case 'SELECT_DRINK':

            return {
                ...state,
                drink: action.drink
            }

        case 'ADD_DRINK_COUNT':

            return {
                ...state,
                count: action.count
            }

        case 'SELECT_ICE':

            return {
                ...state,
                ice: action.ice
            }

        case 'SELECT_SWEET':

            return {
                ...state,
                sweet: action.sweet
            }

        case 'SEND_DRINK':

            return {
                ...state,
                totalDrinks: [
                    ...state.totalDrinks,
                    {
                        drinkId: uuid(),
                        drink: action.drinkData.drink,
                        count: action.drinkData.count,
                        ice: action.drinkData.ice,
                        sweet: action.drinkData.sweet,
                    }
                ]
            }

            case 'DELETE_DRINK':

                    return {
                        ...state,
                        totalDrinks: state.totalDrinks.filter((drink) => {
                            return drink.drinkId !== action.drinkId
                        })
                    }

        default:

            return state

    }
}

export default drinkReducer