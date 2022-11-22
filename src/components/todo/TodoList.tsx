import styled from '@emotion/styled/macro';
import { Todo } from '../../utils/type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedTodoState } from '../../modules/TodoList';
import { TodoStatisTicsModalOpenState } from '../../modules/TodoStatisticsModal';

const TodoItem = styled.li<{ done?: boolean; selected?: boolean }>`
  padding: 2px 4px;
  width: 100%;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ done, selected }) =>
    selected
      ? 'rgba(112, 71, 235, 1)'
      : done
      ? 'transparent'
      : 'rgba(112, 71, 235, 0.6)'};
  border-radius: 8px;
  font-size: 10px;
  text-decoration: ${({ done }) => done && 'line-through'};
  cursor: pointer;
`;

const EtcItem = styled.li`
  padding: 2px 4px;
  font-size: 10px;
  cursor: pointer;
`;

const Base = styled.ul`
  margin-left: 36px;
  width: 100%;
  height: 60px;

  ${TodoItem} + ${TodoItem} {
    margin-top: 1px;
  }
  ${TodoItem} + ${EtcItem} {
    margin-top: 1px;
  }
`;

interface IProps {
  items: Todo[];
}

const TodoList: React.FC<IProps> = ({ items }) => {
  const selectedTodo = useRecoilValue(selectedTodoState);
  const setSelectedTodo = useSetRecoilState(selectedTodoState);
  const setTodoStatisticsModalOpen = useSetRecoilState(
    TodoStatisTicsModalOpenState
  );

  const handleClick = (e: React.SyntheticEvent<HTMLLIElement>, todo: Todo) => {
    e.stopPropagation();

    setSelectedTodo(
      selectedTodo?.id === todo.id && selectedTodo.date === todo.date
        ? null
        : todo
    );
  };

  const handleTodoStatisticsModal = (
    e: React.SyntheticEvent<HTMLLIElement>
  ) => {
    e.stopPropagation();

    setTodoStatisticsModalOpen(true);
  };

  return (
    <Base>
      {items.slice(0, 3).map((item) => (
        <TodoItem
          key={item.id}
          done={item.done}
          onClick={(e) => handleClick(e, item)}
        >
          {item.content}
        </TodoItem>
      ))}
      {items.length > 3 && (
        <EtcItem onClick={handleTodoStatisticsModal}>{`그 외 ${
          items.length - 3
        }`}</EtcItem>
      )}
    </Base>
  );
};
export default TodoList;
