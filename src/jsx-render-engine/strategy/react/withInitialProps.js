import React from 'react';
import InitialState from './InitialState';

function withInitialProps(Component) {

  function PropsProvider(props) {
    return (
      <div className='withInitialProps'>
        <Component {...props} />
        <InitialState {...props} />
      </div>
    );
  }

  return PropsProvider;
}

export default withInitialProps;
