import { handleClickCleaners, handleClickSchedule } from '../store/admin/adminSlice'

export const headings = [
  {
    id: 1,
    title: 'Клинеры',
    handleClick: handleClickCleaners(),
    handleTab: 'cliners',
  },
  {
    id: 2,
    title: 'График работы',
    handleClick: handleClickSchedule(),
    handleTab: 'schedule',
  },
]
