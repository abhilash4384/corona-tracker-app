import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 100,
    margin: "4%",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    shadowColor: '#808080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  infected: {
    backgroundColor: "#f0ad4e",
  },
  recovered: {
    backgroundColor: "#5cb85c",
  },
  deaths: {
    backgroundColor: "#d9534f",
  },

  textStyle: {
    color: '#fff',
    fontSize: 16,
  }
});

export default styles;
