import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Navigation } from '../../pages/components/Navigation';
import { PIMPage } from '../../pages/PIMPage';

test.describe('PIM Employee Lifecycle', () => {

    test('Should complete a full add-search-delete cycle', async({ page }) => {
        const loginPage = new LoginPage(page);
        const nav = new Navigation(page);
        const pimPage = new PIMPage(page);

        // set up
        await loginPage.navigate();
        await loginPage.login('Admin','admin123');
        await nav.goToPIM();

        const newEmployeeId = await test.step('Add new employee', async() => {
            return await pimPage.addNewEmployee('Ayush', 'Yadav');
        });

        await test.step('Verify employee exists in list', async() => {
            await nav.goToPIM();
            await pimPage.searchEmployeeByID(newEmployeeId);
            const employeeRow = page.locator('.oxd-table-row').filter({ hasText: newEmployeeId });
            await expect(employeeRow).toBeVisible();
        });

        await test.step('Delete employee and verify removal', async() => {
            await pimPage.deleteEmployeeById(newEmployeeId);
            await pimPage.verifyEmployeeNotFoundById(newEmployeeId);
        });
        

    });

});