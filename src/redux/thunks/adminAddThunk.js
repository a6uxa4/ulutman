import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'

export const getAdminAdds = createAsyncThunk(
   'adminAdds/getAdminAdds',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/manage/publishes/getAll')
         return data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   },
)

export const deleteAdminAds = createAsyncThunk(
   'adminAdds/deleteAdds',
   async ({ ids, toggleModal }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete('/manage/publishes/delete/batch', {
            data: ids,
         })

         toggleModal('deleteAllModal')

         dispatch(getAdminAdds())
      } catch (error) {
         rejectWithValue(error.response.data)
      }
   },
)

export const activateAdminAd = createAsyncThunk(
   'adminAdds/activateAd',
   async (publicationId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `/manage/publishes/activate/${publicationId}`,
         )

         return data
      } catch (error) {
         return rejectWithValue(error.response?.data)
      }
   },
)

// export const getName = createAsyncThunk(
//    'adds/getName',
//    async (name, { rejectWithValue }) => {
//       try {
//          const { data } = await axiosInstance.get(
//             `manage/publishes/name/filter`,
//             {
//                params: {
//                   name: name,
//                },
//             },
//          );
//          // dispatch(getAdminAdds());
//          return data;
//       } catch (error) {
//          rejectWithValue(error.response.data);
//       }
//    },
// );

export const getName = createAsyncThunk(
   'adminAdds/getName',
   async (name, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/publishes/name/filter',
            {
               params: {
                  names: name,
               },
            },
         )
         // dispatch(getAdminAdds());
         return data
      } catch (error) {
         return rejectWithValue(error.response.data)
      }
   },
)

export const getAdminFilter = createAsyncThunk(
   'adminAdds/getAdminFilter',
   async ({ categories, createDates, publishStatuses, names }) => {
      try {
         const queryString = new URLSearchParams()

         if (categories) queryString.append('categories', categories)

         if (createDates && Array.isArray(createDates)) {
            createDates.forEach(date => {
               queryString.append('createDates', date)
            })
         }

         if (publishStatuses) {
            queryString.append('publishStatuses', publishStatuses)
         }

         if (names) {
            queryString.append('names', names)
         }

         const { data } = await axiosInstance.get(
            `/manage/publishes/filter?${queryString.toString()}`,
         )

         return data
      } catch (error) {
         return error.message
      }
   },
)

export const getResetFilter = createAsyncThunk(
   'adminAdds/getResetFilter',
   async () => {
      try {
         const { data } = await axiosInstance.get(
            '/manage/publishes/resetFilter',
         )

         return data
      } catch (error) {
         return error.message
      }
   },
)
