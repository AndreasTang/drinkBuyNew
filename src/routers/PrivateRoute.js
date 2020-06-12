import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AppTitle from '../components/AppTitle'
import Header from '../components/Hearder'
import authContext from '../context/authContext'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { uid, emailVerified } = useContext(authContext)
    const isAuthenticated = !!uid
    const isverified = emailVerified
    console.log(`private: ${isAuthenticated}`)

    return (
        <Route {...rest} component={(props) => {
            return (
                isAuthenticated && isverified ? (
                    <div>
                        <AppTitle />
                        <Header />
                        <Component {...props} />
                    </div>
                ) : (
                    <Redirect to='/' />
                )
            )
        }} />
    )  
}

export default PrivateRoute