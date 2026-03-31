// load the tools
import {test, expect} from '@playwright/test';

// verify add to cart functionality
test('add to cart functionality', async({page}) => {

    // goto URL
    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');

    // find size S and choose it
    await page.getByText('S').first().click();
    
    // find add to cart and click it
    await page.getByText('Add to cart').first().click();

    // locate the sidebar, that has a button named 'Checkout' inside it
    const sidebar = page.locator('div').filter({
        has: page.getByRole('button',{ name: 'Checkout'})
    });

    // Verify title 'Cart' inside specific container
    await expect(sidebar.locator('span').getByText('Cart')).toBeVisible();
    
    // Verify cart total is anything but $ 0.00, since we have items in the cart.
    await expect(sidebar.getByText('$ 0.00')).not.toBeVisible();
});