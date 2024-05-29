import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: isDarkMode ? "#555" : "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 8,
    color: isDarkMode ? '#fff' : '#000',
    backgroundColor: isDarkMode ? '#555' : '#fff',
  },
  submittedData: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: isDarkMode ? "#777" : "#ccc",
    padding: 10,
    backgroundColor: isDarkMode ? '#444' : '#fff',
  },
  deleteButtonWrapper: {
    marginTop: 10,
    borderRadius: 5,
    overflow: "hidden", 
    backgroundColor: isDarkMode ? '#ff4444' : '#ff0000',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
  },
  text: {
    color: isDarkMode ? '#fff' : '#000',
    fontSize: 16,
  }
});
