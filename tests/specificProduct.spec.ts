// load the tool
import {test, expect} from "@playwright/test";


// test 1
test('find specific product', async({page}) => {

    console.log('Test 1');

    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');

    //find the specific product box
    const productCard = page.locator('div').filter({
          has: page.getByText('Black Batman T-shirt')
        }).last();


    await productCard.getByRole('button', { name:'Add to cart'}).click();


    const sidebar = page.locator('div').filter({
        has: page.getByRole('button', { name:'Checkout' })
    });

     // Verify title 'Cart' inside specific container
    await expect(sidebar.locator('span').getByText('Cart')).toBeVisible();

    await expect(sidebar.locator('p').getByText('Black Batman T-shirt').nth(1)).toBeVisible();
    await expect(sidebar.getByText('S | Really Cool T-shirt')).toBeVisible();
    await expect(sidebar.getByText('$ 10.90').first()).toBeVisible();
    

});

// test 2
test('find specific product another way', async({page}) => {

    console.log('Test 2');

    await page.goto('https://react-shopping-cart-67954.firebaseapp.com/');

    await page.locator('div')
    .filter({hasText:'Black Batman T-shirt'})
    .locator('button:has-text("Add to cart")')
    .first()
    .click();

});