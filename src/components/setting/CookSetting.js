import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    CooksList,
} from '../../libs/api';

class CookSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cooks: [],
    };
  }

  async componentDidMount() {
    const cooks = await CooksList();

    this.setState({
      cooks,
    });
  }

  render() {
    return (
      <>
        <h3>요리사 정보</h3>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>아이디</TableCell>
                <TableCell>이름</TableCell>
                <TableCell align="right">성</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.cooks.map((cook, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row">
                    {cook.id}
                  </TableCell>
                  <TableCell align="right">{cook.firstName}</TableCell>
                  <TableCell align="right">{cook.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default CookSetting;