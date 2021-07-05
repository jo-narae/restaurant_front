import React, { Component } from 'react';

import SelectTablet from './SelectTablet';
import SelectCook from './SelectCook';
import SelectDish from './SelectDish';
import ConfirmOrder from './ConfirmOrder';
import ResultOrder from './ResultOrder';

class OrderStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabletId: null,
      tabletLocation: null,
      cookId: null,
      cookName: null,
      dishes: [],
      totalPrice: 0
    };
  }

  setTablet(tabletId, tabletLocation) {
    this.setState(state =>({
      ...state,
      tabletId,
      tabletLocation
    }));
  }

  setCook(cookId, cookName) {
    this.setState(state =>({
      ...state,
      cookId,
      cookName
    }));
  }

  setDishes(dishes, totalPrice) {
    this.setState(state =>({
      ...state,
      dishes,
      totalPrice
    }));
  }

  setActiveStep(activeStep) {
    this.props.setActiveStep(activeStep);
  }

  render() {
    const setTablet = this.setTablet.bind(this);
    const setCook = this.setCook.bind(this);
    const setDishes = this.setDishes.bind(this);
    const setActiveStep = this.setActiveStep.bind(this);

    if(this.props.activeStep === 0) {
      return <SelectTablet setTablet={setTablet} setActiveStep={setActiveStep} />
    } else if(this.props.activeStep === 1) {
      return <SelectCook setCook={setCook} setActiveStep={setActiveStep} />
    } else if(this.props.activeStep === 2) {
      return <SelectDish setDishes={setDishes} setActiveStep={setActiveStep} />
    } else if(this.props.activeStep === 3) {
      return <ConfirmOrder getConfirm={this.state} setActiveStep={setActiveStep} />
    } else {
      return <ResultOrder setActiveStep={setActiveStep} />
    }
  }
}

export default OrderStep;