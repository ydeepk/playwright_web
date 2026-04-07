import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

//=====================================
//Test A - login with valid credentials
//=====================================
test.describe('Login SMOKE Suite',() => {

test('Successful login with valid Credentials', async({page}) => {

    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async() => {
        await loginPage.navigate();
    });

    await test.step('Perform Login with Admin credentials', async() => {
        await loginPage.login('Admin','admin123');
    });

    await test.step('Verify navigation to the Dashboard', async() => {

        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.getByRole('heading',{name: 'Dashboard'})).toBeVisible();

    });


});

}); // test describe scope ends