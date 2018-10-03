import React from 'react';
import PropTypes from 'prop-types';

const rvhRegex = /(\d+(\.\d*)?)rvh\s*$/;

class Div100vh extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.computeRvhStyles = this.computeRvhStyles.bind(this);
  }

  // On window resize, recalculate any rvh unit style properties
  computeRvhStyles() {
    const node = this.myRef.current;

    if(!node) {
      return false;
    }

    let rvhPropertyFound = false;
    Object.entries(this.props.style || {}).forEach(([property, rawValue]) => {
      const match = rvhRegex.exec(rawValue);
      if (match != null) {
        rvhPropertyFound = true;
        // Guarantee that this only runs for numbers
        const extractedValue = parseFloat(match[0]);
        node.style[property] = extractedValue / 100 * window.innerHeight + 'px';
      }
    });
    // Default to height 100vh if no rvh found in style
    if (!rvhPropertyFound) {
      node.style.height = window.innerHeight + 'px';
    }
  }

  componentDidMount() {
    const { resizeDelay } = this.props;

    this.computeRvhStyles();

    window.addEventListener('resize',
      resizeDelay && (
        () => setTimeout(this.computeRvhStyles, resizeDelay)
      ) || this.computeRvhStyles
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeRvhStyles);
  }

  render() {
    const { resizeDelay, ...props } = this.props;
    return <div ref={this.myRef} {...props} />;
  }
}

Div100vh.propTypes = {
  resizeDelay: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string)
};

export default Div100vh;