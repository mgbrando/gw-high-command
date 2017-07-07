import React, { Component } from 'react';
import * as d3 from "d3";
import { LabeledArc } from './LabeledArc';
 
class Piechart extends Component {
    constructor() {
        super();
 
        this.pie = d3.pie()
                     .value((d) => d.value);
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.arcGenerator = this.arcGenerator.bind(this);
    }
 
    arcGenerator(d, i) {
        console.log('INSIDE ARC GENERATOR');
        return (
            <LabeledArc key={`arc-${i}`}
                        data={d}
                        innerRadius={this.props.innerRadius}
                        outerRadius={this.props.outerRadius}
                        color={this.colors(i)} />
        );
    }
 
    render() {
        let pie = this.pie(this.props.data),
            translate = `translate(${this.props.x}, ${this.props.y})`;
 
        return (
            <svg className="pieChart">
                <g transform={translate}>
                    {pie.map((d, i) => this.arcGenerator(d, i))}
                </g>
            </svg>
        )
    }
}
 
export default Piechart;