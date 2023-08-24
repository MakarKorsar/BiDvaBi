import { Locator, Page } from '@playwright/test';
//import { __Globals } from '../../../global/global-envs';
import { Login } from './PagesTypes';

export class LoginPage implements Login {
    readonly page: Page;
    private readonly inputEmail: Locator;
    private readonly inputPassword: Locator;
    private readonly buttonSignIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.getByLabel('Email');
        this.inputPassword = page.getByLabel('Password');
        this.buttonSignIn = page.getByRole('button', { name: 'Sign In' });       
    }

    async goto(pageUrl?: string) {
            await this.page.goto('');
        }

    async autorizationByEmailPassword(email: string, password: string) {
        await this.inputEmail.click();
        await this.inputEmail.fill(email);
        await this.inputPassword.click();
        await this.inputPassword.fill(password);        
        await this.buttonSignIn.click();
        }


}
