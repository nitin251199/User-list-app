import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../@types/navigation';
import { Routes } from '../../navigation/routes';
import { getUser } from '../../api/modules/user';
import { User } from '../../@types/common';

const UserDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, Routes.UserDetail>>();
  const { id } = route.params;

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUserDetails = async (userId: number) => {
    try {
      setLoading(true);
      const response = await getUser({ id: userId });
      setUser(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      setError('Failed to fetch user details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchUserDetails(id);
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.fullContainer}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.fullContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderUserDetails = (user: User | null, level: number) => {
    if (typeof user === 'object' && user !== null) {
      return (
        <View style={{ gap: 16, padding: level > 1 ? 0 : 16 }}>
          {Object.entries(user).map(([key, value]) => (
            <View key={key} style={styles.row}>
              <Text style={styles.key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Text>
              <Text>{renderUserDetails(value, 2)}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return <Text>{String(user)}</Text>;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {renderUserDetails(user, 1)}
    </ScrollView>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  fullContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  key: {
    fontWeight: 'bold',
  },
});
