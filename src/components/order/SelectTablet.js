import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { TabletsList } from '../../libs/api';

import '../../css/order.css';

class SelectTablet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablets: [],
      selectId: null,
    };
  }

  async componentDidMount() {
    const tablets = await TabletsList();

    this.setState(state => ({
      ...state,
      tablets,
    }));
  }

  selectTabletFunc = (id, location) => {
    this.setState(state => ({
      ...state,
      selectId: id,
    }));
    this.props.setTablet(id, location);
  }

  nextStep(selectId) {
    if (!selectId) {
      alert('타블렛을 선택해주세요.');
      return;
    }
    this.props.setActiveStep(1);
  }

  render(){
      return (
        <>
          <h4>타블렛 선택</h4>
          <Grid container spacing={1}>
            {this.state.tablets.map(tablet => (
              <Grid className={this.state.selectId === tablet.id ? 'active' : ''} item xs={3} key={tablet.id}>
                <Button onClick={this.selectTabletFunc.bind(this, tablet.id, tablet.location)}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {tablet.location}
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

export default SelectTablet;