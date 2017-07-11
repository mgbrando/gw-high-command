import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import ReactFauxDOM, {withFauxDOM} from 'react-faux-dom';

class BarChart extends React.Component {
  componentDidMount () {
    const faux = this.props.connectFauxDOM('div', 'chart')
    d3.select(faux)
      .append('div')
      .html('Hello World!')
    this.props.animateFauxDOM(100);
  }

  render () {
    const self = this;

    return (
      <div>
        <h2>Here is some fancy data:</h2>
        <div className='renderedD3'>
          {this.props.chart}
        </div>
      </div>
    )
  }
}

BarChart.defaultProps = {
  chart: 'loading'
}

BarChart.propTypes = {
  data: PropTypes.object.isRequired
};

export default withFauxDOM(BarChart)