import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LocalizerPage } from '../pages/LocalizerPage';

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



test('Create_key', async ({ page }) => {
  const loginPage = new LoginPage (page);
  const localizerPage = new LocalizerPage(page);

  await page.goto(url_localizer);
  await expect(page).toHaveTitle(/B2B/);

  await loginPage.autorizationByEmailPassword('admin@test.com','123456');
  /*
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();*/

  await page.goto(url_localizer);


 // await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
  /*await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
  await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestFolder'+UnicNumber);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Object name').click();
  await page.getByPlaceholder('Object name').fill('TestKey');
  await page.getByLabel('Russian').click();
  await page.getByLabel('Russian').fill('Тестовый_ключ');
  await page.getByLabel('English').click();
  await page.getByLabel('English').fill('Test_key');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});
  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestKey' })).toBeVisible({timeout:visible_timeout});*/

  await localizerPage.createTestFolderTestKeyInB2BBackofficeLocalizer('TestFolder'+UnicNumber,'TestKey','Test_keyRU','Test_keyEN')

  });

  test('Edit_key', async ({ page }) => {
    await page.goto(url_localizer);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/B2B/);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.goto(url_localizer);

    await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
    await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
    //await page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' }).click();
    await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
    await page.getByRole('cell', { name: 'TestKey' }).click();
    await page.getByPlaceholder('Object name').click();
    await page.getByPlaceholder('Object name').fill('TestKey_Changed');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Changes saved')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'TestKey_Changed' })).toBeVisible({timeout:visible_timeout});
    
    });

    test('Delete_key', async ({ page }) => {
      await page.goto(url_localizer);
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/B2B/);
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('admin@test.com');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('123456');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.goto(url_localizer);

        await page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first().click();
        await page.getByRole('cell', { name: 'Localizer' }).locator('div').first().click();
        await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
        await page.getByRole('cell', { name: 'TestKey_Changed' }).click();
        await page.getByRole('button', { name: 'Delete' }).click();

        await expect(page.getByText('Ui item deleted successfully')).toBeVisible({timeout:visible_timeout});
        await expect(page.getByRole('cell', { name: 'TestKey_Changed' })).not.toBeVisible({timeout:visible_timeout});

        await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
        await page.getByRole('button', { name: 'Delete' }).click();
        await expect(page.getByText('Parent item deleted successfully')).toBeVisible({timeout:visible_timeout});
        await expect(page.getByRole('cell', { name: 'TestFolder'+UnicNumber })).not.toBeVisible({timeout:visible_timeout*1.5});

      }); 
