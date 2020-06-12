import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import authContext from '../context/authContext'

const PublicRoute = ({ component: Component, ...rest }) => {

    const { uid, emailVerified } = useContext(authContext)
    const isAuthenticated = !!uid
    const isverified = emailVerified
    console.log(`public: ${isAuthenticated}`)

    return (
        <Route {...rest} component={(props) => {
            return (
                isAuthenticated && isverified ? (
                    <Redirect to='/home' />
                ) : (
                    <Component {...props} />
                )
            )
        }} />
    )  
}

export default PublicRoute