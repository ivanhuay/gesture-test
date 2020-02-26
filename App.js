import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import Gesture from './components/Gesture';
const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const App: () => React$Node = () => {
  const [count, setCount] = useState(2);
  const prevCount = usePrevious(count);
  const onTap = useCallback(() => {
    if (count !== prevCount) {
      setCount(prev => prev + 1);
      console.warn('tap');
    }
  }, [count]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button title="test" onPress={onTap} />
            <Gesture {...{onTap, count}} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
});

export default App;
