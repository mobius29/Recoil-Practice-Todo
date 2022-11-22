import { atom, atomFamily, selectorFamily } from 'recoil';
import { filteredTodoListState } from './TodoList';

export const TodoStatisTicsModalOpenState = atom<boolean>({
  key: 'TodoStatisTicsModalOpenState',
  default: false,
});

export const todoStatisticsState = atomFamily<
  { total: number; done: number },
  Date
>({
  key: 'todoStatisticsState',
  default: selectorFamily({
    key: 'todoStatisticsState/Default',
    get:
      (selectedDate) =>
      ({ get }) => {
        const todoList = get(filteredTodoListState(selectedDate));

        return {
          total: todoList.length,
          done: todoList.filter((todo) => todo.done).length || 0,
        };
      },
  }),
});
