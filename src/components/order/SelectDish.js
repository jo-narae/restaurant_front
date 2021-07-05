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
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

import { DishesList } from '../../libs/api';

import '../../css/order.css';

class SelectDish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      selectDishes: [],
      totalPrice: 0
    };
  }

  async componentDidMount() {
    const dishes = await DishesList();

    this.setState(state => ({
      ...state,
      dishes,
    }));
  }

  nextStep(state) {
    if (!state.selectDishes.length) {
      alert('메뉴를 선택해주세요.');
      return;
    }

    this.props.setDishes(state.selectDishes, state.totalPrice);
    this.props.setActiveStep(3);
  }

  selectDishFunc(origin, dish) {
    let existDish = false;
    const selectDishes = origin.map(item => {
      if (item.id === dish.id) {
        existDish = true;
        item.quantity++;
      }
      return item;
    });
    if (!existDish) selectDishes.push({ ...dish, quantity: 1 });

    this.setState(state => ({
      ...state,
      selectDishes,
    }));

    this.totalPrice(selectDishes);
  }

  removeDishFunc(origin, dish) {
    let selectDishes = origin.map(item => {
      if (item.id === dish.id) {
        item.quantity--;
      }
      if (item.quantity <= 0) { return null }
      return item;
    });

    selectDishes = selectDishes.filter(item => item)

    this.setState(state => ({
      ...state,
      selectDishes,
    }));

    this.totalPrice(selectDishes);
  }

  totalPrice(origin) {
    let totalPrice = 0;
    origin.forEach(item => {
      totalPrice += item.price * item.quantity;
    });

    this.setState(state => ({
      ...state,
      totalPrice,
    }));
  }

  render(){
      return (
        <>
          <h4>메뉴 선택</h4>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <List subheader={<ListSubheader>선택항목</ListSubheader>}>
                {this.state.selectDishes.map((value) => {
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
                        <IconButton edge="end" onClick={this.removeDishFunc.bind(this, this.state.selectDishes, value)}>
                          <RemoveIcon />
                        </IconButton>
                        <IconButton edge="end">
                          { value.quantity }
                        </IconButton>
                        <IconButton edge="end" onClick={this.selectDishFunc.bind(this, this.state.selectDishes, value)}>
                          <AddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
                <Divider />
                <div className="flex-end">
                  <Typography variant="h5" component="h2">
                    총 금액 : $ { this.state.totalPrice }
                  </Typography>
                </div>
              </List>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                {this.state.dishes.map(dish => (
                  <Grid item xs={6} key={dish.id}>
                    <Button onClick={this.selectDishFunc.bind(this, this.state.selectDishes, dish)}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {dish.name}
                          </Typography>
                          <Typography variant="h5" component="h3">
                            ${dish.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Button>
                  </Grid>
                ))}
              </Grid>
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

export default SelectDish;