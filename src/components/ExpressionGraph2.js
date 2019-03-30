import React, { Component } from 'react';
import * as d3 from 'd3';

class ExpressionGraph2 extends Component {

    state = {
        width: 0,
        height: 0,
        colors: ['#8C9399', '#AFB7BF', '#D1D1D1']
    }

    render() {
        return (
            <div className="expression-graph-container">
                <div className="graph-title title">{this.props.title}</div>
                <div className="graph-content">
                    <div className="d3-graph" id={"basic-chart-" + this.props.id} style={{ width: '500px', height: '500px' }}></div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('basic-chart-' + this.props.id).clientWidth;
        const height = document.getElementById('basic-chart-' + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, this.initGraph)
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.data.length !== this.props.data.length) {
        this.updateData(prevProps.data);
        // }
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

        const medianGroup = svg.append('g').attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ')');

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

        const medianGroups = medianGroup.selectAll('.text-group')
            .data(this.props.data)
            .enter()
            .append('g')
            .attr('class', 'median-group');

        const womenArcGroup = circleGroups.append('g')
            .attr('class', 'women-arc-group');
        const menArcGroup = circleGroups.append('g')
            .attr('class', 'men-arc-group');

        const womenTextGroup = textGroups.append('g')
            .attr('class', 'women-text-group');
        const menTextGroup = textGroups.append('g')
            .attr('class', 'men-text-group');

        medianGroups.append('circle')
            .attr('cx', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPublic;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 - medianVal * Math.PI / 100)
            })
            .attr('cy', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPublic;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 - medianVal * Math.PI / 100)
            })
            .attr('r', 1)
            .attr('opacity', d => {
                let opacity = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    opacity = filtered[0].medianPublic ? 1 : 0;
                }
                return opacity;
            })
            .attr('class', 'median-circle-1 median-circle-1-left');

        medianGroups.append('circle')
            .attr('cx', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPublic;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 + medianVal * Math.PI / 100)
            })
            .attr('cy', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPublic;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 + medianVal * Math.PI / 100)
            })
            .attr('r', 1)
            .attr('opacity', d => {
                let opacity = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    opacity = filtered[0].medianPublic ? 1 : 0;
                }
                return opacity;
            })
            .attr('class', 'median-circle-1 median-circle-1-right');

        medianGroups.append('circle')
            .attr('cx', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPrivate;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 - medianVal * Math.PI / 100)
            })
            .attr('cy', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPrivate;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 - medianVal * Math.PI / 100)
            })
            .attr('r', 1)
            .attr('opacity', d => {
                let opacity = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    opacity = filtered[0].medianPrivate ? 1 : 0;
                }
                return opacity;
            })
            .attr('class', 'median-circle-2 median-circle-2-left');

        medianGroups.append('circle')
            .attr('cx', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPrivate;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 + medianVal * Math.PI / 100)
            })
            .attr('cy', (d, i) => {
                let medianVal = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    medianVal = filtered[0].medianPrivate;
                }
                return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 + medianVal * Math.PI / 100)
            })
            .attr('r', 1)
            .attr('opacity', d => {
                let opacity = 0;
                const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                if (filtered.length > 0) {
                    opacity = filtered[0].medianPrivate ? 1 : 0;
                }
                return opacity;
            })
            .attr('class', 'median-circle-2 median-circle-2-right');

        // Define the div for the tooltip
        const tooltipDiv = d3.select('#basic-chart-' + this.props.id).append('div')	
        .attr('class', 'tooltip')				
        .style('opacity', 0);

        const womenArcPath = womenArcGroup.append('path')
            .attr('class', 'women-arcs')
            .attr('d', (d, i) => this.constructArc(this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length, this.relativeWidth(4), d))
            .attr('fill', this.state.colors[0])
            .on("mouseover", (d) =>  {
                console.log(this.props.mediansRadio);
                const medians = this.props.mediansRadio.filter(media => media.year === d.year)[0];
                let publicVal = medians.medianPublic;
                let privateVal = medians.medianPrivate;

                tooltipDiv.style("opacity", 1);		
                    tooltipDiv.html("<div class='tooltip-title'><div class='year'>" + d.year + "</div><div class='stat'>" + d.womenRate.toFixed(2) + " %</div></div><div class='tooltip-content'>" + (publicVal ? "<div class='public'><div class='circle'></div><div class='value'>" +  + publicVal.toFixed(2) + " %</div></div>" : null) + (privateVal ? "<div class='private'><div class='circle'></div><div class='value'>" + privateVal.toFixed(2) + " %</div></div>": null) + "</div")	
                    .style("left", (d3.event.pageX + 20) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {		
                tooltipDiv.style("opacity", 0);	
            });

        const menArcPath = menArcGroup.append('path')
            .attr('class', 'men-arcs')
            .attr('d', (d, i) => this.constructMenArc(this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length, this.relativeWidth(4), d))
            .attr('fill', this.state.colors[1])
            .on("mouseover", (d) =>  {
                console.log(this.props.mediansRadio);
                const medians = this.props.mediansRadio.filter(media => media.year === d.year)[0];
                let publicVal = medians.medianPublic;
                let privateVal = medians.medianPrivate;

                tooltipDiv.style("opacity", 1);		
                    tooltipDiv.html("<div class='tooltip-title'><div class='year'>" + d.year + "</div><div class='stat'>" + (100 - d.womenRate).toFixed(2) + " %</div></div><div class='tooltip-content'>" + (publicVal ? "<div class='public'><div class='circle'></div><div class='value'>" +  + publicVal.toFixed(2) + " %</div></div>" : null) + (privateVal ? "<div class='private'><div class='circle'></div><div class='value'>" + privateVal.toFixed(2) + " %</div></div>": null) + "</div")	
                    .style("left", (d3.event.pageX + 20) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");	
                })					
            .on("mouseout", function(d) {		
                tooltipDiv.style("opacity", 0);	
            });

        const womenArcText = womenTextGroup.append('text')
            .attr('class', 'women-text')
            .attr('x', 0)
            .attr('y', (d, i) => - this.relativeWidth(45) + (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length + this.relativeWidth(2))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', '2px')
            .attr('fill', 'white')
            .text(d => d.year);

        const menArcText = menTextGroup.append('text')
            .attr('class', 'men-text')
            .attr('x', 0)
            .attr('y', (d, i) => this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2))
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', '2px')
            .attr('fill', 'white')
            .text(d => d.year);

        this.setState({ circlesGroup: circlesGroup, textGroup: textGroup, medianGroup: medianGroup });
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

    updateData = (previousData) => {
        if (this.state.circlesGroup) {

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

                    if (oldData.length > 0) {
                        oldStartAngle = Math.PI - ((100 - oldData[0].womenRate) * Math.PI / 100);
                        oldEndAngle = Math.PI + (100 - oldData[0].womenRate) * Math.PI / 100;
                    }
                    if (newData.length > 0) {
                        newStartAngle = Math.PI - (100 - newData[0].womenRate) * Math.PI / 100;
                        newEndAngle = Math.PI + (100 - newData[0].womenRate) * Math.PI / 100;
                    }

                    // console.log(d, newEndAngle, newStartAngle, newData);

                    const interpolateEnd = d3.interpolate(oldEndAngle, newEndAngle);
                    const interpolateStart = d3.interpolate(oldStartAngle, newStartAngle);
                    const interpolateInner = d3.interpolate(this.relativeWidth(45) - index * this.relativeWidth(45) / previousData.length - this.relativeWidth(4), this.relativeWidth(45) - index * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(4));

                    const interpolateOuter = d3.interpolate(this.relativeWidth(45) - index * this.relativeWidth(45) / previousData.length, this.relativeWidth(45) - index * this.relativeWidth(45) / this.props.data.length);
                    return (t) => d3.arc()
                        .innerRadius(interpolateInner(t))
                        .outerRadius(interpolateOuter(t))
                        .startAngle(interpolateStart(t))
                        .endAngle(interpolateEnd(t))();
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
                    const interpolateInner = d3.interpolate(this.relativeWidth(45) - index * this.relativeWidth(45) / previousData.length - this.relativeWidth(4), this.relativeWidth(45) - index * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(4));

                    const interpolateOuter = d3.interpolate(this.relativeWidth(45) - index * this.relativeWidth(45) / previousData.length, this.relativeWidth(45) - index * this.relativeWidth(45) / this.props.data.length);

                    return (t) => d3.arc()
                        .innerRadius(interpolateInner(t))
                        .outerRadius(interpolateOuter(t))
                        .startAngle(interpolateStart(t))
                        .endAngle(interpolateEnd(t))(d);
                }
            }


            this.state.textGroup.selectAll('.men-text-group').select('text')
                .transition().duration(500)
                .attr('y', (d, i) => this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2));


            this.state.textGroup.selectAll('.women-text-group').select('text')
                .transition().duration(500)
                .attr('y', (d, i) => - this.relativeWidth(45) + (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length + this.relativeWidth(2));

            this.state.medianGroup.selectAll('.median-circle-1-right')
                .transition().duration(500)
                .attr('cx', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPublic;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 + medianVal * Math.PI / 100)
                })
                .attr('cy', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPublic;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 + medianVal * Math.PI / 100)
                })
                .attr('opacity', d => {
                    let opacity = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        opacity = filtered[0].medianPublic ? 1 : 0;
                    }
                    return opacity;
                });

            this.state.medianGroup.selectAll('.median-circle-1-left')
                .transition().duration(500)
                .attr('cx', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPublic;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 - medianVal * Math.PI / 100)
                })
                .attr('cy', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPublic;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 - medianVal * Math.PI / 100)
                })
                .attr('opacity', d => {
                    let opacity = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        opacity = filtered[0].medianPublic ? 1 : 0;
                    }
                    return opacity;
                });

            this.state.medianGroup.selectAll('.median-circle-2-right')
                .transition().duration(500)
                .attr('cx', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPrivate;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 + medianVal * Math.PI / 100)
                })
                .attr('cy', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPrivate;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 + medianVal * Math.PI / 100)
                })
                .attr('opacity', d => {
                    let opacity = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        opacity = filtered[0].medianPrivate ? 1 : 0;
                    }
                    return opacity;
                })

            this.state.medianGroup.selectAll('.median-circle-2-left')
                .transition().duration(500)
                .attr('cx', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPrivate;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.cos(-Math.PI / 2 - medianVal * Math.PI / 100)
                })
                .attr('cy', (d, i) => {
                    let medianVal = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        medianVal = filtered[0].medianPrivate;
                    }
                    return (this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2)) * Math.sin(-Math.PI / 2 - medianVal * Math.PI / 100)
                })
                .attr('opacity', d => {
                    let opacity = 0;
                    const filtered = this.props.mediansRadio.filter(year => year.year === d.year);
                    if (filtered.length > 0) {
                        opacity = filtered[0].medianPrivate ? 1 : 0;
                    }
                    return opacity;
                })

            this.state.circlesGroup.selectAll('.men-arc-group').select('path').transition().duration(500)
                .attrTween('d', (d, i) => {
                    return arcTweenMen(d, this.props.data.length - i - 1)(d);
                });

            this.state.circlesGroup.selectAll('.women-arc-group').select('path').transition().duration(500)
                .attrTween('d', (d, i) => {
                    return arcTweenWomen(d, this.props.data.length - i - 1)(d);
                });
        

            const circleGroupsEnter = this.state.circlesGroup.selectAll('.circle-group').data(this.props.data, d => d.year).enter().append('g')
                .attr('class', 'circle-group');

            const textGroupsEnter = this.state.textGroup.selectAll('.text-group').data(this.props.data, d => d.year).enter().append('g')
                .attr('class', 'text-group');

            const menTextGroup = textGroupsEnter.append('g')
                .attr('class', 'men-text-group');

            const womenTextGroup = textGroupsEnter.append('g')
                .attr('class', 'women-text-group');

            menTextGroup.append('text')
                .attr('class', 'men-text')
                .attr('x', 0)
                .attr('y', (d, i) => this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length - this.relativeWidth(2))
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('font-size', '2px')
                .attr('fill', 'white')
                .text(d => d.year);

            womenTextGroup.append('text')
                .attr('class', 'women-text')
                .attr('x', 0)
                .attr('y', (d, i) => - this.relativeWidth(45) + (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length + this.relativeWidth(2))
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .style('font-size', '2px')
                .attr('fill', 'white')
                .text(d => d.year);

            const circleGroupsExit = this.state.circlesGroup.selectAll('.circle-group').data(this.props.data).exit().remove();

            const textGroupsExit = this.state.textGroup.selectAll('.text-group').data(this.props.data, d => d.year).exit().remove();

            const menArcGroup = circleGroupsEnter.append('g')
                .attr('class', 'men-arc-group');

            const womenArcGroup = circleGroupsEnter.append('g')
                .attr('class', 'women-arc-group');

            menArcGroup.append('path')
                .attr('class', 'men-arcs')
                .attr('d', (d, i) => this.constructMenArc(this.relativeWidth(45) - (this.props.data.length - i - 1) * this.relativeWidth(45) / this.props.data.length, this.relativeWidth(4), d))
                .attr('fill', this.state.colors[1]);

            womenArcGroup.append('path')
                .attr('class', 'women-arcs')
                .attr('d', (d, i) => this.constructArc(this.relativeWidth(45) - i * this.relativeWidth(45) / this.props.data.length, this.relativeWidth(4), d))
                .attr('fill', this.state.colors[0]);

        }
    }
}

export default ExpressionGraph2;