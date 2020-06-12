import React, { useContext } from 'react'
import DataContext from '../context/dataContext'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ListItemComponent from './ListItemComponent'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

const OrderShower = () => {

    const { orderData, drinkData, dispatchOrderData, dispatchDrinkData } = useContext(DataContext)
    const classes = useStyles();

    const deleteDrink = (drinkId) => {
        const actionRemainedCount = drinkData.totalDrinks.filter((drink) => {
            return drink.drinkId === drinkId
        })

        const remainedCount = actionRemainedCount[0].count

        dispatchOrderData({ type: 'INCREASE_REMAINED_COUNT', remainedCount })
        dispatchDrinkData({ type: 'DELETE_DRINK', drinkId })
    }

    return (
        <Grid container direction='column' spacing={3}>
            <Typography variant="h4" className={classes.title}>
                目前揪團
            </Typography>
            <Typography variant="h6" className={classes.title}>
                {`地址: ${orderData.address}`}
            </Typography>
            <Typography variant="h6" className={classes.title}>
                {`店家: ${orderData.shop}`}
            </Typography>
            <Typography variant="h6" className={classes.title}>
                {`優惠: ${orderData.discount}`}
            </Typography>
            <Typography variant="h6" className={classes.title}>
                {`剩下: ${orderData.remainedCount}`}
            </Typography>
            <div className={classes.demo}>
                <List>
                    {drinkData.totalDrinks.map((drink, index) => (
                        <ListItemComponent
                            key={index}
                            drink={drink}
                            deleteDrink={deleteDrink}
                        />
                    ))}
                </List>
            </div>
        </Grid>
    )
}

export default OrderShower