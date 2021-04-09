import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { SignIn } from './SignIn'
import { Routes } from '../../routes/index';

describe("SignInUnitTest", () => {
    beforeEach(() => {

        render(
            <SignIn />
        )
        }
    )
    it("Validar o título", () => {
        const element1: HTMLElement[] =  screen.queryAllByText("llllllllllllllll");
        const element2 =  screen.queryByTestId("titulo")
        console.log(element2?.textContent);
        expect(element2).toBeTruthy();
        expect(element2?.textContent).toEqual("Faça seu logon");
    })
})