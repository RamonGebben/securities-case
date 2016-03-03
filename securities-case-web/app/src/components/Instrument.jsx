import React from 'react';

class Instrument extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
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
      this.refs.instrument.classList.remove(this.props.className);
    }, 900)
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
        <div ref='instrument' className={`instrument ${props.className}`}>
          <div className='code'>{props.code}</div>
          <div className='amount'>
            <span className='current'>{props.amount.toFixed(2)}</span>
            <span className='diff'>{`${props.diff.toFixed(2) || 0.00}%`}</span>
          </div>

        </div>
    );
  }
}

export default Instrument;
