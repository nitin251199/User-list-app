import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { User } from '../../../@types/common';

type UserCardProps = {
  item: User;
  index: number;
  onPress: () => void;
};

const UserCard = ({ item, index, onPress }: UserCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text>
        {index + 1} : {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
