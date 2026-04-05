import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { showToast } from '../../hooks/useToast'

export const getMyAds = createAsyncThunk(
   'myAds',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `users/my-publishes/getAllMyPublishes`,
         )

         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)

export const myAdvertising = createAsyncThunk(
   'myAds/getMyAds',
   async (__, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('users/my-publishes/my-ads')

         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)

export const RaisingPublication = createAsyncThunk(
   'myAds/raising',
   async (publishId, { getState, rejectWithValue }) => {
      try {
         const { userId } = getState().auth.userData

         const { data } = await axiosInstance.put(
            `users/my-publishes/boost/${publishId}?userId=${userId}`,
         )

         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)

export const deleteSelectedAds = createAsyncThunk(
   'myAds/deleteSelectedAds',
   async ({ userId, selectedIds, t }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `users/my-publishes/delete-by-user/${userId}`,
            {
               data: selectedIds,
            },
         )
         dispatch(getMyAds(userId))
         showToast('success', t('toast.favorite.deleteSuccess'))
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)

export const getRejectedPublishes = createAsyncThunk(
   'myAds/getRejectedPublishes',
   async (_, { getState, rejectWithValue }) => {
      try {
         const { userId } = getState().auth.userData
         const { data } = await axiosInstance.get(
            `users/my-publishes/rejected-publishes/${userId}`,
         )
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)

export const getDeactivatePublishes = createAsyncThunk(
   'myAds/getDeactivatePublishes',
   async (_, { getState, rejectWithValue }) => {
      try {
         const { userId } = getState().auth.userData
         const { data } = await axiosInstance.get(
            `users/my-publishes/inactive-publishes/${userId}`,
         )
         return data
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message)
      }
   },
)
