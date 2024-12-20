# ClimateAnalysis
Climate Data Analysis with Hadoop, Pig, and D3.js

This project processes climate data for the United States over the past 50 years using Apache Pig on Hadoop. It aggregates the average temperature and total precipitation for each year and visualizes the results using D3.js in a web-based dashboard.

Project Structure
The project is organized into the following directories:

arduino
Copy code
climate-analysis/
├── hadoop-pig-scripts/
│   ├── 1_load_and_filter_data.pig
│   ├── 2_analyze_climate.pig
│   └── 3_store_results.pig
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css (optional)
│   └── json_output/
│       └── avg_temp_precip_by_year.json
└── README.md
hadoop-pig-scripts/: Contains the Pig scripts to process and aggregate the climate data.
frontend/: Contains the HTML, JavaScript, and D3.js code to visualize the climate data.
README.md: This file provides an overview of the project.
Prerequisites
Before running this project, ensure you have the following:

Hadoop Cluster: A running Hadoop cluster (either local or distributed).
Apache Pig: Installed and configured to run on Hadoop's MapReduce mode.
D3.js: Used for the frontend to visualize the results.
Hadoop and Pig Setup
Install Hadoop: Hadoop Installation Guide
Install Pig: Pig Installation Guide
Data
This project assumes that you have climate data in a CSV format (climate_data.csv). The data should contain columns such as:

date: The date of the observation (format yyyy-mm-dd).
temperature: The temperature recorded on that day.
precipitation: The precipitation recorded on that day.
location: The location of the observation.
country: The country where the observation was taken.
Setup
Step 1: Upload Climate Data to HDFS
Before running the Pig scripts, upload your climate data to the Hadoop Distributed File System (HDFS).

bash
Copy code
hadoop fs -put /path/to/climate_data.csv /user/data/climate_data.csv
Step 2: Pig Scripts
There are three Pig scripts in the hadoop-pig-scripts/ directory. These scripts are designed to run on Hadoop's MapReduce framework.

1_load_and_filter_data.pig: This script loads the climate data from HDFS and filters it for the United States and the past 50 years.

2_analyze_climate.pig: This script calculates the average temperature and total precipitation for each year.

3_store_results.pig: This script stores the results in JSON format for use by the frontend.

Step 3: Running the Pig Scripts on Hadoop
You can run the scripts on Hadoop using Pig in MapReduce mode. To do this, run the following commands:

bash
Copy code
pig -x mapreduce hadoop-pig-scripts/1_load_and_filter_data.pig
pig -x mapreduce hadoop-pig-scripts/2_analyze_climate.pig
pig -x mapreduce hadoop-pig-scripts/3_store_results.pig

Step 4: Check the Output in HDFS
After running the scripts, the output will be stored in HDFS. Check the output using the following command:
hadoop fs -ls /user/data/output/

You should see a file named avg_temp_precip_by_year.json.

You can view the content of the JSON file by running:
hadoop fs -cat /user/data/output/avg_temp_precip_by_year.json

Step 5: Copy the JSON File Locally
To visualize the results with D3.js, copy the output JSON file from HDFS to your local machine:
hadoop fs -get /user/data/output/avg_temp_precip_by_year.json frontend/json_output/

Step 6: Frontend Visualization
Navigate to the frontend/ directory.
Open the index.html file in a browser to see the interactive graphs.
You can serve the frontend files using a simple HTTP server. If you have Python installed, you can run:

cd frontend
python -m http.server 8000
Then open a browser and navigate to http://localhost:8000/ to view the visualizations.

D3.js Visualization
The frontend includes two D3.js visualizations:

Line Chart for Average Temperature: Displays the average temperature over the years.
Bar Chart for Total Precipitation: Displays the total precipitation over the years.
The script.js file uses D3.js to read the JSON data and render the charts dynamically.

Sample Data for Visualization
The output JSON file (avg_temp_precip_by_year.json) will have the following structure:

[
  { "year": 1970, "avg_temp": 15.6, "total_precip": 112.3 },
  { "year": 1971, "avg_temp": 15.9, "total_precip": 103.5 },
  { "year": 1972, "avg_temp": 16.2, "total_precip": 110.0 },
  { "year": 1973, "avg_temp": 16.1, "total_precip": 98.7 },
  ...
]
year: The year of the data.
avg_temp: The average temperature for that year (in °C).
total_precip: The total precipitation for that year (in mm).
Troubleshooting
Hadoop Issues:

Ensure that Hadoop is running and configured correctly. Check the Resource Manager and NameNode web UIs for errors.
Pig Script Errors:

Check the Pig logs for any syntax or runtime errors. You can use pig -debug for more detailed logs.
JSON Output Not Showing in Visualization:

Make sure the JSON file is in the correct location (frontend/json_output/), and that the path in script.js is correctly pointing to the file.
Missing Libraries:

Final Notes
This project demonstrates how to integrate Pig with Hadoop for large-scale data processing and use D3.js for data visualization.
The Pig scripts can be adjusted to work with other datasets or to calculate additional climate-related metrics.
For large datasets, consider using Parquet or ORC file formats instead of CSV for better performance in Pig.

