import { test, expect } from '@playwright/test';

var url_localizer = 'https://admin-panel.preprod.idynsys.org/localizer/localizer';

const visible_timeout = 30*1000;


// нужно уникальное число для теста
const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');
const UnicNumber = day + month + year + hours + minutes + seconds;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Can't copy key+
// Can't copy folder with key to key+
// Copy folder with key to folder+
// Copy folder with key to product +++
// Can't copy folder with key to application+
// Can't copy product with folder with key to key+
// Can't copy product with folder with key to folder+
// Copy product with folder with key to product
// Can't copy product with folder with key to application+
// Can't copy application with product with folder with key to key
// Can't copy application with product with folder with key to folder
// Can't copy application with product with folder with key to product
// Copy application with product with folder with key to application

//Key
test('Can not copy key', async ({ page }) => {
  await page.goto(url_localizer);

  //Авторизация
  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);
  await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key_for_copy');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestKey_for_copy' }).click();
  await expect(page.getByRole('button', { name: 'Copy' })).toBeDisabled({timeout:visible_timeout});

  //Удаление артефактов
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().click();
  await page.getByRole('button', { name: 'Delete' }).click();
  
  });
//Folder
test('Can not copy folder with key to key', async ({ page }) => {
    await page.goto(url_localizer);
    //Авторизация
    await expect(page).toHaveTitle(/B2B/);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    await page.goto(url_localizer);
    await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
    await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
    await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
    await page.getByLabel('Russian').click();
    await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
    await page.getByLabel('English').click();
    await page.getByLabel('English').fill('Test_key_for_copy');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

    await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestFolder_for_copy(2)'+UnicNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

    await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestKey_for_copy(2)');
    await page.getByLabel('Russian').click();
    await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования(2)');
    await page.getByLabel('English').click();
    await page.getByLabel('English').fill('Test_key_for_copy(2)');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

    /*await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).locator('div').first().click();
    await page.getByRole('cell', { name: 'TestKey_for_copy' }).click();
    await expect(page.getByRole('button', { name: 'Copy' })).toBeDisabled({timeout:visible_timeout});*/
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByText('Item “TestFolder_for_copy'+UnicNumber+'” copied')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'Test_key_for_copy(2)'+UnicNumber }).click();
    //await page.getByRole('button', { name: 'Paste' }).click();
    //await expect(page.getByText('Item copied')).toBeVisible({timeout:visible_timeout});
    await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});

  
    /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
    //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
   
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    //await delay(5000);
    await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Delete' }).click();  
    
  });  

test('Can copy folder with key to folder', async ({ page }) => {
    await page.goto(url_localizer);
    //Авторизация
    await expect(page).toHaveTitle(/B2B/);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    await page.goto(url_localizer);
    await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
    await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
    await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
    await page.getByLabel('Russian').click();
    await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
    await page.getByLabel('English').click();
    await page.getByLabel('English').fill('Test_key_for_copy');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

    await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestFolder_for_copy(2)'+UnicNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout}); 
  
    /*await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).locator('div').first().click();
    await page.getByRole('cell', { name: 'TestKey_for_copy' }).click();
    await expect(page.getByRole('button', { name: 'Copy' })).toBeDisabled({timeout:visible_timeout});*/
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByText('Item “TestFolder_for_copy'+UnicNumber+'” copied')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Paste' }).click();
    await expect(page.getByText('Item copied')).toBeVisible({timeout:visible_timeout});

  
    await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
    //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);
   
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    //await delay(5000);
    await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Delete' }).click();  
    
  });  

test('Copy folder with key to product', async ({ page }) => {
  await page.goto(url_localizer);

  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);
  await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key_for_copy');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

  /*await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).locator('div').first().click();
  await page.getByRole('cell', { name: 'TestKey_for_copy' }).click();
  await expect(page.getByRole('button', { name: 'Copy' })).toBeDisabled({timeout:visible_timeout});*/

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Item “TestFolder_for_copy'+UnicNumber+'” copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'Foundation' }).click();
  await page.getByRole('button', { name: 'Paste' }).click();
  await expect(page.getByText('Item copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'Foundation' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(2);
  await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);
 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await delay(5000);
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().click();
  await page.getByRole('button', { name: 'Delete' }).click();  
  
  });

test('Can not copy folder with key to application', async ({ page }) => {
    await page.goto(url_localizer);
    //Авторизация
    await expect(page).toHaveTitle(/B2B/);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    await page.goto(url_localizer);
    await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
    await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
    await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
    await page.getByLabel('Russian').click();
    await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
    await page.getByLabel('English').click();
    await page.getByLabel('English').fill('Test_key_for_copy');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByText('Item “TestFolder_for_copy'+UnicNumber+'” copied')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'B2B Backoffice' }).click();
    //await page.getByRole('button', { name: 'Paste' }).click();
    //await expect(page.getByText('Item copied')).toBeVisible({timeout:visible_timeout});
    await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});

  
    /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
    //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
   
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    
  });  
