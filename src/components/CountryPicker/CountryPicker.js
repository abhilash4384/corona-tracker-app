import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api";
import DropDownPicker from "react-native-dropdown-picker";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./Styles";

const CountryPicker = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetechedCountries] = useState([]);
  const [state, setState] = useState({
    query: "",
  });

  useEffect(() => {
    const fetchAPI = async () => {
      const result = await fetchCountries();
      const countries = result.map((country) => ({
        label: country,
        value: country,
      }));
      setFetechedCountries(countries);
    };

    fetchAPI();
  }, []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        searchable={true}
        searchablePlaceholder="Search Country..."
        searchableError="Not Found"
        items={fetchedCountries}
        defaultValue={""}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#f3f3f3" }}
        dropDownStyle={{ backgroundColor: "#fff",  zIndex: 15,
        elevation: 10 }}
        onChangeItem={(item) =>
          setState({
            country: item.value,
          })
        }
      />
    </View>
  );
};

export default CountryPicker;
