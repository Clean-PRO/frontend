import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    handleClickOrders: state => {
      state.linkView = 'orders'
      state.tab = 'new'
    },
    handleClickServices: state => {
      state.linkView = 'services'
      state.tab = 'services'
    },
    handleClickStaff: state => {
      state.linkView = 'staff'
      state.tab = 'cleaners'
    },
    handleClickStatistics: state => {
      state.linkView = 'statistics'
    },
    handleClickNew: state => {
      state.tab = 'new'
    },
    handleClickCurrent: state => {
      state.tab = 'current'
    },
    handleClickCompleted: state => {
      state.tab = 'completed'
    },
    handleClickСancelled: state => {
      state.tab = 'cancelled'
    },
    handleClickCleaners: state => {
      state.tab = 'cleaners'
    },
    handleClickPackages: state => {
      state.linkView = 'packages'
      state.tab = 'packages'
    },
    handleClickSchedule: state => {
      state.tab = 'schedule'
    },
    handleClickCleanerCard: state => {
      state.linkView = 'cleanerCard'
    },
    handleClickNewCleaner: state => {
      state.linkView = 'newCleaner'
    },
  },
})

export const {
  handleClickOrders,
  handleClickServices,
  handleClickStaff,
  handleClickStatistics,
  handleClickNew,
  handleClickCurrent,
  handleClickCompleted,
  handleClickСancelled,
  handleClickCleaners,
  handleClickSchedule,
  handleClickPackages,
  handleClickCleanerCard,
  handleClickNewCleaner,
} = adminSlice.actions
export default adminSlice.reducer
