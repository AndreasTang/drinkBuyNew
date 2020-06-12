import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fireBase, googleAuthProvider } from '../firebase/fireBase'
import { signInputBoxText } from './DefaultValues'
import SignInputbox from './SignInputbox'
import AllButton from './AllButton'
import { history } from '../routers/AppRouter'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    root: {
		  padding: theme.spacing(2)
	},
	paper: {
		padding: theme.spacing(4)
    },
}))

const LoginPage = () => {

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailError, setIsEmailError] = useState(true)
    const [isPasswordError, setIsPasswordError] = useState(true)

    const handleMailChange = (email) => {
        setEmail(email)
        console.log(email)
    }

    const handlePasswordChange = (password) => {
        setPassword(password)
        console.log(password)
    }

    const handleMailError = (error) => {
        setIsEmailError(error)
        console.log(error)
    }

    const handlePasswordError = (error) => {
        setIsPasswordError(error)
        console.log(error)
    }

    const handleButton = (isEmailError, isPasswordError) => {

        if (isEmailError === true || isPasswordError === true) {

            return true

        } else {

            return false

        }
    }

    const startSignin = () => {

        fireBase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                const user = fireBase.auth().currentUser
                if (!user) {
                    history.push('./')
                } else if (user && user.emailVerified) {
                    history.push('./home')
                } else if (user && !user.emailVerified) {
                    history.push('./notLoginPage')
                }
            }).catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    alert('密碼錯誤')
                } else if (error.code === 'auth/user-not-found') {
                    alert('無此帳號')                   
                } else {
                    console.log(error)
                }
            })
    }
    
    const SignInWithGoogle = () => {
        fireBase.auth().signInWithPopup(googleAuthProvider)
            .then((result) => {
                console.log('Good')
            }).catch((error) => {
                console.log(error)
            })
    }
    
    const SignInWithFacebook = () => {
        
    }

    return (
        <Container className={classes.root} maxWidth='sm'>
            <Paper elevation={3} variant="outlined">
                <Grid container direction='column'>
                    <Typography variant='h2' align="center">請登入您的帳號</Typography>
                    <div align='center'>
                        <div>
                            <SignInputbox text={signInputBoxText.email} handleInput={handleMailChange} handleMailError={handleMailError} />
                        </div>
                        <div>
                            <SignInputbox text={signInputBoxText.password} handleInput={handlePasswordChange} handlePasswordError={handlePasswordError} />
                        </div>
                        <div>
                            <AllButton text={'登入'} handleClick={() => startSignin()} disable={handleButton(isEmailError, isPasswordError)} />
                        </div>
                    </div>
                    <div align='center'>
                        <button onClick={(() => SignInWithGoogle())}>使用Google帳號註冊或登入</button>
                    </div>
                    <div align='center'>
                        還未有帳號? <Link to='/signUpPage'>點此註冊</Link>
                    </div>
                </Grid>
            </Paper>
        </Container>
    )
}

export default LoginPage