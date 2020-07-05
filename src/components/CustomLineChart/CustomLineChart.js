import React, {memo} from "react";
import { Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CustomLineChart = (props) => {
  return (
    <>
      <Text style={{
        fontWeight:'bold',

      }}>{props.chartLabel}</Text>
      <LineChart
        data={{
          labels: props.labels,
          datasets: [
            {
              data: props.data,
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        chartConfig={{
          verticalLabelRotation: 10,
          backgroundColor: props.backgroundColor,
          backgroundGradientFrom: props.backgroundGradientFrom,
          backgroundGradientTo: props.backgroundGradientTo,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        horizontalLabelRotation={-50}
        fromZero={true}
        bezier
        style={{
          margin: 5,
          elevation: 2,
          borderRadius: 5,
        }}
      />
    </>
  );
};

export default memo(CustomLineChart);
