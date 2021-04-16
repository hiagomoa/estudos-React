import React, {ComponentType} from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Modal from 'react-modal'


import { render, fireEvent, waitFor, getByTestId, act, screen, waitForElement, queryByText, getByText } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { api } from '../../services/api'
import { SignIn } from '../SignIn/SignIn'
import { createStore } from 'redux';
import reducer from '../../store/modules/auth/reducer';
import { Provider } from 'react-redux';
import { Data } from '../../store/modules/auth/types';

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

const Wrapper = ({ children}: IProps) => (
  <Provider store={store}>{children}</Provider>
);

Enzyme.configure({ adapter: new Adapter() });

describe("SignInUnitTest", () => {
   it("Preencher email e senha de forma correta", async () => { 

    const apiResponse = {"token":"VIXXXXXXXXXXXXXXX","data":{"id":"123567","name":"Hiago55555","email":"hiagof@ciandt.com","password":"1234"}}
     //console.log("Ola Mundo: " + JSON.stringify(result.current.logged))
     apiMock.onPost('auth/searcher').reply(200, apiResponse)
    
     const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
     
     render(<SignIn />, { wrapper: Wrapper as React.ComponentType});
     const emailField = screen.getByPlaceholderText('Email');
     const passwordField = screen.getByPlaceholderText('Senha');
     const buttonElement = screen.getByText('Entrar');
     fireEvent.change(emailField, { target: { value: 'hiagof@ciandt.com' } });
     fireEvent.change(passwordField, { target: { value: '1234' } });
     fireEvent.click(buttonElement);
     //console.log("Foi: " + result.current.loginUser);,   
     //expect(resultText.innerHTML).toBe("2");
     //const value = screen.getByLabelText('Login foi mal sucedido')
     //console.log("Meu valor", value)
     await waitFor(() => {
       expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
     });
   })
 
   


})


