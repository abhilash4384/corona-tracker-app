import React from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { Cards, CountryPicker, Chart } from "./src/components";
import styles from "./Styles";
import { fetchData } from "./src/api";
import { SafeAreaProvider } from "react-native-safe-area-context";

class App extends React.Component {
  state = {
    data: null,
    country: "",
    isLoading: true,
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    if (fetchData) {
      this.setState({ data: fetchedData, isLoading: false });
      console.log("component did mount = ", fetchedData);
    } else {
      this.setState({ isLoading: false });
    }
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country });
  };

  render() {
    const { data, country, isLoading } = this.state;
    if (!isLoading && data)
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={{ height: 40 }} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Cards data={data} />
            <Chart data={data} country={country} />
          </ScrollView>
        </View>
      );
    else if (!isLoading && !data) {
      return (
        <View style={styles.centralizedView}>
          <Text>API Error....!</Text>
        </View>
      );
    }
    return (
      <View style={styles.centralizedView}>
        <ActivityIndicator size="large" color="#5cb85c" />
      </View>
    );
  }
}

export default App;
