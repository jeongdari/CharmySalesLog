import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const BarChartComponent = ({ data, isDarkMode }) => {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString()), // Convert date to locale date string
    datasets: [
      {
        data: data.map(item => item.cardPayment + item.cashPayment),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
    backgroundGradientFrom: isDarkMode ? '#333' : '#fff',
    backgroundGradientTo: isDarkMode ? '#666' : '#fff',
    decimalPlaces: 0, // No decimal places
    color: (opacity = 1) => isDarkMode ? `rgba(26, 255, 146, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => isDarkMode ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0', // Remove dots by setting radius to 0
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // Hide background lines
    },
    barPercentage: 0.5,
    fillShadowGradient: isDarkMode ? '#4CAF50' : '#007AFF',
    fillShadowGradientOpacity: 1,
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <BarChart
        style={{ borderRadius: 16 }}
        data={chartData}
        width={screenWidth - 22}
        height={240}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={45} // Rotate labels for better fit
      />
    </View>
  );
};

export default BarChartComponent;