//Product
test('Can not copy product with folder with key to key', async ({ page }) => {
      await page.goto(url_localizer);
      //Авторизация
      await expect(page).toHaveTitle(/B2B/);
      await page.getByLabel('Email').click();
      await page.getByLabel('Email').fill('admin@test.com');
      await page.getByLabel('Password').click();
      await page.getByLabel('Password').fill('123456');
      await page.getByRole('button', { name: 'Sign In' }).click();
    
      await page.goto(url_localizer);
      await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
      await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
      await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
      await page.getByRole('button', { name: 'Create' }).click();
      await page.getByPlaceholder('Object name').click();
      await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
    
      await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
      await page.getByRole('button', { name: 'Create' }).click();
      await page.getByPlaceholder('Object name').click();
      await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
      await page.getByLabel('Russian').click();
      await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
      await page.getByLabel('English').click();
      await page.getByLabel('English').fill('Test_key_for_copy');
      await page.getByRole('button', { name: 'Save' }).click();
      await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});
    
      await page.getByRole('cell', { name: 'Foundation' }).click();
      await page.getByRole('button', { name: 'Copy' }).click();
      await expect(page.getByText('Item “Foundation” copied')).toBeVisible({timeout:visible_timeout});
    
      await page.getByRole('cell', { name: 'TestKey_for_copy' }).click();
      //await page.getByRole('button', { name: 'Paste' }).click();
      //await expect(page.getByText('Item copied')).toBeVisible({timeout:visible_timeout});
      await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});
  
    
      /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
      //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
      await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
      await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
      await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
     
      await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
      await page.getByRole('button', { name: 'Delete' }).click();
      
  });  
test('Can not copy product with folder with key to folder', async ({ page }) => {
    await page.goto(url_localizer);
    //Авторизация
    await expect(page).toHaveTitle(/B2B/);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    await page.goto(url_localizer);
    await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
    await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
    await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
    await page.getByLabel('Russian').click();
    await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
    await page.getByLabel('English').click();
    await page.getByLabel('English').fill('Test_key_for_copy');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'Foundation' }).click();
    await page.getByRole('button', { name: 'Copy' }).click();
    await expect(page.getByText('Item “Foundation” copied')).toBeVisible({timeout:visible_timeout});
  
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Paste' }).click();
    await expect(page.getByText('Items can not be copied to a lower level')).toBeVisible({timeout:visible_timeout});
    //await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});

  
    /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
    //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
    await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
   
    await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    
}); 
test('Can not copy product with folder with key to application', async ({ page }) => {
  await page.goto(url_localizer);
  //Авторизация
  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);
  await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key_for_copy');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'Foundation' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Item “Foundation” copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'B2B Backoffice' }).click();
  //await page.getByRole('button', { name: 'Paste' }).click();
  //await expect(page.getByText('Items can not be copied to a lower level')).toBeVisible({timeout:visible_timeout});
  await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});


  /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
  //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  
}); 
//Application
test('Can not copy application with product with folder with key to key', async ({ page }) => {
  await page.goto(url_localizer);
  //Авторизация
  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);
  await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key_for_copy');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'B2B Frontoffice' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Item “Foundation” copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestKey_for_copy' }).click();
  //await page.getByRole('button', { name: 'Paste' }).click();
  //await expect(page.getByText('Items can not be copied to a lower level')).toBeVisible({timeout:visible_timeout});
  await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});


  /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
  //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  
}); 
test('Can not copy application with product with folder with key to folder', async ({ page }) => {
  await page.goto(url_localizer);
  //Авторизация
  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);
  await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key_for_copy');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'B2B Frontoffice' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Item “Foundation” copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Paste' }).click();
  await expect(page.getByText('Items can not be copied to a lower level')).toBeVisible({timeout:visible_timeout});
  //await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});


  /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
  //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  
}); 
test('Can not copy application with product with folder with key to product', async ({ page }) => {
  await page.goto(url_localizer);
  //Авторизация
  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);
  await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder_for_copy'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey_for_copy');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ_для_копирования');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key_for_copy');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'B2B Frontoffice' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Item “Foundation” copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Paste' }).click();
  await expect(page.getByText('Items can not be copied to a lower level')).toBeVisible({timeout:visible_timeout});
  //await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});


  /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
  //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  
}); 
test('Can not copy application with product with folder with key to application', async ({ page }) => {
  await page.goto(url_localizer);
  //Авторизация
  await expect(page).toHaveTitle(/B2B/);
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.goto(url_localizer);

  await page.getByRole('cell', { name: 'B2B Frontoffice' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await expect(page.getByText('Item “B2B Frontoffice” copied')).toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'B2B Backoffice' }).click();
  //await page.getByRole('button', { name: 'Paste' }).click();
  //await expect(page.getByText('Items can not be copied to a lower level')).toBeVisible({timeout:visible_timeout});
  await expect(page.getByRole('button', { name: 'Paste' })).toBeDisabled({timeout:visible_timeout});


  /*await page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber }).locator('div').first().click();
  //await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).first().locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestFolder_for_copy(2)'+UnicNumber })).toHaveCount(1);
  await expect(page.getByRole('cell', { name: 'TestKey_for_copy' })).toHaveCount(2);*/
 
  await page.getByRole('cell', { name: 'TestFolder_for_copy'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  
}); 