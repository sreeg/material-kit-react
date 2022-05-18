import './switch.css';
import React from 'react';
import { mdiCeilingFan } from '@mdi/js';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Switch from './Switch';

const gateway = 'http://192.168.88.122:1880';
class Fan extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFanspeed = (e, v) => {
    //this.props.stateHandlerFs(sID, v);
    fetch(gateway + '/' + this.props.sIDFS + '/' + v * 20).then((response) => response.json());
  };
  render() {
    let { sVal, sFval, sID, sIDFS, sName, stateHandler, stateHandlerFs } = this.props;

    return (
      <Paper variant="outlined" sx={{ minWidth: 150 }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: "16px", background: 'transparent' }}>
        <Switch sVal={sVal} sID={sID} sIcon={mdiCeilingFan} sName={sName} stateHandler={stateHandler.bind(this)}></Switch>
        <Slider defaultValue={sFval} step={1} sx={{ mt: 1 }} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" orientation='vertical' onChangeCommitted={this.handleFanspeed} />
      </Paper>
    );
  }
}
export default Fan;
