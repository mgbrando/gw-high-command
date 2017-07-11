import React, { Component } from 'react';
import * as d3 from "d3";
import Arc from './Arc';

class LabeledArc extends Arc {
    render() {
        console.log('PIECHART');
        console.log(this.props.data);
        /*const nonZeroData = this.props.data.filter(statData => {
            return statData.value > 0;
        });*/
        let [labelX, labelY] = this.arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;
        let [labelX2, labelY2] = this.arc.centroid(this.props.data),
            labelTranslate2 = `translate(${labelX2*1.5}, ${labelY2*1.5})`;
        //if(labelX)
 
        return (
            <g>
                {super.render()}
                <text transform={labelTranslate}
                      textAnchor="middle">
                    {this.props.data.data.numberLabel}
                </text>
                <text transform={labelTranslate2}
                      textAnchor="middle">
                    {this.props.data.data.statLabel}
                </text>
            </g>
        );
    }
}
 
export { LabeledArc };