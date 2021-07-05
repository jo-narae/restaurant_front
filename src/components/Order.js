import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import OrderStep from './order/OrderStep';

import '../css/order.css';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: ['테이블 선택', '요리사 선택', '메뉴 선택', '주문 확인', '주문 결과'],
      activeStep: 0,
    };
  }

  setActiveStep(activeStep) {
    this.setState(state =>({
      ...state,
      activeStep
    }));
  }

  render() {
    const setActiveStep = this.setActiveStep.bind(this);

    return (
      <>
        <h3>주문 하기</h3>
        <Stepper alternativeLabel activeStep={this.state.activeStep}>
          {this.state.steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <OrderStep activeStep={this.state.activeStep} setActiveStep={setActiveStep} />
      </>
    );
  }
}

export default Order;