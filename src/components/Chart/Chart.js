import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import _ from "lodash";

import Styles from './Styles';

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Novr",
  "Dec",
];

const Chart = ({ country, data: { confirmed, recovered, deaths } }) => {
  const [state, setState] = useState({
    labels: [],
    deaths: [],
    infectedData: [],
    isLoading: true
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchDailyData();
      response.forEach((dayData) => {
        const d = new Date(dayData.date);
        dayData.month = monthNames[d.getMonth()];
      });
      const dataByMonth = _.groupBy(response, "month");

      const infectedData = [];
      const labels = [];
      const deathsArr = [];
     
      Object.keys(dataByMonth).map((month) => {
        let confirmed = 0;
        let deaths = 0;
       
        dataByMonth[month].forEach((obj) => {
          confirmed += obj.confirmed;
          deaths += obj.deaths;
         
        });
        infectedData.push(confirmed);
        deathsArr.push(deaths);
        labels.push(month);
      });
      setState({
        labels: labels,
        deaths: deathsArr,
        infectedData: infectedData,
        isLoading: false
      });
    };
    fetchAPI();
  }, []);

  const lineChart = () => {
      
    return (
        <>
      <LineChart
        data={{
          labels: state.labels,
          datasets: [
            {
              data: state.infectedData,
            },
         
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={250}
        chartConfig={{
            verticalLabelRotation: 10,  
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={{
          margin: 5,      
          elevation: 2,
        }}
      />
        <Text>Total Infected People </Text>
      </>
    );
  };

  //   const barChart = () => {

  //     return (
  //       <Bar
  //         data={{
  //           labels: ["Infected", "Recovered", "Deaths"],
  //           datasets: [
  //             {
  //               label: "People",
  //               backgroundColor: [
  //                 "rgba(0,0,255, 0.5)",
  //                 "rgba(0,255, 0, 0.5)",
  //                 "rgba(255,0,0, 0.5)",
  //               ],
  //               data: [confirmed.value, recovered.value, deaths.value]
  //             },
  //           ],
  //         }}
  //         options={{
  //           legent: { display: false },
  //           title: { display: true, text: `Current state in ${country}` },
  //         }}
  //       />
  //     );
  //   };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!state.isLoading && lineChart()}
      {/* {dailyData.length && !country ? lineChart(): null} */}
      {/* {dailyData.length && country ? barChart(): null} */}
    </View>
  );
};

export default Chart;
