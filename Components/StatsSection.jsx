import React from 'react';
import {View, Text, } from 'react-native';

import styles from '../styles';
import QuickStatsCard from './QuickStatsCard';

const QuickStatsSection = () => {
  return (
    <View style={styles.quickStatsSection}>
      <Text style={styles.sectionTitle}>Quick Stats</Text>
      <View style={styles.statsGrid}>
        <QuickStatsCard
          title="Total Stock Value"
          value=""
          iconName=""
        />
        <QuickStatsCard
          title="Low Stock Alerts"
          value="12"
          valueColor="#f59e0b"
          showWarning={true}
        />
        <QuickStatsCard
          title="Items In Stock"
          value="456 SKUs"
          iconName="bar-chart"
        />
      </View>
    </View>
  );
};

export default QuickStatsSection;
