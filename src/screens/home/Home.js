import React, { Component } from 'react';
import './Home.css';
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css'
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    restaurantCard: {
        maxWidth: 250,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 25,
        paddingBottom: 15,
    },
    restaurantCardMedia: {
        height: 140
    },
    restaurantName: {
        marginBottom: 20,
    },
    restaurantCategories: {
        marginBottom: 25,
    },
    restaurantRating: {
        backgroundColor: '#EACC5E',
        width: 100,
        textAlign: 'center',
        float: 'left'
    },
    ratingText: {
        color: 'white',
    },
    restaurantAvgRate: {
        float: 'right',
    },
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [],
        }
    }

    componentWillMount() {
        let that = this;
        let dataRestaurants = null;
        let xhrRestaurants = new XMLHttpRequest();
        xhrRestaurants.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({
                    restaurants: JSON.parse(this.responseText).restaurants
                })
            }
        })
        xhrRestaurants.open('GET', 'http://localhost:8080/api/restaurant');
        xhrRestaurants.send(dataRestaurants);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />

                <GridList cols={4} cellHeight='auto'>
                    {this.state.restaurants.map(restaurant => (
                        <GridListTile key={'restaurant' + restaurant.id}>

                            <Card className={classes.restaurantCard}>
                                <CardMedia
                                    className={classes.restaurantCardMedia}
                                    image={restaurant.photo_URL}
                                    title={'Photo ' + restaurant.restaurant_name}
                                />
                                <CardContent>
                                    <Typography className={classes.restaurantName} gutterBottom variant='h5' component='h2'>
                                        {restaurant.restaurant_name}
                                    </Typography>

                                    <Typography className={classes.restaurantCategories} variant='subtitle1'>
                                        {restaurant.categories}
                                    </Typography>

                                    <div className={classes.restaurantRating}>
                                        <Typography className={classes.ratingText} variant='body2'>
                                            <i className="fa fa-star"></i> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                        </Typography>
                                    </div>

                                    <Typography className={classes.restaurantAvgRate} variant='body2'>
                                        <i className="fa fa-inr"></i>{restaurant.average_price} for two
                                    </Typography>

                                </CardContent>
                            </Card>
                        
                        </GridListTile>
                    ))
                    }
                </GridList>
            </div>
        )
    }
}

export default withStyles(styles)(Home);
