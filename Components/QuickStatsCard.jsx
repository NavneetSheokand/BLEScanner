import React from 'react';
import { View,  Text} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';


const QuickStatsCard = ({ title, value, iconName, valueColor = 'white', showWarning = false }) => {
  return (
    <View style={styles.statsCard}>
      <View style={styles.statsHeader}>
        <Text style={styles.statsTitle}>{title}</Text>
        {iconName && <MaterialIcon name={iconName} size={20} color="#8b5cf6" />}
      </View>
      <View style={styles.statsValueContainer}>
        <Text style={[styles.statsValue, { color: valueColor }]}>{value}</Text>
        {showWarning && <MaterialIcon name="warning" size={16} color="#f59e0b" />}
        {title === 'Total Stock Value' && (
          <MaterialIcon name="trending-up" size={16} color="#10b981" style={styles.trendIcon} />
        )}
      </View>
    </View>
  );
};

export default QuickStatsCard;