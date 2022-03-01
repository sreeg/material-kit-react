import React from 'react';
import Switch from '../common/Switch';
import Curtain from '../common/Curtain';
import Zone from '../common/Zone';
import Fan from '../common/Fan';
import { mdiLightbulbVariantOutline, mdiCurtains, mdiCurtainsClosed, mdiWaterBoiler, mdiStringLights } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import {decodeHtml } from '../../../utils/commons';

const gateway = 'http://192.168.88.122:1880';
class BedRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mfan: 'OFF',
      mlight2: 'OFF',
      olight3: 'OFF',
      olight4: 'OFF',
      mcenterzone: 'OFF',
      maczone: 'OFF',
      mwardrobe: 'OFF',
      mfanspeed: 5,
      mcolor: 5,
      mbrightness: 5,
      mblackout: 'CLOSE',
      mgyser: 'OFF'
    };
  }

  stateHandler(obj, val) {
    this.setState({
      [obj]: val
    });
  }

  handleColor = (e, v) => {
    fetch(gateway + '/mcolor/' + v * 20).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/mbrightness/' + v * 20).then((response) => response.json());
  };

  componentDidMount() {
    var that = this;
    fetch(gateway + '/mgyserstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mgyser: data['2'].power });
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
        this.setState({ mcenterzone: data['5'].power });
        this.setState({ mwardrobe: data['7'].power });
        this.setState({ maczone: data['3'].power });
      });
    fetch(gateway + '/mboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ mfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ mfanspeed: Math.round(speed / 20) });
        this.setState({ mlight2: data['2'].power });
        this.setState({ olight3: data['3'].power });
        this.setState({ olight4: data['4'].power });
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
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Zones"
              />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
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
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.mcolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.mbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Switches"
              />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Switch sVal={this.state.olight3} sID="olight3" sIcon={mdiLightbulbVariantOutline} sName="Light 3" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.olight4} sID="olight4" sIcon={mdiLightbulbVariantOutline} sName="Light 4" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.olight5} sID="olight5" sIcon={mdiLightbulbVariantOutline} sName="Light 5" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.olight6} sID="olight6" sIcon={mdiLightbulbVariantOutline} sName="Light 6" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.olight6} sID="olight7" sIcon={mdiLightbulbVariantOutline} sName="Light 7" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.mgyser} sID="mgyser" sIcon={mdiWaterBoiler} sName="Gyser" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader title="Curtains & fan" />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Curtain sVal={this.state.mblackout} sID="mblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Fan sVal={this.state.mfan} sFval={this.state.mfanspeed} sID="mfan" sIDFS="mfanspeed" sName="Fan" stateHandler={stateHandler.bind(this)}/>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </>
    );
  }
}
export default BedRoom;
