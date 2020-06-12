import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fireBase } from '../firebase/fireBase'
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
    typography: {
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1)
    }
}))

const SignUpPage = () => {

    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isEmailError, setIsEmailError] = useState(true)
    const [isPasswordError, setIsPasswordError] = useState(true)
    const [isNameError, setIsNameError] = useState(true)

    const handleMailChange = (email) => {
        setEmail(email)
        console.log(email)
    }

    const handlePasswordChange = (password) => {
        setPassword(password)
        console.log(password)
    }

    const handleNameChange = (name) => {
        setName(name)
        console.log(name)
    }

    const handleMailError = (error) => {
        setIsEmailError(error)
        console.log(error)
    }

    const handlePasswordError = (error) => {
        setIsPasswordError(error)
        console.log(error)
    }

    const handleNameError = (error) => {
        setIsNameError(error)
        console.log(error)
    }

    const handleButton = (isEmailError, isPasswordError, isNameError) => {

        console.log(isEmailError, isPasswordError, isNameError)
        if (isEmailError === true || isPasswordError === true || isNameError === true) {

            return true

        } else {

            return false

        }
    }

    const startSignUp = () => {

        fireBase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                const user = fireBase.auth().currentUser
                user.sendEmailVerification()
                    .then(() => {
                        user.updateProfile({
                            displayName: name
                        })
                    }).then(() => {
                        history.push('./notLoginPage')
                    }).catch((error) => {
                        console.log(error)
                    })
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                alert('此信箱已被使用過')
            } else {
                console.log(error)
            }
        })

}

    return (
        <Container className={classes.root} maxWidth='sm'>
            <Paper elevation={3} variant="outlined">
                <Grid container direction='column'>
                    <Typography className={classes.typography} variant='h2' align="center">註冊新帳號</Typography>
                    <Typography className={classes.typography} variant='subtitle2' align="center">注意!! 密碼必須大於八個字元且包含英文大小寫和數字</Typography>
                    <div align='center'>
                        <div>
                            <SignInputbox text={signInputBoxText.email} handleInput={handleMailChange} handleMailError={handleMailError} />
                        </div>
                        <div>
                            <SignInputbox text={signInputBoxText.password} handleInput={handlePasswordChange} handlePasswordError={handlePasswordError} />
                        </div>
                        <div>
                            <SignInputbox text={signInputBoxText.name} handleInput={handleNameChange} handleNameError={handleNameError} />
                        </div>
                        <div>
                            <AllButton className={classes.button} text={'送出'} handleClick={() => startSignUp()} disable={handleButton(isEmailError, isPasswordError, isNameError)} />
                        </div>
                    </div>
                    <div align='center'>
                        <Link className={classes.typography} to='/'>返回至登入頁面</Link>
                    </div>
                </Grid>
            </Paper>
        </Container>
    )
}

export default SignUpPage