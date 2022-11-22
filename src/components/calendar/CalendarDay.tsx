import styled from '@emotion/styled/macro';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import TodoList from '../todo/TodoList';
import { isSameDay } from '../../utils/date';

import { todoFormModalOpenState } from '../../modules/TodoFormModal';
import { TodoStatisTicsModalOpenState } from '../../modules/TodoStatisticsModal';
import {
  filteredTodoListState,
  selectedDateState,
} from '../../modules/TodoList';

const TableData = styled.td`
  position: relative;
  padding: 8px;
  text-align: center;
  color: #c9c8cc;
`;

const DisplayDate = styled.div<{ isToday?: boolean; isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: ${({ isToday }) => isToday && '#f8f7fa'};
  background-color: ${({ isToday, isSelected }) =>
    isSelected ? '#7047eb' : isToday ? '#313133' : ''};
`;

const Container = styled.div``;

interface IProps {
  date: Date;
}

const CalendarDay: React.FC<IProps> = ({ date }) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const todoList = useRecoilValue(filteredTodoListState(date));

  const setTodoFormModalOpen = useSetRecoilState(todoFormModalOpenState);
  const setTodoStatisticsModalOpen = useSetRecoilState(
    TodoStatisTicsModalOpenState
  );

  const handleTodoFormModalOpen = (d: number) => {
    setSelectedDate(new Date(selectedDate.setDate(d)));

    setTodoFormModalOpen(true);
  };

  const handleDateSelect = (d: number) => {
    setSelectedDate(new Date(selectedDate.setDate(d)));
  };

  const handleTodoStatisticsModalOpen = (
    e: React.SyntheticEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    setTodoStatisticsModalOpen(true);
  };

  return (
    <TableData onDoubleClick={() => handleTodoFormModalOpen(date.getDate())}>
      <Container>
        <DisplayDate
          isSelected={isSameDay(selectedDate, date)}
          isToday={isSameDay(today, date)}
          onClick={() => handleDateSelect(date.getDate())}
          onDoubleClick={handleTodoStatisticsModalOpen}
        >
          {date.getDate()}
        </DisplayDate>
        <TodoList items={todoList} />
      </Container>
    </TableData>
  );
};

export default CalendarDay;
