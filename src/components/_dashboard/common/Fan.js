import './switch.css';
import React from 'react';
import { mdiCeilingFan } from '@mdi/js';
import { styled } from '@mui/material/styles';

import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import Switch from './Switch';
import MediaQuery from 'react-responsive'
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const gateway = 'http://192.168.88.122:1880';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#2249e1',
  },
  '& .MuiRating-iconHover': {
    color: '#2249e1',
  },
});
class Fan extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFanspeed = (e, v) => {
    fetch(gateway + '/' + this.props.sIDFS + '/' + v * 20).then((response) => response.json());
  };
  render() {
    let { sVal, sFval, sID, sIDFS, sName, stateHandler, stateHandlerFs } = this.props;

    return (
      <>
        <MediaQuery minWidth={200} maxWidth={600}>
          <Paper variant="outlined" sx={{ minWidth: 130 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "8px", background: 'transparent' }}>
            <Switch sVal={sVal} sID={sID} sIcon={mdiCeilingFan} sName={sName} stateHandler={stateHandler.bind(this)}></Switch>
            <Slider defaultValue={sFval} step={1} sx={{ mt: 1 }} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" orientation='horizontal' style={{ width: "80%" }} onChangeCommitted={this.handleFanspeed} />
          </Paper>
        </MediaQuery>
        <MediaQuery minWidth={601} maxWidth={4200}>
          <Paper variant="outlined" className='fan-paper' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: "8px", background: 'transparent' }}>
            <Switch style={{zoom: "0.8"}} sVal={sVal} sID={sID} sIcon={mdiCeilingFan} sName={sName} stateHandler={stateHandler.bind(this)}></Switch>
            <Slider defaultValue={sFval} step={1} sx={{ mt: 1 }} marks min={1} max={5} track={false} color="secondary" valueLabelDisplay="auto" orientation='vertical' onChangeCommitted={this.handleFanspeed} />
            {/* <StyledRating
              name="customized-color"
              defaultValue={sFval}
              precision={1}
              orientation="vertical"
              onChange={this.handleFanspeed}
              icon={<FiberManualRecordIcon style={{width: "0.8em"}} />}
              emptyIcon={<FiberManualRecordIcon style={{width: "0.8em"}} />}
            /> */}
          </Paper>
        </MediaQuery>
      </>
    );
  }
}
export default Fan;
