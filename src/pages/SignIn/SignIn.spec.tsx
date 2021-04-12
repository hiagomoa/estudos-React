// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react';
// import { SignIn } from './SignIn'


// const mockedHistoryPush = jest.fn();
// const mockedSignIn = jest.fn();

// jest.mock('react-router-dom', () => {
//     return {
//       useHistory: () => ({
//         push: mockedHistoryPush,
//       }),
//       Link: ({ children }: { children: React.ReactNode }) => children,
//     };
//   });
  
//   jest.mock('../../context/ContextLogin', () => {
//     return {
//         loginUser: () => (mockedSignIn),
//         logged: true
//     };
//   });

//   jest.mock(React.useContext, )
 

// describe("SignInUnitTest", () => {
//     let realUseContext
//     let useContextMock
//     beforeEach(() => {
//         realUseContext = React.useContext;
//         useContextMock = React.useContext = ()=>({logged: true,
// })
//     });
//     // beforeEach(() => {

//     //     render(
//     //         <SignIn />
//     //     )
//     //     }
//     // )
//     // it("Validar o título", () => {
//     //     const element1: HTMLElement[] =  screen.queryAllByText("llllllllllllllll");
//     //     const element2 =  screen.queryByTestId("titulo")
//     //     console.log(element2?.textContent);
//     //     expect(element2).toBeTruthy();
//     //     expect(element2?.textContent).toEqual("Faça seu logon");
//     // })
//     it("VAlidar", async ()=>{
//         const { getByPlaceholderText, getByText } = render(<SignIn />);

//     const emailField = getByPlaceholderText('E-mail');
//     const passwordField = getByPlaceholderText('Senha');
//     const buttonElement = getByText('Entrar');

//     fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
//     fireEvent.change(passwordField, { target: { value: '123456' } });

//     fireEvent.click(buttonElement);
//     await waitFor(() => {
//         expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
//       });

//     })
// })