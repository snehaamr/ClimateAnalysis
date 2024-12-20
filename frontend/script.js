// Load the JSON data (replace with actual path to JSON file)
d3.json("path_to_your_json_output/avg_temp_precip_by_year.json").then(function(data) {

    // Parse the data if necessary (e.g., make sure numbers are in the correct format)
    data.forEach(function(d) {
        d.year = +d.year;
        d.avg_temp = +d.avg_temp;
        d.total_precip = +d.total_precip;
    });

    // Set up the margins, width, and height for the charts
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Create scales for the X and Y axes
    const x = d3.scaleLinear()
                .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
                .range([0, width]);

    const yTemp = d3.scaleLinear()
                    .domain([d3.min(data, d => d.avg_temp), d3.max(data, d => d.avg_temp)])
                    .range([height, 0]);

    const yPrecip = d3.scaleLinear()
                      .domain([0, d3.max(data, d => d.total_precip)])
                      .range([height, 0]);

    // Create the SVG container for the charts
    const svgTemp = d3.select("#temperature-chart")
                      .append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const svgPrecip = d3.select("#precipitation-chart")
                         .append("svg")
                         .attr("width", width + margin.left + margin.right)
                         .attr("height", height + margin.top + margin.bottom)
                       .append("g")
                         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Temperature Line Chart
    svgTemp.append("path")
           .data([data])
           .attr("class", "line")
           .attr("d", d3.line()
                         .x(d => x(d.year))
                         .y(d => yTemp(d.avg_temp)));

    svgTemp.append("g")
           .attr("class", "x axis")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(x));

    svgTemp.append("g")
           .attr("class", "y axis")
           .call(d3.axisLeft(yTemp));

    svgTemp.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 0 - margin.left)
           .attr("x", 0 - (height / 2))
           .style("text-anchor", "middle")
           .text("Average Temperature (°C)");

    svgTemp.append("text")
           .attr("x", width / 2)
           .attr("y", height + margin.bottom - 10)
           .style("text-anchor", "middle")
           .text("Year");

    // Precipitation Bar Chart
    svgPrecip.selectAll(".bar")
             .data(data)
           .enter().append("rect")
             .attr("class", "bar")
             .attr("x", d => x(d.year))
             .attr("width", width / data.length - 1)
             .attr("y", d => yPrecip(d.total_precip))
             .attr("height", d => height - yPrecip(d.total_precip));

    svgPrecip.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(d3.axisBottom(x));

    svgPrecip.append("g")
             .attr("class", "y axis")
             .call(d3.axisLeft(yPrecip));

    svgPrecip.append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 0 - margin.left)
             .attr("x", 0 - (height / 2))
             .style("text-anchor", "middle")
             .text("Total Precipitation (mm)");

    svgPrecip.append("text")
             .attr("x", width / 2)
             .attr("y", height + margin.bottom - 10)
             .style("text-anchor", "middle")
             .text("Year");
});
