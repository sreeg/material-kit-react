import React from 'react';
import Switch from '../common/Switch';
import Curtain from '../common/Curtain';
import Zone from '../common/Zone';
import Fan from '../common/Fan';
import { mdiLedStripVariant, mdiCoachLamp, mdiWaterBoiler, mdiStringLights, mdiTelevision } from '@mdi/js';
import Grid from '@mui/material/Grid';
import { decodeHtml } from '../../../utils/commons';
import AC from '../common/AC';
import ColorAndBrightness from '../common/ColorAndBrightness';

const gateway = 'http://192.168.88.122:1880';
class BedRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mfan: 'OFF',
      mlight2: 'OFF',
      mlight3: 'OFF',
      mlight4: 'OFF',
      mcenterzone: 'OFF',
      maczone: 'OFF',
      mwardrobe: 'OFF',
      mwalllamp: 'OFF',
      mtv: 'OFF',
      mtvunderlight: 'OFF',
      mfanspeed: 5,
      mcolor: 5,
      mbrightness: 5,
      mblackout: 'CLOSE',
      mgyser: 'OFF',
      updateTimer: 0
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }
  componentDidMount() {
    this.updateTimer = setInterval(() => window.location.reload(), 300000);
    var that = this;
    fetch(gateway + '/mgyserstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mgyser: data['2'].power });
      });
    fetch(gateway + '/mentrancestatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mwalllamp: data['1'].power });
        this.setState({ mwtvunderlight: data['2'].power });
      });
    fetch(gateway + '/mblackoutcurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mblackout: data['1'].curtain });
      });
    fetch(gateway + '/mboardmainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        var speed = data['1'].speed;
        this.setState({ mbrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ mcolor: Math.round(speed / 20) });
        this.setState({ maczone: data['5'].power });
        this.setState({ mcenterzone: data['3'].power });
        this.setState({ mwardrobe: data['7'].power });
      });
    fetch(gateway + '/mtvboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mtv: data['2'].power });
        this.setState({ mtvunderlight: data['3'].power });
        this.setState({ loading: false });
      });
    fetch(gateway + '/mboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ mfanspeed: Math.round(speed / 20) });
        this.setState({ mlight2: data['2'].power });
        this.setState({ mlight3: data['3'].power });
        this.setState({ mlight4: data['4'].power });
        this.setState({ loading: false });
      });
  }
  render() {
    var stateHandler = this.stateHandler;
    return (
      <>
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <>
            <Grid pb={2} container spacing={2}>
              <Grid item>
                <ColorAndBrightness cDefaultValue={this.state.mcolor} bDefaultValue={this.state.mbrightness} sColor="mcolor" sBrightness="mbrightness" stateHandler={stateHandler.bind(this)} />
              </Grid>
              <Grid item>
                <Zone sVal={this.state.maczone} zoneClass="zone23 zone23top" sID="maczone" sIcon={mdiStringLights} sName="AC" stateHandler={stateHandler.bind(this)}></Zone>
              </Grid>
              <Grid item>
                <Zone sVal={this.state.mcenterzone} zoneClass="zone23 zone23center" sID="mcenterzone" sIcon={mdiStringLights} sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
              </Grid>
              <Grid item>
                <Zone sVal={this.state.mwardrobe} zoneClass="zone23 zone23center" sID="mwardrobe" sIcon={mdiStringLights} sName="Wardrobe" stateHandler={stateHandler.bind(this)}></Zone>
              </Grid>
              <Grid item>
                <Fan sVal={this.state.mfan} sFval={this.state.mfanspeed} sID="mfan" sIDFS="mfanspeed" sName="Fan" stateHandler={stateHandler.bind(this)} />
              </Grid>
            </Grid>

            <Grid pb={2} container spacing={2}>
              <Grid item>
                <Switch sVal={this.state.mwalllamp} sID="mwalllamp" sIcon={mdiCoachLamp} sName="Wall lamp" stateHandler={stateHandler.bind(this)}></Switch>
              </Grid>
              <Grid item>
                <Switch sVal={this.state.mtvunderlight} sID="mtvunderlight" sIcon={mdiLedStripVariant} sName="TV under light" stateHandler={stateHandler.bind(this)}></Switch>
              </Grid>
              <Grid item>
                <Switch sVal={this.state.mtv} sID="mtv" sIcon={mdiTelevision} sName="TV" stateHandler={stateHandler.bind(this)}></Switch>
              </Grid>
              <Grid item>
                <Switch sVal={this.state.mgyser} sID="mgyser" sIcon={mdiWaterBoiler} sName="Gyser" stateHandler={stateHandler.bind(this)}></Switch>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item>
                <Curtain sVal={this.state.mblackout} sID="mblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item>
                <AC sVal={this.state.temp} sID="BAC" sName="BAC" stateHandler={stateHandler.bind(this)} />
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}
export default BedRoom;
