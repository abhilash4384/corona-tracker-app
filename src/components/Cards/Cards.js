import React from "react";
import { View, Text } from "react-native";
import AnimateNumber from "react-native-animate-number";

import styles from "./Styles";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return <Text>Loading....</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={[...styles.card, ...styles.infected]}>
        <Text color="textSecondary" gutterBottom>
          Infected
        </Text>
        <AnimateNumber value={confirmed.value} />
        <Text color="textSecondary">{new Date(lastUpdate).toDateString()}</Text>
      </View>
      <View style={[...styles.card, ...styles.recovered]}>
        <Text color="textSecondary" gutterBottom>
          Recovered
        </Text>
        <AnimateNumber value={recovered.value} />
        <Text color="textSecondary">{new Date(lastUpdate).toDateString()}</Text>
      </View>
      <View style={[...styles.card, ...styles.deaths]}>
        <Text color="textSecondary" gutterBottom>
          Deaths
        </Text>
        <AnimateNumber value={deaths.value} />
        <Text color="textSecondary">{new Date(lastUpdate).toDateString()}</Text>
      </View>
    </View>
  );
};

export default Cards;
