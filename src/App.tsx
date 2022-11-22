import styled from '@emotion/styled/macro';
import Calendar from './components/calendar';
import TodoFormModal from './components/todo/TodoFormModal';
import TodoStatisTicsModal from './components/todo/TodoStatisticsModal';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`;

function App() {
  return (
    <div className='App'>
      <Container>
        <Calendar />
      </Container>
      <TodoFormModal />
      <TodoStatisTicsModal />
    </div>
  );
}

export default App;
