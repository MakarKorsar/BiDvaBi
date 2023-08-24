import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LocalizerPage } from '../pages/LocalizerPage';

var url_localizer = 'https://admin-panel.preprod.idynsys.org/localizer/localizer';


const visible_timeout = 30*1000;
// нужно уникальное число для теста бла бла бла 
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

  await localizerPage.click_expandB2BBackoffice();
  await localizerPage.click_expandLocalizer();
  await localizerPage.click_trLocalizer();
  await localizerPage.click_buttonCreate();
  await localizerPage.fill_inputObjectName('TestFolder'+UnicNumber);
  await localizerPage.click_buttonSave();
  await expect(page.getByText('Parent item created successfully')).toBeVisible({timeout:visible_timeout});
  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).click();
  await localizerPage.click_buttonCreate();
  await localizerPage.fill_inputObjectName('TestKey');
  await localizerPage.fill_inputRussian('Test_keyRU');
  await localizerPage.fill_inputEnglish('Test_keyEN');
  await localizerPage.click_buttonSave();
  await expect(page.getByText('Ui item created successfully')).toBeVisible({timeout:visible_timeout});
  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
  await expect(page.getByRole('cell', { name: 'TestKey' })).toBeVisible({timeout:visible_timeout});

  //await localizerPage.createTestFolderTestKeyInB2BBackofficeLocalizer('TestFolder'+UnicNumber,'TestKey','Test_keyRU','Test_keyEN')
});

test('Edit_key', async ({ page }) => {
  const loginPage = new LoginPage (page);
  const localizerPage = new LocalizerPage (page);
  await page.goto(url_localizer);
  await expect(page).toHaveTitle(/B2B/);
  await loginPage.autorizationByEmailPassword('admin@test.com','123456');


  await localizerPage.click_expandB2BBackoffice();
  await localizerPage.click_expandLocalizer();
  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
  await page.getByRole('cell', { name: 'TestKey' }).click();
  await localizerPage.fill_inputObjectName('TestKey_Changed');
  await localizerPage.click_buttonSave();
  await expect(page.getByText('Changes saved')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'TestKey_Changed' })).toBeVisible({timeout:visible_timeout});
  
});

test('Delete_key', async ({ page }) => {
  const loginPage = new LoginPage (page);
  const localizerPage = new LocalizerPage (page);
  await page.goto(url_localizer);
  await expect(page).toHaveTitle(/B2B/);
  await loginPage.autorizationByEmailPassword('admin@test.com','123456');

  await localizerPage.click_expandB2BBackoffice();
  await localizerPage.click_expandLocalizer();
  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
  await page.getByRole('cell', { name: 'TestKey_Changed' }).click();
  await localizerPage.click_buttonDelete();

  await expect(page.getByText('Ui item deleted successfully')).toBeVisible({timeout:visible_timeout});
  await expect(page.getByRole('cell', { name: 'TestKey_Changed' })).not.toBeVisible({timeout:visible_timeout});

  await page.getByRole('cell', { name: 'TestFolder'+UnicNumber }).locator('div').first().click();
  await localizerPage.click_buttonDelete();
  await expect(page.getByText('Parent item deleted successfully')).toBeVisible({timeout:visible_timeout});
  await expect(page.getByRole('cell', { name: 'TestFolder'+UnicNumber })).not.toBeVisible({timeout:visible_timeout*1.5});

});   
