import React, { useReducer, useContext, useEffect } from 'react'
import MakeOrder2 from './MakeOrder2'
import MakeOrderReducer from '../reducer/makeOrderReducer'
import drinkReducer from '../reducer/drinkReducer'
import { defaultOrder, defaultDrink } from './DefaultValues'
import DataContext from '../context/dataContext'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Container, Grid } from '@material-ui/core'
import OrderShower from './OrderShower'
import AllButton from './AllButton'
import authContext from '../context/authContext'
import dataBase from '../firebase/fireBase'
import { history } from '../routers/AppRouter'

const useStyles = makeStyles(theme => ({
    root: {
		  padding: theme.spacing(1, 1, 1, 1)
	},
	paper: {
		padding: theme.spacing(4)
	}
}));

const AddOrder = ({ order, drink, setHidePage1 }) => {

    const classes = useStyles()
    const [orderData, dispatchOrderData] = useReducer(MakeOrderReducer, defaultOrder)
	const [drinkData, dispatchDrinkData] = useReducer(drinkReducer, defaultDrink)
    const { uid, email } = useContext(authContext)
    
    console.log(orderData)
    console.log(drink)

	const handleClick = () => {

        const sendTime = Date.now()
        
        console.log(orderData)
        console.log(drink)

        const attendantUid = orderData.attendantUid.includes(uid) ? [...orderData.attendantUid] : [...orderData.attendantUid, uid]
		const attendantEmail = orderData.attendantEmail.includes(email) ? [...orderData.attendantEmail] : [...orderData.attendantEmail, email]

		dataBase.collection('order').doc(`${orderData.orderId}`).set({
            posterName: orderData.posterName,
			posterUid: orderData.posterUid,
			posterEmail: orderData.posterEmail,
			attendantUid:attendantUid,
			attendantEmail:attendantEmail,
			orderId: orderData.orderId,
            createTimestamp: orderData.createTimestamp,
            updateTimeStamp: sendTime,
			address: orderData.address,
			shop: orderData.shop,
			discount: orderData.discount,
			totalCount: orderData.totalCount,
			remainedCount: orderData.remainedCount,
			isCompeleted: orderData.isCompeleted,
			isdrinkArrived: orderData.isdrinkArrived
        }).catch((error) => {
            console.log(error)
		}).then(() => {
            dataBase.collection('order').doc(`${orderData.orderId}`).collection('totalDrink').add({
                orderId: orderData.orderId,
                totalDrinks: [
                    ...drinkData.totalDrinks
                ]
            })
        }).catch((error) => {
			console.log(error)
		})

		history.push('./searchOrderPage')
		
	}

    useEffect(() => {
        dispatchOrderData({ type: 'POPULATE_ORDER_DATA', order: order[0]})
    }, [])

    useEffect(() => {
    }, [orderData])

    return (
		<Container className={classes.root} maxWidth="xl">
			<Paper className={classes.paper}>
				<DataContext.Provider value={{
					orderData,
					drinkData,
					dispatchOrderData,
					dispatchDrinkData,
				}}>				
					<Grid container direction='row' alignItems="flex-start" justify='space-evenly'>
						<Grid item>
							<Grid item>	
								<React.Fragment>
									<Typography variant="h5" component="h3">填寫揪團內容</Typography>
									<Typography component="p">請選取您要的飲料</Typography>
								</React.Fragment>
							</Grid>
							<Grid item>
								<MakeOrder2 setHidePage1={setHidePage1} />
							</Grid>
						</Grid>
					
						<Grid item>
							<OrderShower />
						</Grid>
					</Grid>

					<Grid container justify='center'>
						<AllButton text={'完成訂單'} handleClick={handleClick} disable={drinkData.totalDrinks.length > 0 && orderData.remainedCount >= 0 ? false : true} />
						{orderData.remainedCount < 0 ? (<div>剩餘杯數不足</div>) : (<div></div>) }
					</Grid>
				</DataContext.Provider>
			</Paper>	
		</Container>
    )
}

export default AddOrder