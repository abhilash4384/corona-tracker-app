import React, {memo} from "react";
import { View, Text, } from "react-native";
import AnimateNumber from "react-native-animate-number";

import styles from "./Styles";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  console.log('called..!');
  return (
    <View style={styles.container}>
      <View style={{ ...styles.card, ...styles.infected }}>
        <Text style={styles.textStyle} gutterBottom>
          Infected By Covid
        </Text>
        <Text style={styles.textStyle}>
          <AnimateNumber interval={10} value={confirmed.value} />
        </Text>
        <Text style={styles.textStyle}>
          {new Date(lastUpdate).toDateString()}
        </Text>
      </View>
      <View style={{ ...styles.card, ...styles.recovered }}>
        <Text style={styles.textStyle} gutterBottom>
          Recovered from Covid
        </Text>
        <Text style={styles.textStyle}>
          <AnimateNumber interval={10} value={recovered.value} />
        </Text>
        <Text style={styles.textStyle}>
          {new Date(lastUpdate).toDateString()}
        </Text>
      </View>
      <View style={{ ...styles.card, ...styles.deaths }}>
        <Text style={styles.textStyle} gutterBottom>
          Deaths by Covid
        </Text>
        <Text style={styles.textStyle}>
          <AnimateNumber interval={10} value={deaths.value} />
        </Text>
        <Text style={styles.textStyle}>
          {new Date(lastUpdate).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default memo(Cards);
