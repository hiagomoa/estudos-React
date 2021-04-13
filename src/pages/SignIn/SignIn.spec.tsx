import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks'
import { SignIn } from './SignIn'
import {ContextLogin, ContextLoginProvider} from '../../context/ContextLogin'


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
  
  

//   describe("TESTE", ()=>{
//     const {result}  = renderHook(() => ContextLoginProvider);
//     console.log("MEU RESULT:" + result.current)
//   })

 // jest.mock(React.useContext, )
 

describe("SignInUnitTest", () => {
    let realUseContext
    let useContextMock
    beforeEach(() => {
        realUseContext = React.useContext;
        
       //useContextMock = React.useContext = ()=>({logged: true})
    });


    it("VAlidar", async ()=>{
        const { getByPlaceholderText, getByText} = render(<SignIn />);
        const { result, waitForNextUpdate } = renderHook(ContextLoginProvider);
       //

    const emailField = getByPlaceholderText('Email');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');
    // const emailField = screen.getAllByTestId("id-email")
    // const passwordField = screen.getAllByTestId("id-email")

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);
    // await waitFor(() => {
    //     expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    //   });

    })
})