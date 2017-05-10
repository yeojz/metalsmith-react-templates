import React from 'react';
import omit from 'lodash/omit';

const RESERVED_PROPS = [
  'children',
  'mode',
  'stats'
];

function withInitialProps(Component) {

  class PropsProvider extends React.Component {
    shouldComponentUpdate = () => false;

    render() {
      const initialState = omit(this.props, RESERVED_PROPS);

      return (
        <div className='withInitialProps'>
          <Component {...this.props} />

          <div
            style={{display: 'none'}}
            className='initalState'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(initialState)
            }}
          />
        </div>
      )
    }
  }

  return PropsProvider;
}

export default withInitialProps;
