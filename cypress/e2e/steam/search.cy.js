/// <reference types="cypress" />

import * as allure from "allure-cypress";
import { Severity } from "allure-js-commons";

import MainPage from "../../pages/main_page"
import AboutPage from "../../pages/about_page"
import TopSellersPage from "../../pages/top_sellers_page"
import GamePage from "../../pages/game_page"


before(() => {
    cy.log('Loading Test Data')
    cy.fixture('steam_test_data').as('test_data')
})

describe('Steam', () => {
    it('Players count', () => {
        allure.description("Compare player count and online count")
        allure.owner("v.popchenko")
        allure.tag("UI")
        allure.severity(Severity.CRITICAL);
        allure.epic("Store")
        allure.feature("About")
        allure.story('Count')
        allure.suite("Bitrix tests");

        let mainPage = new MainPage()
        let aboutPage = new AboutPage()

        allure.step('Visit site', () => {
            mainPage.visit()  // Add base link
        })
        
        allure.step('Click "About"', () => {
            mainPage.header.aboutButton.click()
        })

        allure.step('Compare players count', () => {
            aboutPage.elements.inGameInfo().then((in_game) => {
                aboutPage.elements.onlineInfo().then((online) => {
                    cy.getNumber(in_game.text()).then((in_game_count) => {
                        cy.getNumber(online.text()).then((online_count) => {
                            expect(online_count).to.greaterThan(in_game_count)
                        })
                    })
                })
            })
        })
    })

    it('Top sellers', function () {
        allure.description("Compare game info")
        allure.owner("v.popchenko")
        allure.tag("UI")
        allure.severity(Severity.CRITICAL);
        allure.epic("Store")
        allure.feature("Top rated")
        allure.story('Game info')
        allure.suite("Bitrix tests");

        let mainPage = new MainPage()
        let topSellersPage = new TopSellersPage()
        let gamePage = new GamePage()

        allure.step('Visit site', () => {
            mainPage.visit()  // Add base link
        })

        allure.step('Click "Top sellers"', () => {
            mainPage.elements.newAndInterestingBtn().trigger('mouseover')
            mainPage.elements.topSellersBtn().click()
        })

        allure.step('Click "View more"', () => {
            topSellersPage.elements.viewMoreBtn().click()
        })

        allure.step('Aply filters', () => {
            allure.step('Select "SteamOS + Linux"', () => {
                topSellersPage.clickCheckbox(this.test_data.filters.OS.Linux)
                cy.isCheckboxChecked(this.test_data.filters.OS.Linux)
            })

            allure.step('Select "Coop (Lan)"', () => {
                topSellersPage.expandFilter(this.test_data.filtersCategory.playersCount)
                topSellersPage.clickCheckbox(this.test_data.filters.playersCount.coopLan)
                cy.isCheckboxChecked(this.test_data.filters.playersCount.coopLan)
            })

            allure.step('Select "Action"', () => {
                topSellersPage.clickCheckbox(this.test_data.filters.mark.action)
                cy.isCheckboxChecked(this.test_data.filters.mark.action)
                cy.wait(3000)
            })
        })

        allure.step('Compare games count', () => {
            topSellersPage.elements.gamesLinks().then((games) => {
                topSellersPage.elements.gamesCountText().then((resultText) => {
                    cy.getNumber(resultText).then((playersCount) => {
                        cy.wrap(playersCount).should('eq', games.length)
                    })
                })
            })
        })

        allure.step('Save game info', () => {
            topSellersPage.getGameInfo()
        })

        allure.step('Open first game', () => {
            topSellersPage.openGameCart()
        })
        
        allure.step('Compare games info', () => {
            gamePage.getGameInfo()

            cy.get('@listTitle').then((listTitle) => {
                cy.get('@inGameTitle').then((inGameTitle) => {
                    expect(listTitle).to.contain(inGameTitle)
                })
            })
    
            cy.get('@listPrice').then((listPrice) => {
                cy.get('@inGamePrice').then((inGamePrice) => {
                    expect(inGamePrice).to.contain(listPrice)
                })
            })
    
            cy.get('@listDate').then((listDate) => {
                cy.get('@inGameDate').then((inGameDate) => {
                    expect(listDate).to.contain(inGameDate)
                })
            })
        })
    })
})