
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('"Draw" button displays choices section', async () => {
    await driver.findElement(By.id('draw')).click()
    const choicesSection = await driver.findElement(By.id('choices'))
    const displayed = await choicesSection.isDisplayed()
    expect(displayed).toBe(true)
})

test('"Add to Duo" button displays the player duo section', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.findElement(By.css('.bot-btn')).click()
    const playerDuoSection = await driver.findElement(By.id('player-duo'))
    const displayed = await playerDuoSection.isDisplayed()
    expect(displayed).toBe(true)
})

test('"Add to Duo" button displays the player duo section', async () => {
    await driver.findElement(By.id('draw')).click()
    await driver.findElement(By.css('.bot-btn')).click()
    const playerDuoSection = await driver.findElement(By.id('player-duo'))
    const selectedRobotName = await driver.findElement(By.xpath('//div[@id="player-duo"]/div/h3')).getText()
    await driver.findElement(By.xpath('//button[text()="Remove from Duo"]')).click()
    const returnedRobot = await driver.findElement(By.xpath('//div[@id="choices"]/div/h3[contains(text(), ' + selectedRobotName + ')]'))
    await driver.sleep(2000)
    const displayed = await returnedRobot.isDisplayed()
    expect(displayed).toBe(true)
})