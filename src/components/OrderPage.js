import React, { useState, useReducer, useContext, useEffect } from 'react'
import MakeOrder1 from './MakeOrder1'
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
import uuid from 'uuid/v1'
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

const OrderPage = () => {

	const classes = useStyles()
	const [hidePage1, setHidePage1] = useState(false)
	const [orderData, dispatchOrderData] = useReducer(MakeOrderReducer, defaultOrder)
	const [drinkData, dispatchDrinkData] = useReducer(drinkReducer, defaultDrink)
	const { uid, displayName, email, setCurrentPage } = useContext(authContext)

	useEffect(() => {
		setCurrentPage(1)
	}, [])

	const handleHide = (hide) => {
		setHidePage1(hide)
	}

	const handleClick = () => {

		const sendTime = Date.now()
		const orderId = uuid()

		dataBase.collection('order').doc(`${orderId}`).set({
			posterName: displayName,
			posterUid: uid,
			posterEmail: email,
			attendantUid: [uid],
			attendantEmail:[],
			orderId: orderId,
			createTimestamp: sendTime,
			updateTimeStamp: sendTime,
			address: orderData.address,
			shop: orderData.shop,
			discount: orderData.discount,
			totalCount: orderData.totalCount,
			remainedCount: orderData.remainedCount,
			isCompeleted: false,
			isdrinkArrived: false
        }).catch((error) => {
            console.log(error)
		})
		
		dataBase.collection('order').doc(`${orderId}`).collection('totalDrink').add({
			orderId: orderId,
			totalDrinks: [
				...drinkData.totalDrinks
			]
		}).catch((error) => {
			console.log(error)
		})

		history.push('./home')
		
	}

    return (
		<Container className={classes.root} maxWidth="xl">
			<Paper className={classes.paper}>
				<DataContext.Provider value={{
					orderData,
					drinkData,
					dispatchOrderData,
					dispatchDrinkData,
				}}>				
					<Grid container direction='row' alignItems="flex-start" justify={hidePage1 ? 'space-evenly' : 'center'}>
						<Grid item>
							<Grid item>
								{hidePage1 ? (
									<React.Fragment>
										<Typography variant="h5" component="h3">填寫揪團內容</Typography>
										<Typography component="p">請選取您要的飲料</Typography>
									</React.Fragment>
								) : (
									<React.Fragment>
										<Typography variant="h5" component="h3">建立新揪團</Typography>
										<Typography component="p">請完成下表以繼續下一步</Typography>
									</React.Fragment>
								)}
							</Grid>
							<Grid item>
								{hidePage1 ? (<MakeOrder2 handleHide={handleHide} />) : (<MakeOrder1 handleHide={handleHide} />)}
							</Grid>
						</Grid>
					
						<Grid item>
							{hidePage1 ? (<OrderShower />) : (<div></div>)}
						</Grid>
					</Grid>

					<Grid container justify='center'>
						{hidePage1 ? (<AllButton text={'完成揪團'} handleClick={handleClick} disable={drinkData.totalDrinks.length > 0 && orderData.remainedCount >= 0 ? false : true} />) : (<div></div>)}
						{orderData.remainedCount < 0 ? (<div>剩餘杯數不足</div>) : (<div></div>) }
					</Grid>
				</DataContext.Provider>
			</Paper>	
		</Container>
    )
}

export default OrderPage