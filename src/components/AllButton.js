import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const AllButton = ({ text, handleClick, disable }) => {

    const classes = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => handleClick()}
                disabled={disable}
            >
                {text}
            </Button>
        </div>
    )
}

export default AllButton