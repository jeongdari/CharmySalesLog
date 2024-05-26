import Toast from 'react-native-toast-message';

const toastStyles = {
  success: {
    backgroundColor: 'green', // Background color for success toast
    color: 'white', // Text color for success toast
    fontSize: 50, // Font size for success toast
  },
  error: {
    backgroundColor: 'red', // Background color for error toast
    color: 'white', // Text color for error toast
    fontSize: 50, // Font size for error toast
  },
};

export const showToast = (type, text1, text2) => {
  // Apply styles based on the type of toast message
  const options = type === 'success' ? toastStyles.success : toastStyles.error;

  Toast.show({
    type,
    text1,
    text2,
    options,
  });
};
