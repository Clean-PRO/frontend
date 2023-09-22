import { combineReducers } from '@reduxjs/toolkit'
import calculatorSlice from './calculator/calculatorSlice'
import formEntrySlice from './formEntry/formEntrySlice'
import authSlice from './auth/authSlice'
import orderSlice from './order/orderSlice'

export const rootReducer = combineReducers({
  calculator: calculatorSlice,
  formEntry: formEntrySlice,
  auth: authSlice,
  order: orderSlice,
})