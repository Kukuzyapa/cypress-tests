class Header{

    get aboutButton() {return cy.get('.supernav_container').contains('About')}
}

export default Header