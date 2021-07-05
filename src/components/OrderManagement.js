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
import Chip from '@material-ui/core/Chip';

import { currentOrderList, orderStateChange, orderDelete } from '../libs/api';

import '../css/management.css';

class ChangeButton extends Component {

  propsEventHandler(id, state) {
    this.props.orderStateChange(id, state);
  }

  render() {
    if(this.props.state === 'READY') {
      return (
        <Button variant="outlined" color="primary" onClick={this.propsEventHandler.bind(this, this.props.id, 'COOKING')}>
          주문 승인
        </Button>
      )
    } else {
      return (
        <Button variant="outlined" color="primary" onClick={this.propsEventHandler.bind(this, this.props.id, 'PLACED')}>
          주문 완료
        </Button>
      )
    }
  }
}

class OrderManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.getCurrentOrderList();
  }

  async getCurrentOrderList() {
    const orders = await currentOrderList();

    this.setState(state => ({
      ...state,
      orders,
    }));
  }

  async orderStateChange(id, state) {
    await orderStateChange(id, { state })
    .then(() => {
      alert('정상적으로 처리되었습니다.');
      this.getCurrentOrderList();
    })
    .catch(() => alert('정상적으로 처리되지 않았습니다. \n 다시 시도해주세요.'))
  }

  async orderStateDelete(id) {
    await orderDelete(id)
    .then(() => {
      alert('정상적으로 처리되었습니다.');
      this.getCurrentOrderList();
    })
    .catch(() => alert('정상적으로 처리되지 않았습니다. \n 다시 시도해주세요.'))
  }
  

  render() {
    return (
      <>
        <Grid container spacing={1}>
            {this.state.orders.map(order => (
              <Grid item xs={4} key={order.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      주문 번호 {order.id}
                    </Typography>
                    <Chip label={order.state} color="primary" />
                  </CardContent>
                  <Divider />
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Cook : {order.cooks.firstName}
                    </Typography> <br />
                    <Typography variant="h6" component="h2">
                    Tablet : {order.tablets.location}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <List subheader={<ListSubheader>선택항목</ListSubheader>}>
                      {order.orderDishes.map((value) => {
                        return (
                          <ListItem key={value.id} role={undefined} dense button>
                            <ListItemText>
                              <Typography variant="h5" component="h2">
                                {value.dishes.name}
                              </Typography>
                              <Typography variant="h5" component="h3">
                                ${value.dishes.price}
                              </Typography>
                            </ListItemText>
                            <ListItemSecondaryAction edge="end">
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
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button variant="outlined" color="secondary" onClick={this.orderStateDelete.bind(this, order.id)}>
                        주문 취소
                      </Button>
                    </Grid>
                    <Grid item>
                      <ChangeButton id={order.id} state={order.state} orderStateChange={this.orderStateChange.bind(this)} />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
      </>
    )
  }
}

export default OrderManagement;