import React, { ComponentType } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createMemoryHistory } from "history";
import renderer from 'react-test-renderer';


import { render, fireEvent, waitFor, getByTestId, act, screen, waitForElement, queryByText, getByText } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../services/api'
import { SignIn } from '../SignIn/SignIn'
import { createStore } from 'redux';
import reducer from '../../store/modules/auth/reducer';
import { Provider } from 'react-redux';
import { Data } from '../../store/modules/auth/types';
import { BrowserRouter, Link, MemoryRouter, Router } from 'react-router-dom';

interface IProps {
  children: React.ComponentType | undefined;
}

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();


jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

// jest.mock('../../context/ContextLogin', () => {
//   let logged:boolean;
//   return {
//     useAuth: () => ({
//       loginUser: jest.fn().mockImplementation(()=>{logged=!logged}),
//       logged
//     }),
//   };
// });

const INITIAL_STATE: Data = {
  token: "",
  data: {
    id: "",
    name: "",
    email: "",
  }
}

const store = createStore(reducer, INITIAL_STATE);

const Wrapper = ({ children }: IProps) => (
  <Provider store={store}>{children}</Provider>
);

const history = createMemoryHistory()

const Wrapper1 = ({ children }: IProps) => (
  
  <Provider store={store}>{children}
  <Router history={history}>
    </Router>
    </Provider>

);


Enzyme.configure({ adapter: new Adapter() });

describe("SignInUnitTest", () => {
  it("Preencher email e senha de forma correta", async () => {

    const apiResponse = { "token": "VIXXXXXXXXXXXXXXX", "data": { "id": "123567", "name": "Hiago55555", "email": "hiagof@ciandt.com", "password": "1234" } }
    apiMock.onPost('auth/searcher').reply(200, apiResponse)

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    render(<SignIn />, { wrapper: Wrapper as React.ComponentType });
    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Senha');
    const buttonElement = screen.getByText('Entrar');
    fireEvent.change(emailField, { target: { value: 'hiagof@ciandt.com' } });
    fireEvent.change(passwordField, { target: { value: '1234' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  })

  it("Preencher email e senha de forma incorreta", async () => {

    const apiResponse = { "token": "VIXXXXXXXXXXXXXXX", "data": { "id": "123567", "name": "Hiago55555", "email": "hiagof@ciandt.com", "password": "1234" } }
    apiMock.onPost('auth/searcher').reply(400, apiResponse)

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    render(<SignIn />, { wrapper: Wrapper as React.ComponentType });
    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Senha');
    const buttonElement = screen.getByText('Entrar');
    fireEvent.change(emailField, { target: { value: 'hiagof@ciandt.com' } });
    fireEvent.change(passwordField, { target: { value: '1234' } });
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  })

  it("Clicar no botão de inscrição", async () => {

    const { findByTestId, getByText } = render( <SignIn />, {wrapper: Wrapper1 as React.ComponentType});
    console.log(await findByTestId('id-link'))
    fireEvent.click(await findByTestId('id-link'));
    console.log("HISTORY" + history)

    //expect(getByText('Faça seu Cadastro')).toBeInTheDocument();


    //const teste = render(<SignIn />, { wrapper: Wrapper as React.ComponentType});
    // const testando = component.
    //  console.log("TESTE: " + component.getByTestId('id-link'))
    //  const button1 = screen.getByTestId('id-link');
    // console.log("MEU BUTTON: " + button1.innerHTML)
    // const history = createMemoryHistory();

    //  fireEvent.click(button1);

    //  console.log(history.location)
    // expect(button1.innerHTML).toContain("/signup");


  })

})


