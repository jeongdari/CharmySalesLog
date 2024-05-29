import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#fff', 
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: -50,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 20, 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 8,
    backgroundColor: '#f9f9f9', 
  },
  buttonContainer: {
    width: '100%', 
    marginVertical: 10,
  },
  button: {
    width: '100%', 
  },
  toggleButton: {
    marginTop: 5,
    color: '#E67E22',
    textAlign: 'center', 
    fontSize: 18,
  },
});
