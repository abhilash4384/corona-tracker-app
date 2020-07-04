import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Cards, CountryPicker } from "./src/components";
import styles from "./Styles";
import { fetchData } from "./src/api";
import { SafeAreaProvider } from "react-native-safe-area-context";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
    console.log("component did mount = ", fetchedData);
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={{ height: 40 }} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Cards data={data} />
          {/* {data && (
            <>
              <CountryPicker handleCountryChange={this.handleCountryChange} />
            </>
          )} */}

          {/* <Chart data={data} country={country} /> */}
        </ScrollView>
      </View>
    );
  }
}

export default App;
