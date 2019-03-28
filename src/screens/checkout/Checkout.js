import React, { Component } from 'react';
import './Checkout.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    stepperRoot: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    tabRoot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
});

function getSteps() {
    return ['Delivery', 'Payment'];
}

function TabContainer(props) {
    return (
        <Typography component='div' style={{padding: 8*3}}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            tabValue: 0,
        }
    };

    preState = {
        activeStep: 0,
    };

    stepperNextHandler = () => {
        this.setState(preState => ({
            activeStep: preState.activeStep + 1,
        }));
    };

    stepperBackHandler = () => {
        this.setState(preState => ({
            activeStep: preState.activeStep - 1,
        }));
    };

    stepperResetHandler = () => {
        this.setState({
            activeStep: 0,
        });
    };

    tabChangeHandler = (event, value) => {
        this.setState({tabValue: value});
    }

    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        const {tabValue} = this.state;

        return (
            <div>
                <Header />

                <div className={classes.stepperRoot}>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    {index === 0 ?
                                        <div className={classes.tabRoot}>
                                            <AppBar position='static'>
                                                <Tabs value={tabValue} onChange={this.tabChangeHandler}>
                                                    <Tab label='EXISTING ADDRESS'/>
                                                    <Tab label='NEW ADDRESS'/>
                                                </Tabs>
                                            </AppBar>
                                            {tabValue === 0 && <TabContainer>foo</TabContainer>}
                                            {tabValue === 1 && <TabContainer>bar</TabContainer>}
                                        </div>
                                        : ''
                                    }

                                    {index === 1 ?
                                        <h4>Options</h4>
                                        : ''
                                    }

                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.stepperBackHandler}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={this.stepperNextHandler}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>View the summary &#38; place your order now</Typography>
                            <Button onClick={this.stepperResetHandler} className={classes.button}>
                                CHANGE
                            </Button>
                        </Paper>
                    )}
                </div>
            </div>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);
