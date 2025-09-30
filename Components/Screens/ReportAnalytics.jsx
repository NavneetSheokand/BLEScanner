import React from 'react';
import { Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles';

const ReportsAnalytics = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContent}>
        <Icon name="analytics" size={64} color="#8b5cf6" />
        <Text style={styles.screenTitle}>Reports & Analytics</Text>
        <Text style={styles.screenSubtitle}>View detailed reports and analytics</Text>
      </View>
    </SafeAreaView>
  );
};

export default ReportsAnalytics;