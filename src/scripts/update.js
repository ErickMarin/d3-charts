/*jshint esversion: 6 */

const width = document.querySelector("svg").clientWidth;
const height = document.querySelector("svg").clientHeight;
const margin = {top:50, left:50, bottom:50, right:50 };


axisUpdateExample1();

function axisUpdateExample1() {
    const svg = d3.select("#svg");

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleLinear();

    const xAxisCall = d3.axisBottom();
    const yAxisCall = d3.axisLeft();

    setScale1();
    initAxis();

    setInterval(toggle(
        function(){
            setScale2();
            updateAxis();
        },
        function(){
            setScale1();
            updateAxis();

        }), 2000);

    function setScale1(){
        xScale.domain([0, 1000]).range([0, width-(margin.top+margin.bottom)]);
        yScale.domain([0, 1000]).range([height-(margin.top+margin.bottom), 0]);
        xAxisCall.scale(xScale);
        yAxisCall.scale(yScale);   
    }

    function setScale2(){
        xScale.domain([0, 100]).range([0, width-(margin.top+margin.bottom)]);
        yScale.domain([0, 100]).range([height-(margin.top+margin.bottom), 0]);
        xAxisCall.scale(xScale);
        yAxisCall.scale(yScale);
    }


    function initAxis() {
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+[margin.left, height-margin.top]+")")
            .call(xAxisCall);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+[margin.left, margin.top]+")")
            .call(yAxisCall);
    }

    function updateAxis(){
        const t = d3.transition()
            .duration(500);
        
        svg.select(".x")
            .transition(t)
            .call(xAxisCall);
        
        svg.select(".y")
            .transition(t)
            .call(yAxisCall);
        
    }    
}    

function toggle() {
    let fn = arguments;
    let l = arguments.length;
    let i = 0;
    return function() {
        if(l <= i) i=0;
        fn[i++]();
    };
}
