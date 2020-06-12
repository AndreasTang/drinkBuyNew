import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { fireBase } from '../firebase/fireBase'
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

const NotLoginPage = () => {

    const classes = useStyles()
    const [text, setText] = useState('一封驗證信件已經寄到您的信箱，請至您的信箱收信')

    const sendMail = () => {
        const user = fireBase.auth().currentUser
        user.sendEmailVerification()
            .then(() => {
                setText('新的驗證信已經發送')
            }).catch((error) => {
                console.log(error)
                if (error.code === 'auth/too-many-requests') {
                    alert('請稍後再試')
                }
            })
    }
    
    return (
        <Container className={classes.root} maxWidth='sm'>
            <Paper elevation={3} variant="outlined">
                <Grid container direction='column'>
                    <Typography className={classes.typography} variant='h2' align="center">您的信箱尚未認證</Typography>
                    <Typography className={classes.typography} variant='h5' align="center">請先至您註冊的信箱收信後再回來喔</Typography>
                    <Typography className={classes.typography} align='center'><button onClick={() => sendMail()}>重新發送驗證信</button></Typography>
                    <Typography className={classes.typography} align='center'>或</Typography>
                    <Typography className={classes.typography} align='center'><Link to='/'>返回註冊頁面</Link></Typography>
                    <Typography className={classes.typography} align='center'>{text}</Typography>
                </Grid>
            </Paper>
        </Container>
    )
}

export default NotLoginPage