import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileView: 'profileOrders',
  },
  reducers: {
    handleProfile: state => {
      state.profileView = 'profileForm'
    },
    handleOrder: state => {
      state.profileView = 'profileOrders'
    },
  },
})

export const { handleProfile, handleOrder } = profileSlice.actions

export default profileSlice.reducer
