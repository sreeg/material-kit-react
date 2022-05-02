import React from 'react';
import Switch from '../common/Switch';
import SwitchCustomIcon from '../common/SwitchCustomIcon';
import Zone from '../common/Zone';
import Curtain from '../common/Curtain';
import Fan from '../common/Fan';
import { mdiMovieOpen, mdiLedStripVariant, mdiAirConditioner, mdiTelevision, mdiCoachLamp, mdiVanityLight, mdiStringLights, mdiChandelier, mdiEiffelTower } from '@mdi/js';
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
import { decodeHtml } from '../../../utils/commons';
import { GiDoubleStreetLights, GiCeilingLight, GiCandleFlame, GiTheaterCurtains, GiScallop, GiDjedPillar } from 'react-icons/gi';
import { FaFan } from 'react-icons/fa';
//E8:DB:84:9B:64:A0
const gateway = 'http://192.168.88.122:1880';
class Living extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lcolor: 5,
      lbrightness: 5,
      lsheer: 'CLOSE',
      lblackout: 'CLOSE',
      lcenterzone: 'OFF',
      lhallway: 'OFF',
      laczone: 'OFF',
      lfloorlamp: 'OFF',
      ltv: 'OFF',
      ldigitalclock: 'OFF',
      lcurtainlight: 'OFF',
      lscallop: 'OFF',
      lfanspeed: 5,
      lfan: 'OFF',
      livingtvsocket: 'OFF',
      lfloorikea: 'OFF',
      lAC: 'OFF'
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
    fetch(gateway + '/lcolor/' + v).then((response) => response.json());
  };

  handleBrightness = (e, v) => {
    fetch(gateway + '/lbrightness/' + v * 20).then((response) => response.json());
  };

  handleCozyMode = (e) => {
    fetch(gateway + '/dinningcozy/').then((response) => response.json());
  };

  handlelAcON = (e) => {
    fetch(gateway + '/lAC/on').then((response) => response.json());
  };

  handlelAcOFF = (e) => {
    fetch(gateway + '/lAC/off').then((response) => response.json());
  };

  componentDidMount() {
    var that = this;
    fetch(gateway + '/lsheercurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ lsheer: data['1'].curtain });
      });
    fetch(gateway + '/lblackoutcurtainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = JSON.parse(decodeHtml(data));
        this.setState({ lblackout: data['1'].curtain });
      });
    fetch(gateway + '/ltvboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        this.setState({ ltv: data['4'].power });
        this.setState({ ldigitalclock: data['3'].power });
        this.setState({ lfloorlamp: data['2'].power });
        this.setState({ livingtvsocket: data['1'].power });
      });
    fetch(gateway + '/lacboardstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        var speed = data['1'].speed;
        this.setState({ lfanspeed: Math.round(speed / 20) });
        this.setState({ lfan: data['1'].power });
        this.setState({ lscallop: data['5'].power });
      });
    fetch(gateway + '/lboardtwostatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        this.setState({ lcurtainlight: data['1'].power });
      });
    fetch(gateway + '/lboardmainstatus')
      .then((response) => response.text())
      .then((data) => {
        data = decodeHtml(data);
        data = JSON.parse(data);
        var speed = data['1'].speed;
        this.setState({ lbrightness: Math.round(speed / 20) });
        speed = data['2'].speed;
        this.setState({ lcolor: Math.round(speed / 20) });
        this.setState({ lcenterzone: data['5'].power });
        this.setState({ lhallway: data['3'].power });
        this.setState({ laczone: data['7'].power });
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
                    <Zone sVal={this.state.laczone} zoneClass="zone33 zone33ac" sID="laczone" sName="AC" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.lcenterzone} zoneClass="zone33 zone33center" sID="lcenterzone" sName="Center" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Zone sVal={this.state.lhallway} zoneClass="zone33 zone33left" sID="lhallway" sName="Hallway" stateHandler={stateHandler.bind(this)}></Zone>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Color
                        </Typography>
                        <Slider defaultValue={this.state.lcolor} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleColor} />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card variant="outlined" sx={{ minWidth: 150, boxShadow: 0 }}>
                      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '13px' }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Brightness
                        </Typography>
                        <Slider defaultValue={this.state.lbrightness} step={1} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" onChangeCommitted={this.handleBrightness} />
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
                    <SwitchCustomIcon sVal={this.state.lscallop} sID="lscallop" sIcon={GiScallop} sName="Scallop" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.lcurtainlight} sID="lcurtainlight" sIcon={GiTheaterCurtains} sName="Curtain light" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.ldigitalclock} sID="ldigitalclock" sIcon={mdiEiffelTower} sName="Eiffel Tower" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <Switch sVal={this.state.ltv} sID="ltv" sIcon={mdiTelevision} sName="Frame TV" stateHandler={stateHandler.bind(this)}></Switch>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.lfloorlamp} sID="lfloorlamp" sIcon={GiDjedPillar} sName="Floor lamp" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.livingtvsocket} sID="livingtvsocket" sIcon={GiCeilingLight} sName="Cabnet light" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  <Grid item>
                    <SwitchCustomIcon sVal={this.state.lfloorikea} sID="lfloorikea" sIcon={GiDoubleStreetLights} sName="Ikea Floor light" stateHandler={stateHandler.bind(this)}></SwitchCustomIcon>
                  </Grid>
                  <Grid item>
                    <Card sx={{ minWidth: 100, mb: 2 }}>
                      <CardContent style={{ display: 'flex', alignItems: 'center' }}>
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
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader title="Curtains & Fan" />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Curtain sVal={this.state.lsheer} sID="lsheer" sName="Sheer curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Curtain sVal={this.state.lblackout} sID="lblackout" sName="Blackout curtain" stateHandler={stateHandler.bind(this)}></Curtain>
                  </Grid>
                  <Grid item>
                    <Fan sVal={this.state.lfan} sFval={this.state.lfanspeed} sID="lfan" sIDFS="lfanspeed" sName="Fan" stateHandler={stateHandler.bind(this)} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 100, mb: 2 }}>
              <CardHeader title="Scenes" />
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button style={{ height: 100 }} variant="outlined" onClick={this.handleCozyMode} size="large" color="secondary" disableFocusRipple={true}>
                      <div className="content">
                        <GiCandleFlame size={48} />
                        <div>Cozy mode</div>
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
export default Living;
