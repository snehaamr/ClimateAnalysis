package com.climate.analysis;

import org.apache.pig.EvalFunc;
import org.apache.pig.data.Tuple;
import org.apache.pig.data.DataByteArray;

public class TemperatureChangeUDF extends EvalFunc<Float> {
    
    @Override
    public Float exec(Tuple tuple) {
        try {
            if (tuple == null || tuple.size() < 2) {
                return null;
            }
            Float tempCurrent = (Float) tuple.get(0);  // Current year's temperature
            Float tempPrevious = (Float) tuple.get(1); // Previous year's temperature

            // If either value is missing, return null.
            if (tempCurrent == null || tempPrevious == null) {
                return null;
            }

            // Calculate the difference between the current and previous year's temperature.
            return tempCurrent - tempPrevious;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
