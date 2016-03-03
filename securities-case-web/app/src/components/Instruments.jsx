import React from 'react';
import Instrument from './Instrument';
import intersperse from '../helpers/intersperse';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const POSITIVE_CLASS = 'positive';
const NEGATIVE_CLASS = 'negative';
const DEFAULT_CLASS = 'default';

/**
 * Gives you the color class based on
 * the difference between the current value and the previous value
 * @method getClassName
 * @param  {object} item  instrument object which hold current and prev
 * @return {string}      the className you will need
 */
function getClassName(item){
  if( item.current.amount > item.prev.amount ) return POSITIVE_CLASS;
  if( item.current.amount < item.prev.amount ) return NEGATIVE_CLASS;
  return DEFAULT_CLASS;
}

/**
 * calculated the difference between
 * the current value and the previous value to return a percentage
 * @method calculateDiff
 * @param  {object} item  instrument object which hold current and prev
 * @return {number}       percentage amount of the difference
 */
function calculateDiff(item){
  return (item.prev.amount - item.current.amount) / item.prev.amount * 100;
}

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
      let className = getClassName(item);
      return(<Instrument
              className={ className }
              code={item.code}
              amount={item.current.amount}
              diff={ calculateDiff(item) }
              key={i} />);
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
