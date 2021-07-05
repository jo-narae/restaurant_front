import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { CooksList } from '../../libs/api';

import '../../css/order.css';

class SelectCook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cooks: [],
      selectId: null,
    };
  }

  async componentDidMount() {
    const cooks = await CooksList();

    this.setState(state => ({
      ...state,
      cooks,
    }));
  }

  selectCookFunc = (id, name) => {
    this.setState(state => ({
      ...state,
      selectId: id,
    }));
    this.props.setCook(id, name);
  }

  nextStep(selectId) {
    if (!selectId) {
      alert('요리사를 선택해주세요.');
      return;
    }
    this.props.setActiveStep(2);
  }

  render(){
      return (
        <>
          <h4>요리사 선택</h4>
          <Grid container spacing={1}>
            {this.state.cooks.map(cook => (
              <Grid className={this.state.selectId === cook.id ? 'active' : ''} item xs={3} key={cook.id}>
                <Button onClick={this.selectCookFunc.bind(this, cook.id, cook.firstName + ' ' + cook.lastName)}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {cook.firstName} {cook.lastName}
                      </Typography>
                    </CardContent>
                  </Card>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container className="mt40">
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="outlined">
                  이전
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={this.nextStep.bind(this, this.state.selectId)}>
                  다음
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )
  }
}

export default SelectCook;