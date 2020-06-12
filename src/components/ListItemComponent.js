import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import DeleteIcon from '@material-ui/icons/Delete'

const ListItemComponent = ({ drink, deleteDrink }) => {

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <LocalDrinkIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={`${drink.drink} ${drink.count}杯 ${drink.ice} ${drink.sweet}`}
            />
            <ListItemSecondaryAction>
                <IconButton onClick={() => {deleteDrink(drink.drinkId)}} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ListItemComponent