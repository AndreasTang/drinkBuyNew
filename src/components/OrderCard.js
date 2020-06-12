import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia, Grid } from '@material-ui/core';
import CardPic from './drinks.jpg'
import AllButton from './AllButton';
import dataBase from '../firebase/fireBase'
import authContext from '../context/authContext'
import { history } from '../routers/AppRouter'

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
		margin: theme.spacing(1)
  	},
  	media: {
		height: 0,
		paddingTop: '56%'
	},
	typography: {
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1),
	}
}));

const OrderCard = ({ text, orderData, handleClick, sendMail }) => {

	const classes = useStyles();
	const isOnHomePage = !handleClick
	const { uid } = useContext(authContext)

	const sendMailHandler = (fetch) => {

		orderData.attendantEmail.forEach((emailAddress) => {
			sendMail(orderData.orderId, emailAddress, fetch)
		})

		const isdrinkArrived = fetch ? true : orderData.isdrinkArrived

		dataBase.collection('order').doc(`${orderData.orderId}`).set({
			posterName: orderData.posterName,
			posterUid: orderData.posterUid,
			posterEmail: orderData.posterEmail,
			attendantUid: orderData.attendantUid,
			attendantEmail:orderData.attendantEmail,
			orderId: orderData.orderId,
			createTimestamp: orderData.createTimestamp,
			updateTimeStamp: Date.now(),
			address: orderData.address,
			shop: orderData.shop,
			discount: orderData.discount,
			totalCount: orderData.totalCount,
			remainedCount: orderData.remainedCount,
			isCompeleted: true,
			isdrinkArrived: isdrinkArrived
        }).catch((error) => {
            console.log(error)
		}).then(() => {
			console.log('jump')
			history.push('./home')
		})
	}

  	return (

		<Grid item component={Card} className={classes.card} xs={4} >
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={CardPic}
					title="Contemplative Reptile"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h5">
						{`${orderData.shop}`}
					</Typography>
					<Typography gutterBottom variant="h6" component="h6">
						{`${orderData.discount}`}
					</Typography>
					<Typography gutterBottom variant="h6" component="h6">
						{`發起人: ${orderData.posterName}`}
					</Typography>
					<Grid container direction='row' justify='space-between'>
						<Typography variant="body2" color="textSecondary" component="p">
							{`地址: ${orderData.address}`}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{`總需: ${orderData.totalCount}杯`}
						</Typography>
					</Grid>
					<Grid container direction='row' justify='space-between'>
						<Typography variant="body2" color="textSecondary" component="p">
							{`目前杯數: ${orderData.totalCount - orderData.remainedCount}杯`}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{`還需: ${orderData.remainedCount}杯`}
						</Typography>
					</Grid>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{isOnHomePage ? (
					<React.Fragment>
						{orderData.remainedCount === 0 && orderData.posterUid === uid ? (
							<React.Fragment>
								{orderData.isCompeleted ? (
									<React.Fragment>
										{orderData.isdrinkArrived ? (
											<AllButton text={'所有流程都已經完成'} handleClick={() => {}} />
										) : (
											<AllButton text={'通知參與者拿取飲料'} handleClick={() => sendMailHandler(true)}/>
										)}
									</React.Fragment>									
								) : (
									<AllButton text={'傳送給店家'} handleClick={sendMailHandler}/>
								)}
							</React.Fragment>
						) : (
							<React.Fragment>
								<Button size="small" color="primary">
									檢視
								</Button>
								<Button size="small" color="primary">
									{text}		
								</Button>
							</React.Fragment>
						)}
					</React.Fragment>				
				) : (
					<React.Fragment>
						{orderData.remainedCount === 0 ? (
							<Typography className={classes.typography} variant='button'>揪團已滿</Typography>
						) : (
							<React.Fragment>
								<Button size="small" color="primary">
									檢視
								</Button>						
								<Button onClick={() => handleClick(orderData.orderId)} size="small" color="primary">
									{text}		
								</Button>
							</React.Fragment>
						)}
					</React.Fragment>
				)}
			</CardActions>
		</Grid>
  	)
}

export default OrderCard