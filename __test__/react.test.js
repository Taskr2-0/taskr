import React from "React";
import userEvent from '@testing-library/user-event';
import {
  fireEvent, getByText, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom'
import Ticket from '../client/views/Ticket.js'
import {enableFetchMocks} from 'jest-fetch-mock'
enableFetchMocks()
// import Dashboard from '../client/views/Dashboard.js'
// import MainPage from '../client/views/MainPage.js'
// import App from '../client/views/App.js'
import {toBeInTheDocument} from '@testing-library/jest-dom/dist/matchers'
import { ExportContext } from "twilio/lib/rest/bulkexports/v1/export.js";


describe('Ticket', () => {
  const props = {
    taskTitle: 'task title',
    taskDesc: 'description of the task',
    taskStatus: 'in-progress',
    taskPriority: 1,
    isAdmin: 1,
    renderPageAfterUpdate: jest.fn(),
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

  if (props.isAdmin === 1){
  test('Admins should buttons to upstate state', () => {
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
    setTimeout(() =>{expect(props.renderPageAfterUpdate).toHaveBeenCalled()}, 500);
  })
}
if (props.isAdmin === 0){
  test('Users should be able to view current status of ticket', () => {
    expect(screen.getByText('Pending Receipt').toHaveClass('status-bar'));
    expect(screen.getByText('In Progress').toHaveClass('status-bar'));
    expect(screen.getByText('Completed').toHaveClass('status-bar'));
    fireEvent.click(getByText('Completed'));
    expect(props.renderPageAfterUpdate).not.toHaveBeenCalled()
  })
}
//test deleted function
})

describe('Dashboard', () => {
  const props = {
    isAdmin: true,
    userDetails: {
      id: 1,
      email: 'test@test.com',
      first_name: 'Brynn',
      last_name: 'Sakell',
      is_admin: 1,
    }
  }
  let dash;
  beforeEach(() => {
    dash = render(<Dashboard {...props} />);
  })

  if (isAdmin === false){
  test('Users should have button that will render ticketCreator onClick', () => {
      // const newReq = 
      expect(screen.getByRole('form').toHaveClass('modal'))
    })
  }
})