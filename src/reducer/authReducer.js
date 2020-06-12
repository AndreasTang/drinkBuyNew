const AuthReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN':

            return {
                ...state,
                ...action.user
            }

        case 'LOGOUT':

            return {
                uid: '',
                emailVerified: false,
                displayName: ''
            }

        default:

            return state

    }
}

export default AuthReducer