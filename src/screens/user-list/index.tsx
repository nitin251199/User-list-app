import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import { User } from '../../@types/common';
import UserCard from './components/UserCard';
import SearchBar from './components/SearchBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUsersAsync } from '../../store/actions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../@types/navigation';
import { Routes } from '../../navigation/routes';

const LIMIT = 5;

const UserList = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Routes.UserList>>();
  const { users, loading } = useAppSelector(state => state.user);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>(users);

  const [page, setPage] = React.useState(1);

  const listRef = React.useRef<FlatList>(null);

  const fetchUsers = async () => {
    try {
      dispatch(getUsersAsync({ page, limit: LIMIT }));
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'Failed to fetch users. Please try again later.');
    }
  };

  const handleSearchChange = useCallback(
    (text: string) => {
      if (text) {
        const filteredUsers = [...users].filter(user =>
          user.name.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredUsers(filteredUsers);
      } else {
        setPage(1);
        setFilteredUsers([]);
      }
    },
    [users],
  );

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const navigateToUserDetails = (id: User['id']) => {
    navigation.navigate(Routes.UserDetail, { id });
  };

  React.useEffect(() => {
    fetchUsers();
  }, [page]);

  const scrollToTop = () =>
    listRef.current?.scrollToOffset({ offset: 0, animated: true });

  return (
    <View style={styles.container}>
      <View style={{ padding: 16 }}>
        <SearchBar onChange={handleSearchChange} />
      </View>

      <FlatList
        ref={listRef}
        data={filteredUsers.length > 0 ? filteredUsers : users}
        keyExtractor={(_, index) => index?.toString()}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setPage(1);
              setFilteredUsers([]);
            }}
          />
        }
        renderItem={({ item, index }) => (
          <UserCard
            item={item}
            index={index}
            onPress={() => navigateToUserDetails(item.id)}
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        removeClippedSubviews
        ListFooterComponent={
          loading ? (
            <View style={{ padding: 16, alignItems: 'center' }}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : null
        }
      />

      <View style={styles.scrollTopContainer}>
        <Pressable onPress={scrollToTop} style={styles.scrollTopButton}>
          <Text style={styles.scrollTopText}>Scroll To Top</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollTopContainer: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  scrollTopButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollTopText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
