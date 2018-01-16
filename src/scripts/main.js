/*jshint esversion: 6 */

const data = [{
    "precio": 229.3,
    "tiempo": "2010"
  }, {
    "precio": 230.12,
    "tiempo": "2011"
  }, {
    "precio": 231.27,
    "tiempo": "2012"
  }, {
    "precio": 232.7,
    "tiempo": "2013"
  }, {
    "precio": 231.83,
    "tiempo": "2014"
  }, {
    "precio": 281.25,
    "tiempo": "2015"
  }, {
    "precio": 299.43,
    "tiempo": "2017"
}];

const svg = d3.select('svg');
const margin = {top:20, right:0, bottom:20, left:0};
const height = svg.attr('height') - margin.top - margin.bottom;
const width = svg.attr('width') - margin.right - margin.left;

const es_MX = d3.timeFormatLocale({decimal: ".",thousands: ",",grouping: [3],currency: ["$", ""],dateTime: "%A, %e de %B de %Y, %X",date: "%d/%m/%Y",time: "%H:%M:%S",periods: ["AM", "PM"],days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],shortMonths: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]});

const x = d3.scaleTime()
    .range([0, width]);

const y = d3.scaleLinear()
      .range([height, 100]);

const xAxis = d3.axisBottom()
      .scale(x);
const yAxis = d3.axisLeft(y)
      .ticks(5);

update(data);

function update(data) {

  x.domain(d3.extent(data, function(d) { return d.tiempo; }));
  y.domain([0, d3.max(data, function(d) { return d.precio; })]);
  
  svg.append('g')
      .style('font-family', 'sans-serif')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis);

  d3.select('svg')
    .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(20, 0)')
      .call(yAxis);

}
