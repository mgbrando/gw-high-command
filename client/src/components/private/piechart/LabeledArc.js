import React, { Component } from 'react';
import * as d3 from "d3";
import Arc from './Arc';

class LabeledArc extends Arc {
    render() {
        let [labelX, labelY] = this.arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;
        //if(labelX)
 
        return (
            <g>
                {super.render()}
                <text transform={labelTranslate}
                      textAnchor="middle">
                    {this.props.data.data.label}
                </text>
            </g>
        );
    }
}
 
export { LabeledArc };