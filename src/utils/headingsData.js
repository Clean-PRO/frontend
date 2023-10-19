import {
  handleClickNew,
  handleClickCurrent,
  handleClickCompleted,
  handleClickСancelled,
} from '../store/admin/adminSlice'

export const headings = [
  {
    id: 1,
    title: 'Новые',
    count: '',
    handleClick: handleClickNew(),
    handleTab: 'new',
  },
  {
    id: 2,
    title: 'Текущие',
    count: '',
    handleClick: handleClickCurrent(),
    handleTab: 'current',
  },
  {
    id: 3,
    title: 'Завершенные',
    count: '',
    handleClick: handleClickCompleted(),
    handleTab: 'completed',
  },
  {
    id: 4,
    title: 'Отмененные',
    count: '',
    handleClick: handleClickСancelled(),
    handleTab: 'cancelled',
  },
]
