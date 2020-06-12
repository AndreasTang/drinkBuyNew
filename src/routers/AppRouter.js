import React from 'react'
import { Router, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import SigninPage from '../components/SigninPage'
import Home from '../components/Home'
import OrderPage from '../components/OrderPage'
import SearchOrderPage from '../components/SearchOrderPage'
import SignUpPage from '../components/SignUpPage'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import NotLoginPage from '../components/NotLoginPage'

const history = createHistory()

const AppRouter = () => {
    
    return (
        <Router history={history}>
            <React.Fragment>
                <Switch>
                    <PublicRoute exact path="/" component={SigninPage} />
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/orderPage" component={OrderPage} />
                    <PrivateRoute path="/searchOrderPage" component={SearchOrderPage} />
                    <PublicRoute path="/signUpPage" component={SignUpPage} />
                    <PublicRoute path="/notLoginPage" component={NotLoginPage} />
                </Switch>
            </React.Fragment>
        </Router>
    )
}

export { history, AppRouter as default  } 