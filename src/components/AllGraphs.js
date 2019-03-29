import React, { Component } from 'react';
import SmallExpressionGraph from './SmallExpressionGraph';

class AllGraphs extends Component {
    render() {

        const { mediaSepDataSet } = this.props;
        return (
            <div className="all-graphs-container">
                <div className="all-graphs-title">DETAIL DE TOUS LES MEDIAS</div>
                <div className="small-graph-container">
                    {mediaSepDataSet.map((media, i) => <div className="small-graph-content" key={i}><SmallExpressionGraph data={media.data} id={'small-' + i} title={media.channelName}></SmallExpressionGraph></div>)}
                </div>
            </div>
        );
    }
}

export default AllGraphs;