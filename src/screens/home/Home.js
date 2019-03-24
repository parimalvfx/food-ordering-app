import React, { Component } from 'react';
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    restaurantCard: {
        maxWidth: 260,
        maxHeight: 310,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 25,
        paddingBottom: 20
    },
    restaurantCardMedia: {
        height: 140
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
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />

                <Card className={classes.restaurantCard}>
                    <CardMedia
                        className={classes.restaurantCardMedia}
                        image='https://b.zmtcdn.com/data/res_imagery/42597_RESTAURANT_obp1.jpg'
                        title='placeholder'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            3 Wise Monkeys
                        </Typography>

                        <Typography className={classes.restaurantCategories} variant='p'>
                            Chinese, Continental, Indian, Italian, Snacks
                        </Typography>

                        <div className={classes.restaurantRating}>
                            <Typography className={classes.ratingText} variant='body2'>
                                4.9 (28)
                            </Typography>
                        </div>

                        <Typography className={classes.restaurantAvgRate} variant='body2'>
                            1100 for two
                        </Typography>

                    </CardContent>
                </Card>

            </div>
        )
    }
}

export default withStyles(styles)(Home);
