import React, {memo} from "react";
import { Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const CustomBarChart = (props) => {
  return (
    <>
      <Text style={{
        fontWeight:'bold',
      }}>{props.chartLabel}</Text>
      <BarChart
        data={{

          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              data: [props.confirmed.value, props.recovered.value, props.deaths.value],
            },
          ],
        }}
        
        width={Dimensions.get("window").width-25} // from react-native
        height={250}
        chartConfig={{
          verticalLabelRotation: 10,
          backgroundColor: "#1042EC",
          backgroundGradientFrom: "#1042EC",
          backgroundGradientTo: "#1042EC",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        
        style={{
          margin: 15,
          elevation: 2,
          borderRadius: 5,
        }}
      />
    </>
  );
};

export default memo(CustomBarChart);
