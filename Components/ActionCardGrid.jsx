import React from 'react';
import {View} from 'react-native';


import styles from '../styles';
import ActionCard from './ActionCards';


const ActionCardsGrid = ({ navigation }) => {
  return (
    <View style={styles.cardGrid}>
      <ActionCard
        title="CHECK-IN"
        subtitle=""
        iconName="camera-alt"
        backgroundColor="#22c55e"
        onPress={() => navigation.navigate('CheckIn')}
      />
      <ActionCard
        title="CHECK-OUT"
        subtitle=""
        iconName="arrow-forward"
        backgroundColor="#3b82f6"
        onPress={() => navigation.navigate('CheckOut')}
      />
      <ActionCard
        title="INVENTORY ITEMS"
        subtitle=""
        iconName="format-list-bulleted"
        backgroundColor="#06b6d4"
        onPress={() => navigation.navigate('InventoryItems')}
      />
      <ActionCard
        title="REPORTS & ANALYTICS"
        subtitle=""
        iconName=""
        backgroundColor="#8b5cf6"
        onPress={() => navigation.navigate('ReportsAnalytics')}
      />
    </View>
  );
};


export default ActionCardsGrid;