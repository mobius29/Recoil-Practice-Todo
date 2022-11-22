import styled from '@emotion/styled/macro';
import { useRecoilValue, useRecoilState, useRecoilCallback } from 'recoil';
import { selectedDateState, todoListState } from '../../modules/TodoList';
import { todoFormModalOpenState } from '../../modules/TodoFormModal';
import Modal from '../modal';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { getSimpleDateFormat } from '../../utils/date';

const ModalBody = styled.div`
  padding: 8px;
  width: 100vw;
  max-width: 386px;
`;

const Date = styled.small`
  display: block;
  color: #c9c8cc;
`;

const InputTodo = styled.input`
  padding: 16px 24px;
  border: none;
  width: 100%;
  background-color: transparent;
  color: #c9c8cc;
  caret-color: #c9c8cc;
`;

const Card = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 370px;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  background-color: #19181a;
  ${Date} + ${InputTodo} {
    margin-top: 24px;
  }
`;

const TodoFormModal: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [isOpen, setIsOpen] = useRecoilState(todoFormModalOpenState);

  const selectedDate = useRecoilValue(selectedDateState);
  const todoList = useRecoilValue(todoListState);

  const addTodo = useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const todoList = snapshot.getLoadable(todoListState).getValue();

        const newTodo = {
          id: uuidv4(),
          content: todo,
          done: false,
          date: selectedDate,
        };

        set(todoListState, [...todoList, newTodo]);
      },
    [todo, selectedDate, todoList]
  );

  const handleClose = () => setIsOpen(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
      setTodo('');
      handleClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalBody>
        <Card>
          <Date>{getSimpleDateFormat(selectedDate)}</Date>
          <InputTodo
            placeholder='새로운 이벤트'
            onKeyDown={handleKeyPress}
            onChange={handleChange}
          />
        </Card>
      </ModalBody>
    </Modal>
  );
};

export default TodoFormModal;
