import React from 'react';
import Switch from '../common/Switch';
import Zone from '../common/Zone';
import { mdiCoachLamp, mdiStringLights } from '@mdi/js';
import Grid from '@mui/material/Grid';
import { decodeHtml } from '../../../utils/commons';
import ColorAndBrightness from '../common/ColorAndBrightness';

const gateway = 'http://192.168.88.122:1880';
class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      kicenterzone: 'OFF',
      kiwalllamp: 'OFF',
      kiservicelight: 'OFF',
      kicolor: 5,
      kibrightness: 5
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  componentDidMount() {
    var that = this;
    fetch(gateway + '/kiboardmainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));

        var speed = data['1'].speed;
        this.setState({ kbrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ kicolor: Math.round(speed / 20) });
        this.setState({ kicenterzone: data['3'].power });
      });
    fetch(gateway + '/kiboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        console.log(data);
        this.setState({ kiservicelight: data['2'].power });
        this.setState({ kiwalllamp: data['3'].power });
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
            <Grid pb={3} container spacing={2}>
              <Grid item>
                <ColorAndBrightness cDefaultValue={this.state.kicolor} bDefaultValue={this.state.kibrightness} sColor="kicolor" sBrightness="kibrightness" stateHandler={stateHandler.bind(this)} />
              </Grid>
              <Grid item>
                <Zone sVal={this.state.kicenterzone} zoneClass="zone23 zone23center" sID="kicenterzone" sIcon={mdiStringLights} sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
              </Grid>

            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Switch sVal={this.state.kiwalllamp} sID="kiwalllamp" sIcon={mdiCoachLamp} sName="Wall lamp" stateHandler={stateHandler.bind(this)}></Switch>
              </Grid>
              <Grid item>
                <Switch sVal={this.state.kiservicelight} sID="kiservicelight" sIcon={mdiStringLights} sName="Service balcony" stateHandler={stateHandler.bind(this)}></Switch>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}
export default Kitchen;
