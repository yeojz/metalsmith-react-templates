import React, {PropTypes} from 'react';
import {RouterContext} from 'react-router';

class Provider extends React.Component {
  getChildContext = () => ({
      defaultProps: this.props.defaultProps || {}
  })

  render() {
    return <RouterContext {...this.props} />;
  }
}

Provider.propTypes = {
  defaultProps: PropTypes.object
}

Provider.childContextTypes = {
  defaultProps: PropTypes.object
}

export default Provider;
