import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import nextId from 'react-id-generator';
import { __addToDo, __deleteTodo } from './redux/modules/todosSlice';
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from './components/styles'; 

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list); 
  const [title, setTitle] = useState(''); 
  const [body, setBody] = useState(''); 

  const onAddTodo = () => {
    if (title && body) {
      const id = nextId(); 
      dispatch(__addToDo({ id, title, body })); 
      resetInputs(); 
    }
  };

  //
  const onDeleteTodo = (id) => {
    dispatch(__deleteTodo(id)); 
  };

  
  const resetInputs = () => {
    setTitle('');
    setBody(''); 
  };

  
  const onChangeTitle = (e) => setTitle(e.target.value);

  
  const onChangeBody = (e) => setBody(e.target.value);

  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
        <InputContainer>
          <span>제목: </span>
          <input
            value={title}
            placeholder="할 일 제목"
            onChange={onChangeTitle}
          />
          <span>내용: </span>
          <input
            value={body}
            placeholder="할 일 내용"
            onChange={onChangeBody}
          />
          <Button onClick={onAddTodo}>+ 추가하기</Button>
        </InputContainer>
        <TodoListContainer>
          {todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
            </TodoCard>
          ))}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
