import { Locator, Page } from '@playwright/test';
//import { __Globals } from '../../../global/global-envs';
import { Localizer } from './PagesTypes';

export class LocalizerPage implements Localizer {
    readonly page: Page;
    private readonly trB2BBackoffice: Locator;
    private readonly expandB2BBackoffice: Locator;
    private readonly trLocalizer: Locator;
    private readonly expandLocalizer: Locator;

    private readonly inputObjectName: Locator;
    private readonly inputRussian: Locator;
    private readonly inputEnglish: Locator;
    private readonly buttonSave: Locator;
    
    private readonly buttonExport: Locator;
    private readonly buttonImport: Locator;
    private readonly buttonMove: Locator;
    private readonly buttonCopy: Locator;
    private readonly buttonPaste: Locator;
    private readonly buttonCreate: Locator;
    private readonly buttonDelete: Locator;



    constructor(page: Page) {
        this.page = page;
        
        //this.trB2BBackoffice = page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first();//--
        this.expandB2BBackoffice = page.getByRole('cell', { name: 'B2B Backoffice' }).locator('div').first();
        this.trLocalizer = page.locator('[id="\\31 _3"]').getByRole('cell', { name: 'Localizer' });
        this.expandLocalizer = page.getByRole('cell', { name: 'Localizer' }).locator('div').first();

        this.inputObjectName = page.getByPlaceholder('Object name');
        this.inputRussian = page.getByLabel('Russian');
        this.inputEnglish = page.getByLabel('English');
        this.buttonSave = page.getByRole('button', { name: 'Save' });

        this.buttonExport = page.getByRole('button', { name: 'Export' });
        this.buttonImport = page.getByRole('button', { name: 'Import' });
        this.buttonMove = page.getByRole('button', { name: 'Move' });
        this.buttonCopy = page.getByRole('button', { name: 'Copy' });
        this.buttonPaste = page.getByRole('button', { name: 'Paste' });
        this.buttonCreate = page.getByRole('button', { name: 'Create' });
        this.buttonDelete = page.getByRole('button', { name: 'Delete' });
    }

  /*  async goto(pageUrl?: string) {
        if (pageUrl) {
            await this.page.goto(pageUrl);
        } else {
            await this.page.goto(__Globals.applicationCreateUrl());
        }
    }*/
async goto(pageUrl?: string) {
    await this.page.goto('https://admin-panel.preprod.idynsys.org/localizer/localizer');
}

async click_expandB2BBackoffice (){
    await this.expandB2BBackoffice.click();
}
async click_expandLocalizer (){
    await this.expandLocalizer.click();
}
async click_trLocalizer(){
    await this.trLocalizer.click();
}

async fill_inputObjectName(value){
    await this.inputObjectName.click();
    await this.inputObjectName.fill(value)
}
async fill_inputRussian(value){
    await this.inputRussian.click();
    await this.inputRussian.fill(value)
}
async fill_inputEnglish(value){
    await this.inputEnglish.click();
    await this.inputEnglish.fill(value)
}
async click_buttonSave(){
    await this.buttonSave.click();
}

async click_buttonExport (){
    await this.buttonExport.click();
}
async click_buttonImport (){
    await this.buttonImport.click();
}
async click_buttonMove (){
    await this.buttonMove.click();
}
async click_buttonCopy (){
    await this.buttonCopy.click();
}
async click_buttonPaste (){
    await this.buttonPaste.click();
}
async click_buttonCreate (){
    await this.buttonCreate.click();
}
async click_buttonDelete (){
    await this.buttonDelete.click();
}   

async createTestFolderTestKeyInB2BBackofficeLocalizer(folder_name, key_name, key_nameRU, key_nameEN){
    await this.click_expandB2BBackoffice();
    await this.click_expandLocalizer();
    await this.click_trLocalizer();
    await this.click_buttonCreate();
    await this.fill_inputObjectName(folder_name);
    await this.click_buttonSave();
    await this.page.getByRole('cell', { name: folder_name }).click();
    await this.click_buttonCreate();
    await this.fill_inputObjectName(key_name);
    await this.fill_inputRussian(key_nameRU);
    await this.fill_inputEnglish(key_nameEN);
    await this.click_buttonSave();
    await this.page.getByRole('cell', { name: folder_name }).locator('div').first().click();
}
}
