import React, { Component } from 'react';
import * as d3 from 'd3';

class SmallExpressionGraph extends Component {

    state = {
        width: 0,
        height: 0,
        colors: ['#8C9399', '#AFB7BF', '#D1D1D1']
    }

    render() {
        return (
            <div className="expression-graph-container">
            <div className="graph-title-small title">{this.props.title}</div>
            <div className="graph-content">
                <div className="d3-graph" id={"basic-chart-" + this.props.id} style={{ width: '300px', height: '300px' }}></div>
            </div>
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('basic-chart-' + this.props.id).clientWidth;
        const height = document.getElementById('basic-chart-' + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, this.initGraph)
    }

    initGraph = () => {

        const { width, height } = this.state;

        const svg = d3.select('#basic-chart-' + this.props.id)
            .append('svg')
            //  The viewbox will try to fill all the space given but preserving the ratio.
            //  h = div height, w = div width
            //  if h > w viewbox = 0 0 100 100*h/w
            //  if w > h viewbox = 0 0 100*w/h 100
            .attr('viewBox', () => {
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const circlesGroup = svg.append('g').attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ')');

        const textGroup = svg.append('g').attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ')');

        const circleGroups = circlesGroup.selectAll('.circle-group')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('class', 'circle-group');

        const textGroups = textGroup.selectAll('.text-group')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('class', 'text-group');

        textGroup.append('text')
            .attr('class', 'title-1')
            .attr('x', 0)
            .attr('y', this.relativeHeight(47))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text('hommes');

        textGroup.append('text')
            .attr('class', 'title-2')
            .attr('x', 0)
            .attr('y', - this.relativeHeight(47))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .text('femmes');

        const womenArcGroup = circleGroups.append('g')
            .attr('class', 'women-arc-group');
        const menArcGroup = circleGroups.append('g')
            .attr('class', 'men-arc-group');

        const womenTextGroup = textGroups.append('g')
            .attr('class', 'women-text-group');
        const menTextGroup = textGroups.append('g')
            .attr('class', 'men-text-group');


        womenArcGroup.append('path')
            .attr('class', 'women-arcs')
            .attr('d', (d, i) => this.constructArc(this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length, this.relativeWidth(4), d))
            .attr('fill', this.state.colors[0]);

        menArcGroup.append('path')
            .attr('class', 'men-arcs')
            .attr('d', (d, i) => this.constructMenArc(this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length, this.relativeWidth(4), d))
            .attr('fill', this.state.colors[1]);

        womenTextGroup.append('text')
            .attr('class', 'women-text')
            .attr('x', 0)
            .attr('y', (d, i) => - this.relativeWidth(45) + (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length + this.relativeWidth(2))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', '2px')
            .attr('fill', 'white')
            .text(d => d.year);

        menTextGroup.append('text')
            .attr('class', 'men-text')
            .attr('x', 0)
            .attr('y', (d, i) => this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', '2px')
            .attr('fill', 'white')
            .text(d => d.year);

        this.setState({ circlesGroup: circlesGroup, textGroup: textGroup});
    }

    relativeHeight = (height) => {
        return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
    }

    relativeWidth = (width) => {
        return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
    }

    constructArc = (radius, thickness, d) => {
        const arc = d3.arc().innerRadius(radius - thickness).outerRadius(radius).startAngle(- (d.womenRate * Math.PI / 100)).endAngle(d.womenRate * Math.PI / 100);
        return arc();
    }

    constructMenArc = (radius, thickness, d) => {
        const arc = d3.arc().innerRadius(radius - thickness).outerRadius(radius).startAngle(Math.PI - (100 - d.womenRate) * Math.PI / 100).endAngle(Math.PI + (100 - d.womenRate) * Math.PI / 100);
        return arc();
    }
}

export default SmallExpressionGraph;