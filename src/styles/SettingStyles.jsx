import { StyleSheet } from "react-native";

export const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: isDarkMode ? '#fff' : '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: isDarkMode ? '#fff' : '#000',
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
    color: isDarkMode ? '#ccc' : '#000',
  },
  input: {
    height: 40,
    borderColor: isDarkMode ? '#555' : 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: isDarkMode ? '#fff' : '#000',
    backgroundColor: isDarkMode ? '#555' : '#fff',
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: isDarkMode ? '#777' : 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    padding: 10,
  },
});
