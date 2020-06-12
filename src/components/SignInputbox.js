import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
    },
}));

const InputBox = ({ text, handleInput, handleMailError, handlePasswordError, handleNameError }) => {

    const classes = useStyles()
    const [userInput, setUserInput] = useState('')
    const [error, setError] = useState(true)
    const [helperText, setHelperText] = useState('不可為空白')

    let handleError
    if (handleMailError) {
        handleError = handleMailError
    } else if (handlePasswordError) {
        handleError = handlePasswordError
    } else {
        handleError = handleNameError
    }
    const emailFilter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    const passwordFilter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    const onTextChange = (value) => {

        setUserInput(value)

        if (value === '') {

            handleError(true)
            setError(true)
            setHelperText('不可為空白')

        } else if (handleMailError && !value.match(emailFilter)) {

            handleError(true)
            setError(true)
            setHelperText(text.helperText)

        } else if (handlePasswordError && !value.match(passwordFilter)) {

            handleError(true)
            setError(true)
            setHelperText(text.helperText)

        } else if (handleNameError && value === '') {
            console.log(handleNameError)
            console.log(value)

            handleError(true)
            setError(true)
            setHelperText(text.helperText)

        } else {

            handleError(false)
            setError(false)
            setHelperText(null)
            handleInput(value)

        }

        
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                error={error}
                id={text.id}
                label={text.label}
                helperText={helperText}
                value={userInput}
                onChange={(e) => onTextChange(e.target.value)}
            />
        </form>
    )
}

export default InputBox