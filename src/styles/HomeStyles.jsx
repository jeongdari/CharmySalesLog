import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 80,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 30,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    salesSummary: {
      marginTop: 10,
      marginBottom: 50,
      padding: 20,
      borderRadius: 5,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      width: '70%',
    },
    salesText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    salesDetail: {
      fontSize: 16,
      color: '#333',
      marginLeft: 10,
      marginBottom: 5,
      textAlign: 'left',
    },
  });