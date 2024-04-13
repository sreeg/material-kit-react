import React from 'react';
import Switch from '../common/Switch';
import Curtain from '../common/Curtain';
import Zone from '../common/Zone';
import Fan from '../common/Fan';
import { mdiAirConditioner, mdiLedStripVariant, mdiCoachLamp, mdiWaterBoiler, mdiStringLights, mdiTelevision } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { decodeHtml } from '../../../utils/commons';

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

  handleColor = (e, v) => {
    switch (v) {
      case 1:
        v = 0;
        break;
      case 2:
        v = 25;
        break;
      case 3:
        v = 50;
        break;
      case 4:
        v = 75;
        break;
      case 5:
        v = 100;
        break;
    }
    fetch(gateway + '/mcolor/' + v).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/mbrightness/' + v * 20).then((response) => response.json());
  };
  handlelAcON = (e) => {
    fetch(gateway + '/BAC/on').then((response) => response.json());
  };

  handlelAcOFF = (e) => {
    fetch(gateway + '/BAC/off').then((response) => response.json());
  };
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
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardContent >
                <Grid pb={3} container spacing={2}>
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
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px', background: "#303134" }}>
                        <Typography sx={{ fontSize: 14 }} color="text.white" gutterBottom>
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.mcolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px', background: "#303134" }}>
                        <Typography sx={{ fontSize: 14 }} color="text.white" gutterBottom>
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.mbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid pb={3} container spacing={2}>
                  <Grid item>
                    <Switch sVal={this.state.mwalllamp} sID="mwalllamp" sIcon={mdiCoachLamp} sName="Wall lamp" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.mtvunderlight} sID="mtvunderlight" sIcon={mdiLedStripVariant} sName="TV under light" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.mtv} sID="mtv" sIcon={mdiTelevision} sName="TV" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  {/* <Grid item>
                    <Switch sVal={this.state.mlight2} sID="mlight2" sIcon={mdiLightbulbVariantOutline} sName="Light 2" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.mlight3} sID="mlight3" sIcon={mdiLightbulbVariantOutline} sName="Light 3" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.mlight4} sID="mlight4" sIcon={mdiLightbulbVariantOutline} sName="Light 4" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid> */}
                  <Grid item>
                    <Switch sVal={this.state.mgyser} sID="mgyser" sIcon={mdiWaterBoiler} sName="Gyser" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item>
                    <Curtain sVal={this.state.mblackout} sID="mblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Fan sVal={this.state.mfan} sFval={this.state.mfanspeed} sID="mfan" sIDFS="mfanspeed" sName="Fan" stateHandler={stateHandler.bind(this)} />
                  </Grid>
                  <Grid item>
                    <Card sx={{ minWidth: 100, mb: 2 }}>
                      <CardContent style={{ display: 'flex', alignItems: 'center', background: "#303134" }}>
                        <Button style={{ height: 50 }} variant="outlined" onClick={this.handlelAcON} size="large" color="secondary" disableFocusRipple={true}>
                          <div className="content">
                            <div>ON</div>
                          </div>
                        </Button>
                        <Icon style={{ marginLeft: 16, marginRight: 16 }} path={mdiAirConditioner} size={2} />
                        <Button style={{ height: 50 }} variant="outlined" onClick={this.handlelAcOFF} size="large" color="secondary" disableFocusRipple={true}>
                          <div className="content">
                            <div>OFF</div>
                          </div>
                        </Button>
                      </CardContent>
                    </Card>
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
