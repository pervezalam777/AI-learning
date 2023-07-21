// Chart Configuration
const width = 300;
const height = 200;
const chartRadius = Math.min(width, height) / 2;
const chartCenter = { x: width / 2, y: height };
const colorScale = d3.scaleLinear().domain([0, 100]).range(["red", "green"]);

// Data (replace this with your actual data)
const value = 75;
const max = 100;

// Create an SVG container
const svg = d3.select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a group element to hold the meter chart components
const chartGroup = svg.append("g")
    .attr("transform", `translate(${chartCenter.x}, ${chartCenter.y})`);

// Create the meter chart background arc
const backgroundArc = d3.arc()
    .innerRadius(chartRadius - 20)
    .outerRadius(chartRadius)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);

chartGroup.append("path")
    .attr("class", "background-arc")
    .attr("d", backgroundArc);

// Create the meter chart value arc
const valueArc = d3.arc()
    .innerRadius(chartRadius - 20)
    .outerRadius(chartRadius)
    .startAngle(-Math.PI / 2)
    .endAngle(-Math.PI / 2 + (value / max) * Math.PI);

chartGroup.append("path")
    .attr("class", "value-arc")
    .attr("d", valueArc)
    .style("fill", () => colorScale(value));

// Add labels (optional)
chartGroup.append("text")
    .text("0")
    .attr("class", "label")
    .attr("x", -chartRadius)
    .attr("y", 5);

chartGroup.append("text")
    .text(max)
    .attr("class", "label")
    .attr("x", chartRadius)
    .attr("y", 5);

// Add a pointer (optional)
const pointerWidth = 2;
chartGroup.append("rect")
    .attr("class", "pointer")
    .attr("width", pointerWidth)
    .attr("height", chartRadius - 30)
    .attr("x", -pointerWidth / 2)
    .attr("y", -chartRadius + 30);

// Position the pointer based on the value
const pointerAngle = -Math.PI / 2 + (value / max) * Math.PI;
chartGroup.selectAll(".pointer")
    .attr("transform", `rotate(${pointerAngle * (180 / Math.PI)})`);
