import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserList } from '../../api/modules/user';

export const getUsersAsync = createAsyncThunk(
  'users/getUsers',
  async (data: { page: number; limit: number }) => {
    try {
      return await getUserList(data);
    } catch (error: any) {
      throw new Error('Failed to fetch data');
    }
  },
);
