var dataset


var margin = {top: 40, right: 100, bottom: 111, left: 60};
var h = 500 - margin.top - margin.bottom;
var w = 900 - margin.left - margin.right;


var svg = d3.select("body").select("#scatterPlot")
.append("svg")
  .attr("width", w + margin.left +  margin.right)
  .attr("height", h + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")" );

d3.json("C:/Users/AlexanderGerber/Desktop/d3/mtcars.json", function(data) {
  dataset = data; 
  console.log(data);


  var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d.mpg;} )])
    .range([0, w]);

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d.hp;} )])
    .range([h, 0]);

  svg.selectAll("circle") 
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.mpg);} )
    .attr("cy", function(d) { return y(d.hp) })
    .attr("r", 5)
    .attr("fill", "red")

  var xAxis = d3.axisBottom()
    .scale(x);
  var yAxis = d3.axisLeft()
    .scale(y);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 0 + "," + h + ")")
    .call(xAxis)

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")
    .call(yAxis)



svg.selectAll("text") 
  .data(data)
  .enter()
  .append("text")
  .text(function(d) {return "(" + d.hp + ", " + d.mpg + ")"  } )
  .attr("x", function(d) { return x(d.mpg);} )
  .attr("y", function(d) { return y(d.hp); })
  .attr("font-size", 7);

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (h / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("hp")

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (h / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("hp");

  svg.append("text")             
  .attr("transform",
        "translate(" + (w/2) + " ," + 
                       (h + margin.top) + ")")
  .style("text-anchor", "middle")
  .text("Date");



});
