import { atom, atomFamily, selectorFamily } from 'recoil';
import { isSameDay } from '../utils/date';
import { Todo } from '../utils/type';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const selectedDateState = atom<Date>({
  key: 'selectedDateState',
  default: new Date(),
});

export const selectedTodoState = atom<Todo | null>({
  key: 'selectedTodoState',
  default: null,
});

export const filteredTodoListState = atomFamily<Todo[], Date>({
  key: 'filteredTodoListState',
  default: selectorFamily({
    key: 'filteredTodoListState/Default',
    get:
      (selectedDate) =>
      ({ get }) => {
        const todoList = get(todoListState);

        return todoList.filter((todo) => isSameDay(todo.date, selectedDate));
      },
  }),
});
