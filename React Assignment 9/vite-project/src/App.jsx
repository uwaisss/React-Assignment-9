import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import {
  db,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query
} from './firebase';

const App = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);

  const todosRef = collection(db, 'todos');
  useEffect(() => {
    const q = query(todosRef, orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(items);
    });
    return () => unsub();
  }, []);
  const handleAdd = async () => {
    if (task.trim() === '') return;
    try {
      await addDoc(todosRef, {
        text: task.trim(),
        createdAt: serverTimestamp()
      });
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTask(todo.text);
    setShow(true);
  };
  const handleUpdate = async () => {
    if (!editId) return;
    try {
      await updateDoc(doc(db, 'todos', editId), {
        text: task.trim()
      });
      setTask('');
      setEditId(null);
      setShow(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-primary">React To-Do App (Firebase)</h2>
      <Form className="row g-2 mb-3">
        <div className="col-12 col-sm-9">
          <Form.Control
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="col-12 col-sm-3 d-grid">
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </Form>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex flex-wrap justify-content-between align-items-center"
          >
            <span className="mb-2 mb-sm-0">{todo.text}</span>
            <div>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="mb-3"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
