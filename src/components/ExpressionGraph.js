import React, { Component } from 'react';
import * as d3 from 'd3';

class ExpressionGraph extends Component {

    state = {
        width: 0,
        height: 0,
    }

    render() {
        return (
            <div className="expression-graph-container" id="basic-chart" style={{ width: '70vh', height: '70vh' }}>
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('basic-chart').clientWidth;
        const height = document.getElementById('basic-chart').clientHeight;
        this.setState({ width: width, height: height }, this.initGraph)
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.data.length !== this.props.data.length) {
        this.updateData(prevProps.data);
        // }
    }

    initGraph = () => {

        const { width, height } = this.state;

        const svg = d3.select('#basic-chart')
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

        const womenGroups = circlesGroup.selectAll('.woman-circle-group')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('class', 'woman-circle-group');

        womenGroups.append('path')
            .attr('class', 'women-arcs')
            .attr('d', (d, i) => this.constructArc(this.relativeWidth(50) - i * this.relativeWidth(50) / this.props.data.length, this.relativeWidth(5), d))
            .attr('fill', 'orange');

        const menGroups = circlesGroup.selectAll('.men-arcs')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('class', 'men-circle-group');

        menGroups.append('path')
            .attr('class', 'men-arcs')
            .attr('d', (d, i) => this.constructMenArc(this.relativeWidth(50) - i * this.relativeWidth(50) / this.props.data.length, this.relativeWidth(5), d))
            .attr('fill', 'lightblue');

        womenGroups.append('text')
            .attr('y', (d, i) => (i * this.relativeWidth(50) / this.props.data.length) - this.relativeWidth(46))
            .attr('x', 0)
            .style('font-size', 2)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('alignment-baseline', 'central')
            .text(d => d.year)

        menGroups.append('text')
            .attr('y', (d, i) => (- i * this.relativeWidth(50) / this.props.data.length) + this.relativeWidth(47))
            .attr('x', 0)
            .style('font-size', 2)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .attr('alignment-baseline', 'central')
            .text(d => d.year)

        this.setState({ circlesGroup: circlesGroup });

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
        const arc = d3.arc().innerRadius(radius - thickness).outerRadius(radius).startAngle(Math.PI - ((100 - d.womenRate) * Math.PI / 100)).endAngle(Math.PI + (100 - d.womenRate) * Math.PI / 100);

        return arc();
    }

    updateData = (previousData) => {
        const arcTweenMen = (data, index) => {
            return (d) => {
                let newData = [];
                let oldData = [];

                if (this.props.data.length > 0) {
                    newData = this.props.data.filter(year => year.year === data.year);
                }
                if (previousData.length > 0) {
                    oldData = previousData.filter(year => year.year === data.year);
                }
                let newStartAngle = 0;
                let newEndAngle = 0;
                let oldStartAngle = 0;
                let oldEndAngle = 0;
                if (newData.length > 0) {
                    newStartAngle = Math.PI - ((100 - newData[0].womenRate) * Math.PI / 100);
                    newEndAngle = Math.PI + (100 - newData[0].womenRate) * Math.PI / 100;
                }
                if (oldData.length > 0) {
                    oldStartAngle = Math.PI - ((100 - oldData[0].womenRate) * Math.PI / 100);
                    oldEndAngle = Math.PI + (100 - oldData[0].womenRate) * Math.PI / 100;
                }

                const interpolateEnd = d3.interpolate(oldEndAngle, newEndAngle);
                const interpolateStart = d3.interpolate(oldStartAngle, newStartAngle);
                const interpolateInner = d3.interpolate(this.relativeWidth(50) - index * this.relativeWidth(50) / previousData.length - this.relativeWidth(40 / (previousData.length + 1)), this.relativeWidth(50) - index * this.relativeWidth(50) / this.props.data.length - this.relativeWidth(40 / (this.props.data.length + 1)));
                const interpolateOuter = d3.interpolate(this.relativeWidth(50) - index * this.relativeWidth(50) / previousData.length, this.relativeWidth(50) - index * this.relativeWidth(50) / this.props.data.length);

                return (t) => d3.arc()
                    .innerRadius(interpolateInner(t))
                    .outerRadius(interpolateOuter(t))
                    .startAngle(interpolateStart(t))
                    .endAngle(interpolateEnd(t))(d);
            }
        }

        const arcTweenWomen = (data, index) => {
            return (d) => {
                let newData = [];
                let oldData = [];

                if (this.props.data.length > 0) {
                    newData = this.props.data.filter(year => year.year === data.year);
                }
                if (previousData.length > 0) {
                    oldData = previousData.filter(year => year.year === data.year);
                }
                let newStartAngle = 0;
                let newEndAngle = 0;
                let oldStartAngle = 0;
                let oldEndAngle = 0;
                if (newData.length > 0) {
                    newStartAngle = - (newData[0].womenRate * Math.PI / 100);
                    newEndAngle = newData[0].womenRate * Math.PI / 100;
                }
                if (oldData.length > 0) {
                    oldStartAngle = - (oldData[0].womenRate * Math.PI / 100);
                    oldEndAngle = oldData[0].womenRate * Math.PI / 100;
                }

                const interpolateEnd = d3.interpolate(oldEndAngle, newEndAngle);
                const interpolateStart = d3.interpolate(oldStartAngle, newStartAngle);

                const interpolateInner = d3.interpolate(this.relativeWidth(50) - index * this.relativeWidth(50) / previousData.length - this.relativeWidth(40 / (previousData.length + 1)), this.relativeWidth(50) - index * this.relativeWidth(50) / this.props.data.length - this.relativeWidth(40 / (this.props.data.length + 1)));

                const interpolateOuter = d3.interpolate(this.relativeWidth(50) - index * this.relativeWidth(50) / previousData.length, this.relativeWidth(50) - index * this.relativeWidth(50) / this.props.data.length);

                return (t) => d3.arc()
                    .innerRadius(interpolateInner(t))
                    .outerRadius(interpolateOuter(t))
                    .startAngle(interpolateStart(t))
                    .endAngle(interpolateEnd(t))(d);
            }
        }


        if (this.state.circlesGroup) {

            this.state.circlesGroup.selectAll('.men-arcs').data(this.props.data)
                .enter()
                .append('path')
                .attr('class', 'men-arcs')
                .attr('d', (d, i) => this.constructMenArc(this.relativeWidth(50) - i * this.relativeWidth(50) / this.props.data.length, this.relativeWidth(5), d))
                .attr('fill', 'lightblue');

            this.state.circlesGroup.selectAll('.women-arcs').data(this.props.data)
                .enter()
                .append('path')
                .attr('class', 'women-arcs')
                .attr('d', (d, i) => this.constructArc(this.relativeWidth(50) - i * this.relativeWidth(50) / this.props.data.length, this.relativeWidth(5), d))
                .attr('fill', 'orange')

            this.state.circlesGroup.selectAll('.women-arcs').data(this.props.data).exit().remove();
            this.state.circlesGroup.selectAll('.men-arcs').data(this.props.data).exit().remove();

            d3.selectAll('.men-arcs').transition().duration(500)
                .attrTween('d', (d, i) => {
                    return arcTweenMen(d, i)(d)
                });

            d3.selectAll('.women-arcs').transition().duration(500)
                .attrTween('d', (d, i) => {
                    return arcTweenWomen(d, i)(d)
                });
        }


    }
}

export default ExpressionGraph;