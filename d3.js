d3.select("h1").style("color", "red")
    .attr("class", "heading");

d3.select(".heading").style("color", "blue");

var dat = [1, 2, 3, 4, 5]

d3.select("body")
  .selectAll("p") // Since there are no p elements it will return an empty selection. Why is this necessary?
                   // If commented out one p element is missing.
  .data(dat)       // Puts data into waiting state for further processing.    
  .enter()         // Takes data items one by one and performs further operations on them.
  .append("p")     // For each data item a p element is added to the DOM 
  // .text("Repeat this 5 times.") // and some text is added.
  .text( function(x) {return "This is number " + x} );  // Providing a lambda this works similar to map (or R's lapply) 

var bar_dat = [2, 1, 3, 4, 8];


// Bar Chart
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(".bar")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data

data = d3.csv.parse("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
function(d) {console.log(d); } )
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Country; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 13000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Country); })
    .attr("y", function(d) { return y(d.Value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Value); })
    .attr("fill", "#69b3a2")

//})