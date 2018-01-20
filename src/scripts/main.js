/*jshint esversion: 6 */

const data = [{
    "fecha": "2018-01-16 08:30:00",
    "precioApertura": 230,
    "precioUltimo": 229,
    "precioMinimo": 228,
    "precioMaximo": 131,
    "volumen": 10
},
{
    "fecha": "2018-01-16 09:05:10",
    "precioApertura": 230,
    "precioUltimo": 231,
    "precioMinimo": 228,
    "precioMaximo": 231,
    "volumen": 10
},
{
    "fecha": "2018-01-16 10:15:10",
    "precioApertura": 230,
    "precioUltimo": 231.76,
    "precioMinimo": 228,
    "precioMaximo": 200,
    "volumen": 10
},
{
    "fecha": "2018-01-16 11:35:13",
    "precioApertura": 230,
    "precioUltimo": 227.9,
    "precioMinimo": 228,
    "precioMaximo": 231,
    "volumen": 10
},
{
    "fecha": "2018-01-16 12:15:13",
    "precioApertura": 230,
    "precioUltimo": 228.9,
    "precioMinimo": 228,
    "precioMaximo": 31,
    "volumen": 10
},
{
    "fecha": "2018-01-16 13:05:10",
    "precioApertura": 230,
    "precioUltimo": 229.34,
    "precioMinimo": 228,
    "precioMaximo": 231,
    "volumen": 10
},
{
    "fecha": "2018-01-16 13:36:16",
    "precioApertura": 230,
    "precioUltimo": 229.9,
    "precioMinimo": 228,
    "precioMaximo": 131,
    "volumen": 10
},
{
    "fecha": "2018-01-16 14:05:08",
    "precioApertura": 230,
    "precioUltimo": 230,
    "precioMinimo": 228,
    "precioMaximo": 31,
    "volumen": 10
}];

const margin = {top:20, bottom:20};
const height = 300 - margin.top - margin.bottom;
const width = window.innerWidth;

const svg = d3.select('svg')
  .attr('width', width)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(0,' + margin.top + ')')
  .datum(data);

const parseTime = d3.timeParse('%Y-%m-%j %H:%M:%S');

const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 1]);

const xAxis = d3.axisBottom()
  .ticks(4)
  .scale(x);

const yAxis = d3.axisLeft(y)
  .ticks(5)
  .tickPadding(30)
  .tickSize(0, -width);

const area = d3.area()
  .x(function(d, i) { return x(parseTime(d.fecha)); })
  .y1(function(d) { return y(d.precioMaximo); })
  .y0(y(0))
  .curve(d3.curveMonotoneX);

const line = d3.line()
  .x(function(d) { return x(parseTime(d.fecha)); })
  .y(function(d) { return y(d.precioMaximo); })
  .curve(d3.curveMonotoneX);


/* Begin the iterate with data */
x.domain(d3.extent(data, function(d) { return parseTime(d.fecha); }));
y.domain([0, d3.max(data, function(d) { return d.precioMaximo; })]);

svg.append('path')
  .attr('class', 'line')
  .attr('d', line)
  .attr('stroke-dasharray', (width*3) + ' ' + (width*3))
  .attr('stroke-dashoffset', (width*3))
  .transition()
    .duration(2500)
    .attr('stroke-dashoffset', 0);

svg.append('path')
  .attr('class', 'area')
  .attr('d', area);

svg.append('g')
  .style('font-family', 'sans-serif')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0, ' + height + ')')
  .call(xAxis);

svg.append('g')
  .style('font-family', 'sans-serif')
  .attr('class', 'y axis')
  .attr('transform', 'translate(' + width + ',0)')
  .call(yAxis);