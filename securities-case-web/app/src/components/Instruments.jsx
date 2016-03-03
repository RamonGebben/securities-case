import React from 'react';
import Instrument from './Instrument';
import intersperse from '../helpers/intersperse';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Instruments extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
    }
  }

  /**
   * React life cycle event fired when component has mounted
   * @method componentDidMount
   */
  componentDidMount(){
  }

  /**
   * React life cycle event fired when state has being updated
   * @method render
   */
  render() {
    let instruments = intersperse(this.props.items.map((item, i) => {
      return(<Instrument item={item} decimal={4} key={i} />);
    }), '');

    return (
        <div className='instruments'>
        <ReactCSSTransitionGroup transitionName='fadeIn' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {instruments}
        </ReactCSSTransitionGroup>

        </div>
    );
  }
}

export default Instruments;
