class TopSellersPage {

    elements = {
        viewMoreBtn: () => cy.get('button', {timeout: 10000}),
        gamesLinks: () => cy.get('#search_resultsRows>a'),
        gamesCountText: () => cy.get('.search_results_filtered_warning').invoke('text')
    }

    clickCheckbox(checkboxName) {
        cy.get(`div[data-loc="${checkboxName}"]`).click()
    }

    expandFilter(filter) {
        return cy.contains(filter).click()
    }

    getGameInfo(index = 1) {
        cy.get(`#search_resultsRows>a:nth-child(${index})`).within(() => {
            cy.get('.title').invoke('text').as('listTitle', { type: 'static' })
            cy.get('.search_released').invoke('text').as('listDate', { type: 'static' })
            cy.get('.discount_final_price').invoke('text').as('listPrice', { type: 'static' })
        })
    }

    openGameCart(index = 1) {
        cy.get(`#search_resultsRows>a:nth-child(${index})`).click()
    }
}

export default TopSellersPage