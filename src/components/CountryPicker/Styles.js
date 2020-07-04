import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
  container: {
    paddingTop: 15,
  },
  itemText: {
    fontSize: 15,
    margin: 2
  }
});

export default styles;
