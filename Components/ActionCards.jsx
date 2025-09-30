import React from 'react';
import { Text, TouchableOpacity} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

const ActionCard = ({ title, subtitle, iconName, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.actionCard, { backgroundColor }]}
      onPress={onPress}
    >
      {iconName ? <MaterialIcon name={iconName} size={32} color="white" /> : <Text style={styles.cardNumber}>{subtitle}</Text>}
      <Text style={styles.cardNumber}>{subtitle}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionCard;
