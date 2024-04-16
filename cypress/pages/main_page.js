import Header from "./forms/header"

class MainPage{

    header = new Header()

    elements = {
        searchInput: () => cy.get('#store_nav_search_term'),
        searchButton: () => cy.get('#store_search_link'),
        newAndInterestingBtn: () => cy.get('#noteworthy_tab'),
        topSellersBtn: () => cy.get('#noteworthy_flyout > div > div:nth-child(1) > a:nth-child(2)')
    }

    visit() {
        cy.visit('/')
    }
    
    searchGame(game){
        this.elements.searchInput().type(game)
        this.elements.searchButton().click()
    }
}

export default MainPage