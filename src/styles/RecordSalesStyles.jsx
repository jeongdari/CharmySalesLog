import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 8,
  },
  submittedData: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  deleteButtonWrapper: {
    marginTop: 10,
    borderRadius: 5,
    overflow: "hidden", 
  },
});
