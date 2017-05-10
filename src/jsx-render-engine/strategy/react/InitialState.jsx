import React from 'react';
import omit from 'lodash/omit';

const RESERVED_PROPS = [
  'children',
  'mode',
  'stats'
];

class InitialState extends React.Component {
  shouldComponentUpdate = () => false;

  render() {
    const initialState = omit(this.props, RESERVED_PROPS);

    return (
      <div
        style={{display: 'none'}}
        className='initalState'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(initialState)
        }}
      />
    );
  }
}

export default InitialState;
