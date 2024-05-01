import { Box, Grid, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Page from '../components/Page';
import React from 'react';
import Scenes from '../components/_dashboard/Scenes';
import Temperature from '../components/_dashboard/temperature';
import DoorSensor from '../components/_dashboard/doorsensors';
import NTabs from './../components/NavSectionTab';
import sidebarConfig from './../layouts/dashboard/SidebarConfig';
import Fan from '../components/_dashboard/common/Fan';
import Switch from '../components/_dashboard/common/Switch';
import { mdiWaterBoiler } from '@mdi/js';
import { decodeHtml } from './../utils/commons';

const gateway = 'http://192.168.88.122:1880';

class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mfan: 'OFF',
      mfanspeed: 5,
      kfan: 'OFF',
      kfanspeed: 5,
      lfan: 'OFF',
      lfanspeed: 5,
      dfan: 'OFF',
      dfanspeed: 5,
      ofan: 'OFF',
      ofanspeed: 5,
      mgyser: 'OFF',
      kgyser: 'OFF',
      ogyser: 'OFF',
      updateTimer: 0
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  routeChange(e) {
    window.location.href = '/dashboard/' + e;
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }
  componentDidMount() {
    this.updateTimer = setInterval(() => window.location.reload(), 300000);
    var that = this;
    fetch(gateway + '/ogyserstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ ogyser: data['2'].power });
      });
    fetch(gateway + '/mgyserstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mgyser: data['2'].power });
      });
    fetch(gateway + '/kgyserstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ kgyser: data['8'].power });
      });
    fetch(gateway + '/oboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ ofan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ ofanspeed: Math.round(speed / 20) });
      });
    fetch(gateway + '/lacboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        var speed = data['1'].speed;
        this.setState({ lfanspeed: Math.round(speed / 20) });
        this.setState({ lfan: data['1'].power });
      });
    fetch(gateway + '/dboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        this.setState({ dfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ dfanspeed: Math.round(speed / 20) });
      });
    fetch(gateway + '/kboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ kfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ kfanspeed: Math.round(speed / 20) });
      });
    fetch(gateway + '/mboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ mfanspeed: Math.round(speed / 20) });
        this.setState({ loading: false });
      });
  }

  render() {
    var stateHandler = this.stateHandler;
    return (
      <Page title="Myhome E302">
        <Container maxWidth="xl">
          <Box sx={{ pb: 0 }}>
            <Typography variant="h4">Welcome, E302!</Typography>
          </Box>
          <NTabs navConfig={sidebarConfig} style={{ marginBottom: 24 }} />
          <Grid container pb={2} spacing={2}>
            <Grid item xs={12}>
              <Card >
                <CardContent style={{ background: "#303134" }}>
                  <Temperature room="living" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card >
                <CardContent style={{ background: "#303134" }}>
                  <DoorSensor room="Main balcony" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card >
                <CardContent style={{ background: "#303134" }}>
                  <DoorSensor room="Service balcony" />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <>
            {this.state.loading ? (
              <div>Loading</div>
            ) : (
              <>
                <Grid pb={2} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Fan sVal={this.state.dfan} sFval={this.state.dfanspeed} sID="ofan" sIDFS="dfanspeed" sName="Drawing" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.mfan} sFval={this.state.mfanspeed} sID="mfan" sIDFS="mfanspeed" sName="Bedroom" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.lfan} sFval={this.state.lfanspeed} sID="lfan" sIDFS="lfanspeed" sName="Living" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.kfan} sFval={this.state.kfanspeed} sID="kfan" sIDFS="kfanspeed" sName="Kids" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.ofan} sFval={this.state.ofanspeed} sID="ofan" sIDFS="ofanspeed" sName="Office" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid pb={2} sm={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Switch sVal={this.state.mgyser} sID="mgyser" sIcon={mdiWaterBoiler} sName="Bedroom" stateHandler={stateHandler.bind(this)}></Switch>
                    </Grid>
                    <Grid item>
                      <Switch sVal={this.state.kgyser} sID="kgyser" sIcon={mdiWaterBoiler} sName="Kids" stateHandler={stateHandler.bind(this)}></Switch>
                    </Grid>
                    <Grid item>
                      <Switch sVal={this.state.ogyser} sID="ogyser" sIcon={mdiWaterBoiler} sName="Office" stateHandler={stateHandler.bind(this)}></Switch>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </>
          <Grid sm={12}>
            <Scenes />
          </Grid>
      </Container>
      </Page >
    );
  }
}
export default DashboardApp;
