import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { View, Dimensions, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import _ from "lodash";
import CustomLineChart from "../CustomLineChart/CustomLineChart";
import CustomBarChart from "../CustomBarChart.js/CustomBarChart";

import Styles from "./Styles";

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
    isLoading: true,
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
        isLoading: false,
      });
    };
    fetchAPI();
  }, []);

  return (
    <>
      {!state.isLoading ? (
        <>
          {!country ? (
            <>
              <View style={Styles.chartContainerStyle}>
                <CustomLineChart
                  labels={state.labels}
                  data={state.infectedData}
                  backgroundColor="#e26a00"
                  backgroundGradientFrom="#fb8c00"
                  backgroundGradientTo="#ffa726"
                  chartLabel={"Total Monthly Infected People By Covid"}
                />
              </View>

              <View style={Styles.chartContainerStyle}>
                <CustomLineChart
                  labels={state.labels}
                  data={state.deaths}
                  backgroundColor="#F00820"
                  backgroundGradientFrom="#F25263"
                  backgroundGradientTo="##E11E33"
                  chartLabel={"Total Monthly Death Rate By Covie"}
                />
              </View>
            </>
          ) : (
            <View style={Styles.chartContainerStyle}>
              <CustomBarChart
                chartLabel={"Graphical Analysis"}
                confirmed={confirmed}
                recovered={recovered}
                deaths={deaths}
              />
            </View>
          )}
        </>
      ) : (
        <View style={Styles.chartContainerStyle}>
          <Text>Loading Charts....!</Text>
        </View>
      )}
    </>
  );
};

export default Chart;
