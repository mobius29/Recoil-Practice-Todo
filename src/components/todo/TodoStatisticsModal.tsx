import styled from '@emotion/styled/macro';
import Modal from '../modal';
import { HiOutlineTrash } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filteredTodoListState,
  selectedDateState,
  todoListState,
} from '../../modules/TodoList';
import {
  TodoStatisTicsModalOpenState,
  todoStatisticsState,
} from '../../modules/TodoStatisticsModal';

const ModalBody = styled.div`
  padding: 8px;
  width: 100vw;
  max-width: 386px;
`;
const Date = styled.small`
  display: block;
  color: #c9c8cc;
`;

const TodoActionButton = styled.button<{ secondary?: boolean }>`
  border: none;
  background-color: transparent;
  color: ${({ secondary }) => secondary && '#ff6b6b'};
  cursor: pointer;
`;

const TodoActions = styled.span`
  flex: 1 0 5%;
`;

const Content = styled.span`
  flex: 1 0 95%;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  color: #c9c8cc;
`;

const TodoList = styled.ul`
  width: 100%;
  list-style: circle;

  ${TodoItem} + ${TodoItem} {
    margin-top: 8px;
  }
`;

const Statistics = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #7047eb;
`;

const Card = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #19181a;

  ${Date} + ${TodoList} {
    margin-top: 24px;
  }
`;

const TodoStatisTicsModal: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [isOpen, setIsOpen] = useRecoilState(TodoStatisTicsModalOpenState);

  const selectedDate = useRecoilValue(selectedDateState);
  const filteredTodoList = useRecoilValue(filteredTodoListState(selectedDate));
  const statistics = useRecoilValue(todoStatisticsState(selectedDate));

  const handleClose = () => setIsOpen(false);

  const removeTodo = (id: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalBody>
        <Card>
          <Date></Date>
          <Statistics>
            할 일 {statistics.total - statistics.done}개 남음
          </Statistics>
          <TodoList>
            {filteredTodoList?.map((todo) => (
              <TodoItem key={todo.id}>
                <Content>{todo.content}</Content>
                <TodoActions>
                  <TodoActionButton
                    secondary
                    onClick={() => removeTodo(todo.id)}
                  >
                    <HiOutlineTrash />
                  </TodoActionButton>
                </TodoActions>
              </TodoItem>
            ))}
          </TodoList>
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default TodoStatisTicsModal;
