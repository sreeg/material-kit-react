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
      ogyser: 'OFF'
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

  render() {
    var stateHandler = this.stateHandler;
    return (
      <Page title="Myhome E302">
        <Container maxWidth="xl">
          <Box sx={{ pb: 1 }}>
            <Typography variant="h4">Welcome, E302!</Typography>
          </Box>
          <NTabs navConfig={sidebarConfig} style={{ marginBottom: 24 }} />
          <Grid container spacing={2}>
            <Grid item>
              <Card >
                <CardContent style={{ background: "#303134" }}>
                  <Temperature room="living" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card >
                <CardContent style={{ background: "#303134" }}>
                  <DoorSensor room="Balcony" />
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
            <Grid sm={12}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Fan sVal={this.state.dfan} sFval={this.state.dfanspeed} sID="ofan" sIDFS="dfanspeed" sName="Drawing" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.mfan} sFval={this.state.mfanspeed} sID="mfan" sIDFS="mfanspeed" sName="Bedroom" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.lfan} sFval={this.state.lfanspeed} sID="lfan" sIDFS="ofanspeed" sName="Living" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                    <Grid item>
                      <Fan sVal={this.state.kfan} sFval={this.state.kfanspeed} sID="kfan" sIDFS="kfanspeed" sName="Kids" stateHandler={stateHandler.bind(this)} />
                    </Grid>                    
                    <Grid item>
                      <Fan sVal={this.state.ofan} sFval={this.state.ofanspeed} sID="ofan" sIDFS="ofanspeed" sName="Office" stateHandler={stateHandler.bind(this)} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid sm={12}>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>
            <Grid sm={12}>
              <Card>
                <CardContent>
                  <Scenes />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  }
}
export default DashboardApp;
