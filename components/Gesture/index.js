import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Animated, Text, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  backButton: {
    height: 30,
    width: 70,
    backgroundColor: 'yellow',
    borderRadius: 10,
  },
  buttonTitle: {
    padding: 4,
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});
const Gesture = ({onTap, count}) => {
  const [hiddenElms, setHiddenElms] = useState([]);
  const [usage, setUsage] = useState({});
  const handlePress = i => {
    if (onTap) {
      onTap();
    }
    setUsage(prev => {
      const newUsage = {...prev};
      if (!newUsage[i]) {
        newUsage[i] = 0;
      }
      newUsage[i]++;
      return newUsage;
    });
    if (usage[i] > 0) {
      setHiddenElms(prev => [...prev, ...[i]]);
    }
  };
  return (
    <>
      {Array(count)
        .fill(1)
        .map((elm, i) => i)
        .filter(i => {
          console.log('filter: ', hiddenElms.includes(i), i);
          return !hiddenElms.includes(i);
        })
        .map(i => (
          <Animated.View key={i}>
            <TouchableWithoutFeedback
              onPressIn={() => handlePress(i)}
              style={styles.backButton}>
              <Text style={styles.backButton}>
                Button {i}: - {usage[i]} - {count}
              </Text>
            </TouchableWithoutFeedback>
          </Animated.View>
        ))}
    </>
  );
};

export default Gesture;
