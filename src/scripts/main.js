/*jshint esversion: 6 */

const data = [{
    "fecha": "2018-01-16 08:30:00",
    "precioApertura": 230,
    "precioUltimo": 229,
    "precioMinimo": 228,
    "precioMaximo": 231,
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
    "precioMaximo": 231,
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
    "precioMaximo": 231,
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
    "precioMaximo": 231,
    "volumen": 10
},
{
    "fecha": "2018-01-16 14:05:08",
    "precioApertura": 230,
    "precioUltimo": 230,
    "precioMinimo": 228,
    "precioMaximo": 231,
    "volumen": 10
}];

const margin = {top:20, right:0, bottom:20, left:40};
const height = 300 - margin.top - margin.bottom;
const width = 600 - margin.right - margin.left;

const svg = d3.select('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  .datum(data);

const es_MX = d3.timeFormatLocale({decimal: ".",thousands: ",",grouping: [3],currency: ["$", ""],dateTime: "%A, %e de %B de %Y, %X",date: "%d/%m/%Y",time: "%H:%M:%S",periods: ["AM", "PM"],days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]});

const x = d3.scaleTime()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 1]);

const xAxis = d3.axisBottom()
  .scale(x)
  .ticks(d3.timeMonths)
  .tickSize(15, 0)
  .tickFormat(es_MX.timeFormat('%b %d'));

const yAxis = d3.axisRight(y)
  .ticks(5)
  .tickSize(-width, 0);

const area = d3.area()
  .x(function(d) { return x(d.tiempo); })
  .y1(function(d) { return y(d.precioMaximo); })
  .y0(y(0))
  .curve(d3.curveNatural);


/* Begin the iterate with data */
x.domain(d3.extent(data, function(d) { return d.tiempo; }));
y.domain([0, d3.max(data, function(d) { return d.precioMaximo; })]);

const dataNest = d3.nest()
  .key(function(d) { return d.precioMaximo; })
  .entries(data);

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

svg.selectAll('.dot')
  .data(data.filter(function(d) { return d; }))
  .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', area.x())
    .attr('cy', area.y())
    .attr('r', 3.5);