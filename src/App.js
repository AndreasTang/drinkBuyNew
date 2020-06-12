import React,{ useState } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline'
import AppRouter from '../src/routers/AppRouter'
import { fireBase } from './firebase/fireBase'
import { history } from './routers/AppRouter'
import AuthContext from './context/authContext'

const App = () => {

    const [uid, setUid] = useState('')
    const [emailVerified, setEmailVerified] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    fireBase.auth().onAuthStateChanged((user) => {

        if (user && user.emailVerified) {

            console.log(`login`)
            setUid(user.uid)
            setEmailVerified(user.emailVerified)
            setDisplayName(user.displayName)
            setEmail(user.email)
            setIsLoaded(true)

            if (history.location.pathname === '/' && emailVerified) {
                history.push('./home')
            }
    
        } else if (user && !user.emailVerified) {

            console.log(`login but not verified`)
            setUid(user.uid)
            setEmailVerified(user.emailVerified)
            setDisplayName(user.displayName)
            setEmail(user.email)
            setIsLoaded(true)

            if (history.location.pathname === '/' && !emailVerified) {
                history.push('./notLoginPage')
            }

        } else {
            console.log('logout')

            setUid('')
            setEmailVerified('')
            setDisplayName('')
            setIsLoaded(true)
            history.push('./')
        }
    })

    if (isLoaded) {
        return (
            <AuthContext.Provider value={{
                uid,
                emailVerified,
                displayName,
                email,
                currentPage,
                setCurrentPage
            }}>
                <CssBaseLine />
                <AppRouter />
            </AuthContext.Provider>
        )
    } else {
        return (
            <p>Loading......</p>
        )
    }
}

export default App;
