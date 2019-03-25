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
    restaurantCardsGridList: {
        position: 'absolute',
        margin: 'auto',
    },
    restaurantCard: {
        width: 250,
        maxWidth: 250,
        height: 340,
        maxHeight: 340,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 5,
        paddingBottom: 15,
    },
    restaurantCardMedia: {
        height: 140
    },
    restaurantName: {
        marginBottom: 20,
    },
    ratingAvgRateDiv: {
        position: 'absolute',
        bottom: 20,
    },
    restaurantRatingDiv: {
        backgroundColor: '#EACC5E',
        width: 100,
        textAlign: 'center',
        float: 'left'
    },
    restaurantRatingText: {
        color: 'white',
    },
    restaurantAvgRateText: {
        marginLeft: 30,
        float: 'right',
    },
});


class Home extends Component {
    
    constructor() {
        super();
        this.state = {
            restaurants: [],
            cards: 2,
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

        this.updateCardsGridListCols();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateCardsGridListCols);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateCardsGridListCols);
    }

    updateCardsGridListCols = () => {
        if (window.innerWidth >= 1500) {
            this.setState({cards: 5});
            return;
        }

        if (window.innerWidth >= 1200) {
            this.setState({cards: 4});
            return;
        }

        if (window.innerWidth >= 900) {
            this.setState({cards: 3});
            return;
        }

        this.setState({cards: 2});
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />

                <GridList
                    className={classes.restaurantCardsGridList}
                    cols={this.state.cards}
                    cellHeight='auto'
                >
                    {this.state.restaurants.map(restaurant => (
                        <GridListTile key={'restaurant' + restaurant.id}>

                            <Card className={classes.restaurantCard}>
                                <CardMedia
                                    className={classes.restaurantCardMedia}
                                    image={restaurant.photo_URL}
                                    title={restaurant.restaurant_name}
                                />
                                <CardContent>
                                    <Typography className={classes.restaurantName} gutterBottom variant='h5' component='h2'>
                                        {restaurant.restaurant_name}
                                    </Typography>

                                    <Typography variant='subtitle1'>
                                        {restaurant.categories}
                                    </Typography>

                                    <div className={classes.ratingAvgRateDiv}>
                                        <div className={classes.restaurantRatingDiv}>
                                            <Typography className={classes.restaurantRatingText} variant='body2'>
                                                <i className="fa fa-star"></i> {restaurant.customer_rating} ({restaurant.number_customers_rated})
                                            </Typography>
                                        </div>

                                        <Typography className={classes.restaurantAvgRateText} variant='body2'>
                                            <i className="fa fa-inr"></i>{restaurant.average_price} for two
                                        </Typography>
                                    </div>

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
