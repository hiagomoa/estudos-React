import React from 'react';
import { render, fireEvent, waitFor, getByTestId, act, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {renderHook} from '@testing-library/react-hooks'
import {ContextLogin, ContextLoginProvider, useAuth} from '../../context/ContextLogin'
import {api} from  '../../services/api'
import {SignIn} from '../SignIn/SignIn'

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
    return {
      useAuth: () => ({
        loginUser:jest.fn().mockReturnValue,
        logged:true
      }),
    };
  }); 

describe("SignInUnitTest", () => {
    it("VAlidar", async ()=>{
        const { result } = renderHook(() => useAuth());
        const {logged, loginUser} = useAuth() 
         console.log("Ola Mundo: "+JSON.stringify(result.current.logged))
         act(() => {
            render(<SignIn />)
          })       
    
    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Senha');
    const buttonElement = screen.getByText('Entrar');


    fireEvent.change(emailField, { target: { value: 'hiagof@ciandt.com' } });
    fireEvent.change(passwordField, { target: { value: '1234' } });

    fireEvent.click(buttonElement);
    console.log("Foi: "+result.current.loginUser);
    
    await waitFor(() => {
        expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
        
      });
      
    

    })
})