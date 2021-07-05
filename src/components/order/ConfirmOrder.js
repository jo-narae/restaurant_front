import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

import { orderRequest } from '../../libs/api';

import '../../css/order.css';

class ConfirmOrder extends Component {
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

  componentDidMount() {
    this.setState(this.props.getConfirm);
  }

  async nextStep(state) {
    const dishArr = state.dishes.map(dish => ({ ...dish, dishId: dish.id }));
    await orderRequest({
      ...state,
      dishes: dishArr
    })
    .then(() => this.props.setActiveStep(4))
    .catch(err => alert('정상적으로 수행되지 않았습니다. 다시 시도해주세요.'));
  }

  render(){
      return (
        <>
          <h4>메뉴 확인</h4>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  Cook : {this.state.cookName} <br />
                  Tablet : {this.state.tabletLocation}
                </CardContent>
                <Divider />
                <CardContent>
                  <List subheader={<ListSubheader>선택항목</ListSubheader>}>
                    {this.state.dishes.map((value) => {
                      return (
                        <ListItem key={value.id} role={undefined} dense button>
                          <ListItemText>
                            <Typography variant="h5" component="h2">
                              {value.name}
                            </Typography>
                            <Typography variant="h5" component="h3">
                              ${value.price}
                            </Typography>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Typography variant="h5" component="h2">
                              { value.quantity }개
                            </Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
                <Divider />
                <CardContent>
                  <div className="flex-end">
                    <Typography variant="h5" component="h3">
                      총 금액 : $ { this.state.totalPrice }
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container className="mt40">
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="outlined">
                  이전
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={this.nextStep.bind(this, this.state)}>
                  다음
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )
  }
}

export default ConfirmOrder;