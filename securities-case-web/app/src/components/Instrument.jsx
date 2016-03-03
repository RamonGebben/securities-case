import React from 'react';

const POSITIVE_COLOR = '#34D249';
const NEGATIVE_COLOR = '#FF4B3D';
const DEFAULT_COLOR  = '#000000';

/**
 * Gives you the color class based on
 * the difference between the current value and the previous value
 * @method getColor
 * @param  {object} item  instrument object which hold current and prev
 * @return {string}      the className you will need
 */
function getColor(item){
  if( item.current.amount > item.prev.amount ) return POSITIVE_COLOR;
  if( item.current.amount < item.prev.amount ) return NEGATIVE_COLOR;
  if( item.current.amount === item.prev.amount ) return DEFAULT_COLOR;
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

class Instrument extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      color: getColor(props.item)
    }
    this.animationTimer = null;
  }

  /**
   * React life cycle event fired when component has mounted
   * @method componentDidMount
   */
  componentDidMount(){
  }

  /**
   * React life cycle event fired when component has mounted
   * @method componentDidMount
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.color !== nextState.color;
  }

  /**
   * React life cycle event fired when component receives props
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps(nextProps){
    this.setState({ color: getColor(nextProps.item) });
  }

  /**
   * React life cycle event fired when component props or state got updated
   * @method componentDidUpdate
   */
  componentDidUpdate(){
    this.startAnimationTimer()
  }

  /**
   * React life cycle event fired when component will unmount
   * @method componentWillUnmount
   */
  componentWillUnmount(){
    this.clearAnimationTimer();
  }

  /**
   * Start a new timeout to clear the className that animates
   * @method startAnimationTimer
   */
  startAnimationTimer(){
    this.clearAnimationTimer()
    this.animationTimer = setTimeout(() => {
      this.setState({color: DEFAULT_COLOR});
    }, 2000);
  }

  /**
   * clears the timeout that clears the animation className
   * @method clearAnimationTimer
   */
  clearAnimationTimer(){
    if( this.animationTimer ) clearTimeout(this.animationTimer);
  }

  /**
   * React life cycle event fired when state has being updated
   * @method render
   */
  render() {
    let props = this.props;
    return (
        <div ref='instrument' className='instrument'>
          <div className='code'>{props.item.code}</div>
          <div className='amount'>
            <span className='current' style={{ color: this.state.color }}>{props.item.current.amount.toFixed(props.decimal)}</span>
            <span className='diff'>{`${calculateDiff(props.item).toFixed(props.decimal) || 0.00}%`}</span>
          </div>

        </div>
    );
  }
}

Instrument.defaultProps = { decimal: 2 };

export default Instrument;
