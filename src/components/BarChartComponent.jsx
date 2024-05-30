import React from 'react';
import { View } from 'react-native';
import { StackedBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { G, Line, Rect } from 'react-native-svg';

const BarChartComponent = ({ data, isDarkMode, fontSize, navigation }) => {

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const dates = data.map(item => new Date(item.date).getTime());
  const stackedData = data.map(item => ({
    card: item.cardPayment,
    cash: item.cashPayment,
    date: item.date,
  }));

  const colors = ['#4CAF50', '#FFC107'];
  const keys = ['card', 'cash'];

  const handleBarPress = (date) => {
    navigation.navigate('DetailScreen', { date });
  };

  const CustomGrid = ({ x, y, ticks }) => (
    <G>
      {ticks.map(tick => (
        <Line
          key={tick}
          x1="0%"
          x2="100%"
          y1={y(tick)}
          y2={y(tick)}
          stroke="rgba(255,255,255,0.2)"
        />
      ))}
      {data.map((_, index) => (
        <Line
          key={index}
          y1="0%"
          y2="100%"
          x1={x(index)}
          x2={x(index)}
          stroke="rgba(255,255,255,0.2)"
        />
      ))}
    </G>
  );

  const CustomBar = ({ x, y, width, height, data, index, keys, colors }) => (
    <G key={`bar-${index}`}>
      {keys.map((key, idx) => (
        <Rect
          key={`bar-${index}-${key}`}
          x={x(index)}
          y={y(data[index][key])}
          width={width}
          height={height(data[index][key])}
          fill={colors[idx]}
          onPress={() => handleBarPress(data[index].date)}
        />
      ))}
    </G>
  );

  return (
    <View style={{ height: 300, flexDirection: 'row' }}>
      <YAxis
        data={[...stackedData.map(d => d.card + d.cash)]}
        contentInset={{ top: 20, bottom: 20 }}
        svg={{ fontSize: 10, fill: isDarkMode ? '#fff' : 'grey' }}
        formatLabel={(value) => `$${value}`}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <StackedBarChart
          style={{ flex: 1 }}
          data={stackedData}
          keys={keys}
          colors={colors}
          showGrid={true}
          contentInset={{ top: 20, bottom: 20 }}
          renderCustomBar={(props) => <CustomBar {...props} />}
        >
          <Grid />
          <CustomGrid belowChart={true} />
        </StackedBarChart>
        <XAxis
          style={{ marginTop: 10, height: 60 }}  // Increase height for more space
          data={dates}
          formatLabel={(index) => formatDate(dates[index])}
          contentInset={{ left: 10, right: 10 }}
          svg={{
            fontSize: 10,
            fill: isDarkMode ? '#fff' : 'grey',
            rotation: 90, // Rotate labels for better fit
            originY: 30,  // Adjust vertical position
            y: 28,  // Adjust Y position
          }}
        />
      </View>
    </View>
  );
};

export default BarChartComponent;
