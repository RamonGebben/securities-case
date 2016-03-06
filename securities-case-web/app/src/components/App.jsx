import React from 'react';
import load from 'little-loader';
import Instruments from './Instruments';
import Nav from './Nav';
import _ from 'lodash';

const SERVER_URL = window.location.href;

/**
 * Coverts an instruments to prefered format
 * @method convertInstrument
 * @param  {object}          inst instrument received from the /instruments endpoint
 * @return {object}               instrument with the prefered extra keys
 */
function convertInstrument(inst){
  inst.current = inst.price;
  inst.prev = inst.price;
  return inst;
}
class App extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      instruments: []
    };
  }
  /**
   * React life cycle event fired when component has mounted
   * @method componentDidMount
   */
  componentDidMount(){

    this._loadDeprecatedLibraries()
      .then(() => {
        let socket = new SockJS('/stomp');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({}, () => {
            this._onStompConneted();
        });
        this.stompClient.debug = null;
      });

      this._getInitialInstruments()
        .then(data => {
          var initialData = data.map(convertInstrument);
          this.setState({instruments: initialData});
        });
  }

  /**
   * Retrieves an initial set of instruments from the backend
   * @method _getInitialInstruments
   * @return {promise}               promise holding the instruments
   */
  _getInitialInstruments(){
    return fetch(`${SERVER_URL}/instruments`)
      .then(res => res.json());
  }

  /**
   * Loads in the libraries which did not work with Node ^4.2.2
   * @method _loadDeprecatedLibraries
   * @return {promise}  gets returned to deffer the processing untill the scripts are loaded
   */
  _loadDeprecatedLibraries(){
    return new Promise((resolve, reject) => {
      load('http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js', (err) => {
        if( err ) reject(err);
        load('http://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js', (err) => {
          if( err ) reject(err);
          else resolve();
        });
      });
    });
  }

  /**
   * Gets triggered when STOMP connection has being established
   * @method _onStompConneted
   */
  _onStompConneted(){
    console.log('Websocket connection living');
    this.stompClient.subscribe('/topic/update', (data) => {
        let message = JSON.parse(data.body);
        this._onMessageReceived(message);
    });
  }

  /**
   * Fired every time a new message comes in via the Websocket
   * @method _onMessageReceived
   * @param  {object}           message parsed message object
   */
  _onMessageReceived(message){
    if( this.state.instruments.length < 0 ) return;
    let updatedIndex = this.state.instruments.findIndex(instrument => message.code === instrument.code);
    let updatedInstrument = _.cloneDeep(this.state.instruments[updatedIndex]);
    let state = _.cloneDeep(this.state.instruments);

    updatedInstrument.prev = updatedInstrument.current;
    updatedInstrument.current = message.price;
    state[updatedIndex] = updatedInstrument;
    this.setState({instruments: state});
  }

  /**
   * React life cycle event fired when state has being updated
   * @method render
   */
  render() {
    return (
        <div className='app'>
            <Nav />
            <div className='lines'>
              <Instruments items={this.state.instruments} />
            </div>
        </div>
    );
  }
}

export default App;
