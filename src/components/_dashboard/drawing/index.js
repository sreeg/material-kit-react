import React from 'react';
import Switch from './../common/Switch';
import Zone from './../common/Zone';
import Fan from './../common/Fan';
import Curtain from './../common/Curtain';
import { mdiMovieOpen, mdiLedStripVariant, mdiWallSconceFlat, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights, mdiCheckboxBlankCircleOutline, mdiCircle } from '@mdi/js';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Icon from '@mdi/react';
import { decodeHtml } from './../../../utils/commons';

const gateway = 'http://192.168.88.122:1880';
class OfficeRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dfan: 'OFF',
      dcurtainlight: 'OFF',
      dwallwasher: 'OFF',
      dgovee: 'OFF',
      dwalllamp: 'OFF',
      dtv: 'OFF',
      dcenterzone: 'OFF',
      dhallway: 'OFF',
      dtvzone: 'OFF',
      dfanspeed: 5,
      dcolor: 5,
      dbrightness: 5,
      dsheer: 'CLOSE',
      dblackout: 'CLOSE',
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
    fetch(gateway + '/dcolor/' + v).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/dbrightness/' + v * 20).then((response) => response.json());
  };

  handleMovieMode = (e) => {
    fetch(gateway + '/movietime/').then((response) => response.json());
  };
  componentWillUnmount(){
    clearInterval(this.updateTimer);
  }
  componentDidMount() {
    this.updateTimer = setInterval(() => window.location.reload(), 300000);
    var that = this;
    fetch(gateway + '/dsheercurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        //console.log('dsheercurtainstatus : ' + decodeHtml(data));
        data = JSON.parse(decodeHtml(data));
        this.setState({ dsheer: data['1'].curtain });
      });
    fetch(gateway + '/dblackoutcurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        //console.log('dblackoutcurtainstatus : ' + decodeHtml(data));
        data = JSON.parse(decodeHtml(data));
        this.setState({ dblackout: data['1'].curtain });
      });
    fetch(gateway + '/dboardmainstatus')
      .then((response) => response.text())
      .then((data) => {
        //console.log(decodeHtml(data));
        data = decodeHtml(data);
        data = JSON.parse(data);
        var speed = data['1'].speed;
        this.setState({ dbrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ dcolor: Math.round(speed / 20) });
        this.setState({ dcenterzone: data['3'].power });
        this.setState({ dtvzone: data['5'].power });
        this.setState({ dhallway: data['7'].power });
      });
    fetch(gateway + '/dboardstatus')
      .then((response) => response.text())
      .then((data) => {
        //console.log(decodeHtml(data));
        data = decodeHtml(data);
        data = JSON.parse(data);
        this.setState({ dfan: data['1'].power });
        var speed = data['1'].speed;
        this.setState({ dfanspeed: Math.round(speed / 20) });
        this.setState({ dgovee: data['2'].power });
        this.setState({ dwalllamp: data['4'].power });
        this.setState({ dcurtainlight: data['5'].power });
        this.setState({ dwallwasher: data['6'].power });
        this.setState({ dtv: data['8'].power });
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
              <CardContent>
                <Grid container pb={3} spacing={2}>
                  <Grid item>
                    <Zone sVal={this.state.dhallway} zoneClass="zone33 zone33left" sID="dhallway" sIcon={mdiStringLights} sName="Hallway" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.dtvzone} zoneClass="zone33 zone33ac" sID="dtvzone" sIcon={mdiStringLights} sName="TV" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.dcenterzone} zoneClass="zone33 zone33center" sID="dcenterzone" sIcon={mdiStringLights} sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.white" gutterBottom>
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.dcolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.white" gutterBottom>
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.dbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container pb={3} spacing={2}>
                  <Grid item>
                    <Switch sVal={this.state.dwalllamp} sID="dwalllamp" sIcon={mdiCoachLamp} sName="Wall lamp" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.dtv} sID="dtv" sIcon={mdiTelevision} sName="TV" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.dgovee} sID="dgovee" sIcon={mdiLedStripVariant} sName="Govee" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.dcurtainlight} sID="dcurtainlight" sIcon={mdiVanityLight} sName="Curtain light" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.dwallwasher} sID="dwallwasher" sIcon={mdiWallSconceFlat} sName="Wall washer" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                </Grid>
                <Grid container pb={1} spacing={2}>
                  <Grid item>
                    <Curtain sVal={this.state.dsheer} sID="dsheer" sName="Sheer curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Curtain sVal={this.state.dblackout} sID="dblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Fan sVal={this.state.dfan} sFval={this.state.dfanspeed} sID="dfan" sIDFS="dfanspeed" sName="Fan" stateHandler={stateHandler.bind(this)} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button className='scene-switch' variant="outlined" onClick={this.handleMovieMode} size="large" color="secondary" disableFocusRipple={true}>
                      <div className="content">
                        <Icon path={mdiMovieOpen} size={2} />
                        <div>Movie mode</div>
                      </div>
                    </Button>
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
export default OfficeRoom;
