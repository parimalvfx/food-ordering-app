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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
    },
    radioRoot: {
        display: 'flex',
    },
    radioFormControl: {
        margin: theme.spacing.unit * 3,
    },
    radioGroup: {
        margin: `${theme.spacing.unit}px 0`,
    },
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
            states: [],
            paymentModes: [],
            radioValue: '',
            newAddressState: '',
        }
    };

    preState = {
        activeStep: 0,
    };

    componentWillMount() {
        let that = this;

        // states request
        let dataStates = null;
        let xhrStates = new XMLHttpRequest();
        xhrStates.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({
                    states: JSON.parse(this.responseText).states,
                });
            }
        });
        xhrStates.open('GET', 'http://localhost:8080/api/states');
        xhrStates.send(dataStates);

        // payment modes request
        let dataPaymentModes = null;
        let xhrPaymentModes = new XMLHttpRequest();
        xhrPaymentModes.addEventListener('readystatechange', function() {
            if (this.readyState === 4) {
                that.setState({
                    paymentModes: JSON.parse(this.responseText).paymentMethods,
                });
            }
        });
        xhrPaymentModes.open('GET', 'http://localhost:8080/api/payment');
        xhrPaymentModes.send(dataPaymentModes);
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
    };

    radioChangeHandler = event => {
        this.setState({radioValue: event.target.value});
    };

    render() {
        const {classes} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        const {tabValue} = this.state;

        console.log(this.state);

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

                                            {/* existing address */}
                                            {tabValue === 0 &&
                                                <TabContainer>
                                                    foo
                                                </TabContainer>
                                            }

                                            {/* new address */}
                                            {tabValue === 1 &&
                                                <TabContainer>

                                                    {/* new address - flat/building no */}
                                                    <FormControl required>
                                                        <InputLabel htmlFor='flatBuildingNo'>Flat / Building No.</InputLabel>
                                                        <Input
                                                            id='flatBuildingNo'
                                                            type='text'
                                                            flatbuildingno={this.state.flatBuildingNo}
                                                            value={this.state.flatBuildingNo}
                                                            onChange={this.flatBuildingNoChangeHandler}
                                                        />
                                                        <FormHelperText className={this.state.flatBuildingNoRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    {/* new address - locality */}
                                                    <FormControl required>
                                                        <InputLabel htmlFor='locality'>Locality</InputLabel>
                                                        <Input
                                                            id='locality'
                                                            type='text'
                                                            locality={this.state.locality}
                                                            value={this.state.locality}
                                                            onChange={this.localityChangeHandler}
                                                        />
                                                        <FormHelperText className={this.state.localityRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    {/* new address - city */}
                                                    <FormControl required>
                                                        <InputLabel htmlFor='city'>City</InputLabel>
                                                        <Input
                                                            id='city'
                                                            type='text'
                                                            city={this.state.city}
                                                            value={this.state.city}
                                                            onChange={this.cityChangeHandler}
                                                        />
                                                        <FormHelperText className={this.state.cityRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    {/* new address - state */}
                                                    <FormControl required className={classes.newAddressFormControl}>
                                                        <InputLabel htmlFor='newAddressstate'>State</InputLabel>
                                                        <Select
                                                            id='newAddressstate'
                                                            newaddressstate={this.state.newAddressState}
                                                            value={this.state.newAddressState}
                                                            onChange={this.stateChangeHandler}
                                                        >
                                                            {this.state.states.map(state => (
                                                                <MenuItem key={'state' + state.id} value={state.state_name}>
                                                                    {state.state_name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <FormHelperText className={this.state.stateRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>
                                                    <br /><br />

                                                    <FormControl required>
                                                        <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                                                        <Input
                                                            id='pincode'
                                                            type='text'
                                                            pincode={this.state.pincode}
                                                            value={this.state.pincode}
                                                            onChange={this.pincodeChangeHandler}
                                                        />
                                                        <FormHelperText className={this.state.pincodeRequired} error={true}>
                                                            <span>required</span>
                                                        </FormHelperText>
                                                    </FormControl>


                                                </TabContainer>
                                            }
                                        </div>
                                        : ''
                                    }

                                    {index === 1 ?
                                        <div className={classes.radioRoot}>
                                            <FormControl component='fieldset' className={classes.radioFormControl}>
                                                <FormLabel component='legend'>Select Mode of Payment</FormLabel>
                                                <RadioGroup
                                                    aria-label='paymentModes'
                                                    name='paymentModes'
                                                    className={classes.radioGroup}
                                                    value={this.state.radioValue}
                                                    onChange={this.radioChangeHandler}
                                                >
                                                    {this.state.paymentModes.map(paymentMode => (
                                                        <FormControlLabel
                                                            key={'paymentMode' + paymentMode.id}
                                                            value={paymentMode.payment_name.toLowerCase()}
                                                            control={<Radio />}
                                                            label={paymentMode.payment_name}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>

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
