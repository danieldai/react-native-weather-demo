import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Svg, { Path } from 'react-native-svg';
import * as d3scale from 'd3-scale';
import * as d3shape from 'd3-shape';
import * as d3array from 'd3-array';

export default class Chart extends Component {
  static propTypes = {
    data : PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    top: PropTypes.number,
    pointFillColors: PropTypes.array,
    pointStrokeColors: PropTypes.array,
    lineColors: PropTypes.array
  }

  getValueDomain(){
    var _max = [];
    var _min = [];
    this.props.data.map((item, index) => {
      _max.push(d3array.max(item));
      _min.push(d3array.min(item));
    });
    return [d3array.max(_max), d3array.min(_min)];
  }

  getPathD(data){
    var x = d3scale.scaleLinear().domain([0, data.length - 1]).range([6, this.props.width - 6]);
    var y = d3scale.scaleLinear().domain(this.getValueDomain()).range([6, this.props.height - 6]);
    var line = d3shape.line().x(function(d,i) {
            return x(i);
        }).y(function(d) {
            return y(d);
        }).curve(d3shape.curveCardinal);
    return line(data);
  }

  paths(){
    var that = this;
    return this.props.data.map((item, index) => {
      return (
        <Path key={index} fill="none" stroke={that.props.lineColors[index]} strokeWidth="2" strokeMiterlimit={10}
          d={that.getPathD(item)} />);
    });
  }

  points(){
    var that = this;
    if(this.props.data.length > 1){
      var x = d3scale.scaleLinear().domain([0, this.props.data[0].length - 1]).range([6, this.props.width - 6]);
      var y = d3scale.scaleLinear().domain(this.getValueDomain()).range([6, this.props.height - 6]);
      var paths = [];
      this.props.data.map((item, index) => {
        item.map((point, _index) => {
          var cx = x(_index);
          var cy = y(point);
          var d = "M " + cx + " " + cy + " m -3,0 a 3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0";
          paths.push(<Path key={index} fill={that.props.pointFillColors[index]}
                      stroke={that.props.pointStrokeColors[index]}
                      strokeWidth="1" strokeMiterlimit={10}
                      d={d} />);
        });
      });
      return paths;
    }
  }

  svg (){
    return (<Svg width={this.props.width} height={this.props.height} forceUpdate="0"
            style={{
                width: this.props.width,
                height: this.props.height,}}>
            {this.paths()}
            {this.points()}
        </Svg>);
  }

  render() {
    if(this.props.data){
      return(
        <View style={{
                  position: 'absolute',
                  backgroundColor:'transparent',
                  top: this.props.top,
                }}>
          {this.svg()}
        </View>);
    }else{
      return(
        <View style={{
                  position: 'absolute',
                  backgroundColor:'transparent',
                  top: this.props.top,
                }}>
        </View>);
    }
  }
}
