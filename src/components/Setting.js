import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TabletSetting from './setting/TabletSetting';
import CookSetting from './setting/CookSetting';
import DishSetting from './setting/DishSetting';

class Setting extends Component {
  render() {
    return (
      <>
        <TabletSetting />
        <DishSetting />
        <CookSetting />
      </>
    );
  }
}

export default Setting;