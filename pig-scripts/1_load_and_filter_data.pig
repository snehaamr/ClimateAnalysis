-- Load the climate data CSV into a relation.

climate_data = LOAD '/data/climate_data.csv' 
              USING PigStorage(',') 
              AS (date:chararray, temperature:float, precipitation:float, location:chararray, country:chararray, year:int);

-- Filter the data to only include records for the United States and the last 50 years (from 1974 to 2024).
filtered_data = FILTER climate_data BY (country == 'United States' AND year >= 1974 AND year <= 2024);

-- Store the filtered data into HDFS for further processing.
STORE filtered_data INTO '/data/output/filtered_climate_data' USING PigStorage(',');
