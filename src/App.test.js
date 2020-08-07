const { percySnapshot } = require('@percy/puppeteer')

describe('Mesmer', () => {
  beforeAll(async () => {
    jest.setTimeout(20000)
    await page.goto('http://localhost:3000');
  })

  it('should have loaded', async () => {
    await expect(page.title()).resolves.toMatch('Mesmer');
  })

  it('should create a new project', async () => {
    percySnapshot(page, 'Home');
    await page.waitForSelector('#new-project');
    await page.click('#new-project');
    await page.waitForSelector('#Name');
    await page.type('#Name', 'Test New Project');
    await percySnapshot(page, 'New Project');
    await page.click('#submit-mesmer-form');
    await page.waitForSelector('#project-testnewproject');
    await expect(page).toMatchElement('#project-testnewproject > h1', { text: 'Test New Project' })
  })

  it('should create a new environment', async () => {
    await page.waitForSelector('#project-testnewproject');
    await page.click('#project-testnewproject button');
    await page.click('#project-testnewproject #new-environment')
    await page.waitForSelector('#Name');
    await percySnapshot(page, 'New Environment');
    await page.type('#Name', 'Test New Environment');
    await page.click('#submit-mesmer-form');
    await page.waitForSelector('#environment-testnewenvironment');
    await percySnapshot(page, 'Home w/ Content');
    await expect(page).toMatchElement('#environment-testnewenvironment h3', { text: 'Test New Environment' })
  })
});