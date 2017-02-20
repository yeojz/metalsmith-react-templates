/** @jsx h */
/* eslint-disable */
import {h, Component} from 'preact';

class PreactTemplate extends Component {
  render() {
    return (
      <article>
        <h1>Default</h1>
        <section>{this.props.contents}</section>
      </article>
    );
  }
}

export default PreactTemplate;
