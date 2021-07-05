import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {
    TabletsList,
    TabletSave,
    TabletUpdate
} from '../../libs/api';

class TabletSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablets: [],
      tabletLocation: '',
    };
  }

  setTabletLocation(tabletLocation) {
    this.setState(state =>({
        ...state,
        tabletLocation
    }));
  }

  async insertTablet(tabletLocation) {
    await TabletSave({ tabletLocation })
    .then(async () => {
        const tablets = await TabletsList();
        this.setState(current => ({
            ...current,
            tabletLocation: '',
            tablets,
        }));
    })
    .catch(() => alert('정상적으로 처리되지 않았습니다.'));
  }

  setTablet(tablet, tabletLocation) {
    const tabletsArr = this.state.tablets.map(item => {
        if(item.id === tablet.id) return { ...tablet, tabletLocation };
        else return item;
    })

    this.setState(current => ({
        ...current,
        tablets: tabletsArr,
    }));
  }

  async updateTablet(tablet) {
    await TabletUpdate(tablet)
    .then(async () => {
        const tablets = await TabletsList();
        this.setState(current => ({
            ...current,
            tablets,
        }));
    })
    .catch(() => alert('정상적으로 처리되지 않았습니다.'));
  }

  async componentDidMount() {
    const tablets = await TabletsList();

    this.setState({
      tablets
    });
  }

  render() {
    return (
      <>
        <h3>타블렛 정보</h3>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>아이디</TableCell>
                <TableCell>위치</TableCell>
                <TableCell>수정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.tablets.map((tablet, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {tablet.id}
                  </TableCell>
                  <TableCell>
                      <TextField label="location"
                        value={tablet.tabletLocation}
                        onChange={e => this.setTablet(tablet, e.target.value)} />
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" 
                        onClick={() => this.updateTablet(tablet)}>
                        수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container spacing={2}>
            <Grid item>
                <TextField id="tabletLocation" label="location"
                onChange={e => this.setTabletLocation(e.target.value)} />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" 
                    onClick={() => this.insertTablet(this.state.tabletLocation)}>
                    입력
                </Button>
            </Grid>
        </Grid>
      </>
    );
  }
}

export default TabletSetting;