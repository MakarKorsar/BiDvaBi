import { test, expect } from '@playwright/test';

var main_url = 'https://admin-panel.preprod.idynsys.org/dashboard/dashboard';


test('Dashboard is visible', async ({ page }) => {
  await page.goto(main_url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/B2B/);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('admin@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
    await expect(page.locator('css=[data-qa="content_title"]')).toContainText('Dashboard');
  });

  test('Access control is visible', async ({ page }) => {
    await page.goto(main_url);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/B2B/);
      await page.getByLabel('Email').click();
      await page.getByLabel('Email').fill('admin@test.com');
      await page.getByLabel('Password').click();
      await page.getByLabel('Password').fill('123456');
      await page.getByRole('button', { name: 'Sign In' }).click();

      //users-groups
      await page.locator('css=[data-qa="header_side-nav-btn"]').click();  
      await page.locator('css=[data-qa="side-nav-expanded_menu_access-management"]').click(); 
      await page.locator('css=[data-qa="side-nav-expanded_menuItem_users-groups"]').click();  

      await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="content_title"]')).toContainText('User groups');
      await expect(page.locator('css=[data-qa="table"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="table_cell_0x0"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="table_pagination"]')).toBeVisible();

      //users-roles
      await page.locator('css=[data-qa="header_side-nav-btn"]').click();  
      await page.locator('css=[data-qa="side-nav-expanded_menu_access-management"]').click(); 
      await page.locator('css=[data-qa="side-nav-expanded_menuItem_users-roles"]').click();     

      await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="content_title"]')).toContainText('User roles');
      await expect(page.locator('css=[data-qa="table"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="table_cell_0x0"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="table_pagination"]')).toBeVisible();

      //users
      await page.locator('css=[data-qa="header_side-nav-btn"]').click();  
      await page.locator('css=[data-qa="side-nav-expanded_menu_access-management"]').click(); 
      await page.locator('css=[data-qa="side-nav-expanded_menuItem_users"]').click();      

      await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="content_title"]')).toContainText('Users');
      await expect(page.locator('css=[data-qa="table"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="table_cell_0x0"]')).toBeVisible();
      await expect(page.locator('css=[data-qa="table_pagination"]')).toBeVisible();
    });

    test('Localizator is visible', async ({ page }) => {
      await page.goto(main_url);
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/B2B/);
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill('admin@test.com');
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill('123456');
        await page.getByRole('button', { name: 'Sign In' }).click();

        //localizer
        await page.locator('css=[data-qa="header_side-nav-btn"]').click();  
        await page.locator('css=[data-qa="side-nav-expanded_menu_localizer"]').click(); 
        await page.locator('css=[data-qa="side-nav-expanded_menuItem_localizer"]').click();    

        await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
        await expect(page.locator('css=[data-qa="content_title"]')).toContainText('Localizer');
        await expect(page.locator('css=[data-qa="tree-table_toolbar_trash"]')).toBeVisible();
        await expect(page.locator('css=[class="cds--data-table-content"]')).toBeVisible();

        //catalogs-localizer
        await page.locator('css=[data-qa="header_side-nav-btn"]').click();  
        await page.locator('css=[data-qa="side-nav-expanded_menu_localizer"]').click(); 
        await page.locator('css=[data-qa="side-nav-expanded_menuItem_catalogs-localizer"]').click();   
           
        await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
        await expect(page.locator('css=[data-qa="content_title"]')).toContainText('Catalogs localizer');


      
        //languages
        await page.locator('css=[data-qa="header_side-nav-btn"]').click();  
        await page.locator('css=[data-qa="side-nav-expanded_menu_localizer"]').click(); 
        await page.locator('css=[data-qa="side-nav-expanded_menuItem_languages"]').click();  

        await expect(page.locator('css=[data-qa="content_title"]')).toBeVisible();
        await expect(page.locator('css=[data-qa="content_title"]')).toContainText('Languages');
        await expect(page.locator('css=[data-qa="table"]')).toBeVisible();
        await expect(page.locator('css=[data-qa="table_cell_0x0"]')).toBeVisible();
        await expect(page.locator('css=[data-qa="table_pagination"]')).toBeVisible();
    

      }); 

/*test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});*/
