import React from 'react';
import Arc from './Arc';

class LabeledArc extends Arc {
    render() {
        
        let [labelX, labelY] = this.arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;
        let [labelX2, labelY2] = this.arc.centroid(this.props.data),
            labelTranslate2 = `translate(${labelX2*1.75}, ${labelY2*1.75})`;
 
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