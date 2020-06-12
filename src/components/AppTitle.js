import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import authContext from '../context/authContext'
import { fireBase } from '../firebase/fireBase'

const logout = () => {
    fireBase.auth().signOut()
}

const AppTitle = () => {

    const { displayName } = useContext(authContext)

    return (
        <Grid container space={1} >
            <Grid
                item
                xs={10}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <h1>揪團來一杯吧!!</h1>
            </Grid>
            <Grid
                item
                xs={2}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <div>{`您好 ${displayName}`}</div>
                <Button color="primary" onClick={logout}>登出</Button>
                <IconButton color="primary" aria-label="settings">
                    <SettingsIcon />
                </IconButton>
            </Grid>
        </Grid>  
    )

}

export default AppTitle