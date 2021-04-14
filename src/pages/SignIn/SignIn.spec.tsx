import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Modal from 'react-modal'


import { render, fireEvent, waitFor, getByTestId, act, screen, waitForElement, queryByText, getByText } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks'
import { useAuth, ContextLogin } from '../../context/ContextLogin'
import { api } from '../../services/api'
import { SignIn } from '../SignIn/SignIn'
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

jest.mock('../../context/ContextLogin', () => {
  let logged:boolean;
  return {
    useAuth: () => ({
      loginUser: jest.fn().mockImplementation(()=>{logged=!logged}),
      logged
    }),
  };
});

Enzyme.configure({ adapter: new Adapter() });

describe("SignInUnitTest", () => {
  /* it("VAlidar", async () => {
     const { result } = renderHook(() => useAuth());
     const { logged, loginUser } = useAuth()
     
   
     //console.log("Ola Mundo: " + JSON.stringify(result.current.logged))
     act(() => {
       render(<SignIn />)
     })
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
 
   */
  let container: any;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  it("ERRO com Modal", () => {


    apiMock.onPost('auth/searcher').networkError()

    act(() => {
      ReactDOM.render(<SignIn />, container)
    })

    //const { result } = renderHook(() => useAuth());

    const emailField = container.querySelector('#input1');
    const passwordField = container.querySelector('#input2');
    const buttonElement = container.querySelector('button');
    console.log(buttonElement)
    console.log(emailField)

    // fireEvent.change(emailField, { target: { value: 'hiagof@ciandt.com' } });
    // fireEvent.change(passwordField, { target: { value: '1234' } });

    //console.log("ola1"+screen.getByText('Login foi mal sucedido').innerText);
    //expect(screen.getByText('Login foi mal sucedido')).toBeFalsy()
    act(() => {

      // fireEvent.click(buttonElement);
      buttonElement.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      
    })
    setTimeout(()=>{
      console.log("ola"+container.querySelector('#input5'));
    },1000);
  
   

    // const wrapper = shallow(<SignIn />);
    // console.log(wrapper.find(Modal).getElement().props)





    //     console.log(wrapper.find(Modal).getElement().props)
    // //    console.log(wrapper.find(Modal).getElement().props.children.props.children)

    //     expect(wrapper.find(Modal).getElement())


  })

})


