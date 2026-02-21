import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from '../screens/user-list';
import UserDetail from '../screens/user-detail';
import { RootStackParamList } from '../@types/navigation';
import { Routes } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.UserList} component={UserList} />
      <Stack.Screen name={Routes.UserDetail} component={UserDetail} />
    </Stack.Navigator>
  );
}

export default RootStack;
