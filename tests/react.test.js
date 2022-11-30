import React from "React";
import userEvent from '@testing-library/user-event';
import {
  fireEvent, getByText, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom'
import Ticket from '../client/views/Ticket.js'
// import Dashboard from '../client/views/Dashboard.js'
// import MainPage from '../client/views/MainPage.js'
// import App from '../client/views/App.js'
import {toBeInTheDocument} from '@testing-library/jest-dom/dist/matchers'


describe('Ticket', () => {
  const props = {
    taskTitle: 'task title',
    taskDesc: 'description of the task',
    taskStatus: 'in-progress',
    taskPriority: 1,
    isAdmin: 1,
    renderPageAfterUpdate: jest.fn()
  }

  let ticket;
  beforeEach(() => {
    ticket = render(<Ticket {...props} />);
  })

  test('A Ticket should display a task title, task description, task status, and priority', () => {
    // expect(ticket.findByText('Task Description').nextSibling).toHaveTextContent('description of the task');
    // expect(ticket.toHaveClass('status-bar-wrapper'))
    expect(ticket.getByText('task title')).toHaveClass('taskTitle');
    expect(ticket.getByText('description of the task', {exact:false})).toHaveClass('taskDesc');
    expect(ticket.getByText('in-progress', {exact: false})).toHaveClass('taskStatus');
    expect(ticket.getByText('1', {exact: false})).toHaveClass('taskPriority');
  })

  // if (props.isAdmin === 1){
  test('Admins should be able to update status', () => {
    const pending = ticket.getAllByRole('button', {name: 'Pending'});
    const inProgress = ticket.getAllByRole('button', {name: 'In Progress'});
    const completed = ticket.getAllByRole('button', {name: 'Completed'});
    expect(pending[0]).toHaveClass('pending-btn');
    expect(inProgress[0]).toHaveClass('inprogress-btn');
    expect(completed[0]).toHaveClass('completed-btn'); 
  })

  test('updateStatus function should be called', () => {
    const pending = ticket.getAllByRole('button', {name: 'Pending'});
    const inProgress = ticket.getAllByRole('button', {name: 'In Progress'});
    const completed = ticket.getAllByRole('button', {name: 'Completed'});
    fireEvent.click(pending[0]);
    expect(props.renderPageAfterUpdate).toHaveBeenCalled();
  })
// }
})