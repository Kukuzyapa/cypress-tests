class GamePage {

    getGameInfo() {
        cy.get('#appHubAppName').invoke('text').as('inGameTitle', { type: 'static' })
        cy.get('.date').invoke('text').as('inGameDate', { type: 'static' })
        cy.get('.game_purchase_price').invoke('text').as('inGamePrice', { type: 'static' })
    }
}

export default GamePage