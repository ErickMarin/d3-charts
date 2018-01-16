/*jshint esversion: 6 */

let tsvData = null;
const margin = {top: 20, right: 60, bottom: 30, left: 30};
const wWidth = window.innerWidth;
const wHeight = window.innerHeight;
const width = wWidth - margin.left - margin.right;
const height = wHeight - margin.top - margin.bottom;
const parseDate = d3.timeParse('%Y');
<<<<<<< HEAD
const formatSi = d3.format('.3s');
const formatNumber = d3.format('.1f');
=======
const formatSi = d3.format(".3s");
const formatNumber = d3.format(".1f");
>>>>>>> 21175616356363418f9bb9f0047d1d0cb0935b9b
const formatBillion = function(x) {
    return formatNumber(x / 1e9);
};
const x = d3.scaleTime()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

const color = d3.scaleOrdinal(d3.schemeCategory20);
const xAxis = d3.axisBottom()
    .scale(x);

const yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(formatBillion);

const area = d3.area()
    .x(function(d) { 
        return x(d.data.date);
    })
    .y0(function(d) {
        return y(d[0]);
    })
    .y1(function(d) {
        return y(d[1]);
    });

const stack = d3.stack();
<<<<<<< HEAD
const svg = d3.select('.stacked').append('svg')
=======
const svg = d3.select('body').append('svg')
>>>>>>> 21175616356363418f9bb9f0047d1d0cb0935b9b
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.csv('data.csv', function(error, data) {
    color.domain(d3.keys(data[0]).filter(function(key) {
        return key !== 'date';
    }));
    const keys = data.columns.filter(function(key) {
        return key !== 'date';
    });
    data.forEach(function(d) {
        d.date = parseDate(d.date); 
    });
    tsvData = (function() {
        return data;
    })();
    const maxDateVal = d3.max(data, function(d) {
        const vals = d3.keys(d).map(function(key) {
            return key !== 'date' ? d[key] : 0;
        });
        return d3.sum(vals);
    });
    // Set domains for axes
    x.domain(d3.extent(data, function(d) {
        return d.date;
    }));
    y.domain([0, maxDateVal]);
    stack.keys(keys);
    stack.order(d3.stackOrderNone);
    stack.offset(d3.stackOffsetNone);
    console.log(stack(data));

    const browser = svg.selectAll('.browser')
        .data(stack(data))
        .enter().append('g')
        .attr('class', function(d){
            return 'browser ' + d.key;
        })
        .attr('fill-opacity', 0.5);

    browser.append('path')
        .attr('class', 'area')
        .attr('d', area)
        .style('fill', function(d) {
            return color(d.key);
        });

/*     browser.append('text')
        .datum(function(d) {
            return d;
        })
        .attr('transform', function(d) {
            return 'translate(' + x(data[13].date) + ',' + y(d[13][1]) + ')';
        })
        .attr('x', -6)
        .attr('dy', '.35em')
        .style('text-anchor', 'start')
        .text(function(d) {
            return d.key;
        })
        .attr('fill-opacity', 1); */

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    svg.append('text')
        .attr('x', width / 2)
        .text('Emisora');
});
