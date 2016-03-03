import React from 'react';
/**
 * Gives you the content of the "Hired" email
 * @method getEmailBody
 * @return {string}     URI encoded email body;
 */
function getEmailBody(){
  return encodeURIComponent(`Dear Saskia,

  We would like to let you know that we want to hire Ramon to help us create our React Native application.

  Kind regards,

  <Your Name>
  ING
  `);
}

/**
 * The navigation bar
 * @method Nav
 * @param  {object} props React props object
 * @return {ReactComponent}
 */
function Nav(props){
  return (
      <nav className='nav'>
        <div className='logo'></div>
        <a href={`mailto:saskia@sytac.nl?subject=Hire%20Ramon&body=${ getEmailBody() }`} className='button'>HIRE</a>
      </nav>
  );
}

export default Nav;
