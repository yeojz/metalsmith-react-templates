import React from 'react';
import PropTypes from 'prop-types';

class Provider extends React.Component {
  getChildContext = () => ({
    defaultProps: this.props.defaultProps || {}
  })

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.propTypes = {
  defaultProps: PropTypes.object,
  children: PropTypes.any
}

Provider.childContextTypes = {
  defaultProps: PropTypes.object
}

export default Provider;
