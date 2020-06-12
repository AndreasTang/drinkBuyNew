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

const InputBox = ({ text, handleInput }) => {

    const classes = useStyles()
    const [userInput, setUserInput] = useState('')
    const [error, setError] = useState(true)
    const [helperText, setHelperText] = useState('不可為空白')
    const addressFilter = /[.]/

    const onTextChange = (value) => {

        setUserInput(value)

        if (value === '') {

            setError(true)
            setHelperText('不可為空白')
            handleInput(value)

        } else if (value.match(addressFilter)) {

            setError(true)
            setHelperText(text.helperText)
            handleInput(value)

        } else {

            setError(false)
            setHelperText(null)
            handleInput(value)

        }

    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default InputBox