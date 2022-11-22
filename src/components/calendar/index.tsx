import { useMemo } from 'react';
import styled from '@emotion/styled/macro';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { DAYS, MONTHS } from '../../utils/constant';
import { useRecoilCallback, useRecoilState } from 'recoil';
import {
  selectedDateState,
  selectedTodoState,
  todoListState,
} from '../../modules/TodoList';
import CalendarDay from './CalendarDay';
import { useEffect } from 'react';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  padding: 8px 24px;
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  color: #f8f7fa;
`;

const ArrowButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #f8f7fa;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  padding-block: 12px;
  > tr {
    > th {
      padding-block: 12px;
      font-weight: normal;
      color: #f8f7fa;
    }
  }
`;

const TableBody = styled.tbody`
  > tr {
    > td {
      width: 128px;
      height: 128px;
    }
  }
`;

const TableData = styled.td`
  position: relative;
  padding: 8px;
  text-align: center;
  color: #c9c8cc;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;
  width: 100%;
  height: 100vh;
  background-color: #28272a;
  ${Header} + ${Table} {
    margin-top: 36px;
  }
`;

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

  const { year, month, firstDay, lastDay } = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    return { year, month, firstDay, lastDay };
  }, [selectedDate]);

  const removeTodo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const todoList = snapshot.getLoadable(todoListState).getValue();
        const selectedTodo = snapshot.getLoadable(selectedTodoState).getValue();
        const newTodoList = todoList.filter(
          (todo) => todo.id !== selectedTodo?.id
        );
        set(todoListState, newTodoList);
      },
    [selectedDate]
  );

  useEffect(() => {
    const onBackspaceKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        removeTodo();
      }
    };

    window.addEventListener('keydown', onBackspaceKeyDown);

    return () => {
      window.removeEventListener('keydown', onBackspaceKeyDown);
    };
  });

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const pad = Array.from({ length: firstDay.getDay() }, (v, i) => i).map(
    (n) => <TableData key={`pad_${n}`} />
  );

  const range = Array.from({ length: lastDay.getDate() }, (v, i) => i).map(
    (d) => {
      const date = new Date(year, month, d + 1);

      return <CalendarDay key={d} date={date} />;
    }
  );

  const render = () => {
    const items = [...pad, ...range];
    const weeks = Math.ceil(items.length / 7);

    return Array.from({ length: weeks }, (v, i) => i).map((week) => (
      <tr key={`week_${week}`}>{items.slice(week * 7, week * 7 + 7)}</tr>
    ));
  };

  return (
    <Base>
      <Header>
        <ButtonContainer>
          <ArrowButton
            onClick={() =>
              selectDate(
                new Date(selectedDate.setMonth(selectedDate.getMonth() - 1))
              )
            }
          >
            <BiChevronLeft />
          </ArrowButton>
          <Title>{`${MONTHS[month]} ${year}`}</Title>
          <ArrowButton
            onClick={() =>
              selectDate(
                new Date(selectedDate.setMonth(selectedDate.getMonth() + 1))
              )
            }
          >
            <BiChevronRight />
          </ArrowButton>
        </ButtonContainer>
      </Header>
      <Table>
        <TableHeader>
          <tr>
            {DAYS.map((day, idx) => (
              <th key={idx} align='center'>
                {day}
              </th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>{render()}</TableBody>
      </Table>
    </Base>
  );
};

export default Calendar;
