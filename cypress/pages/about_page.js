class AboutPage {
    
    elements = {
        onlineInfo: () => cy.get('.online_stats > :nth-child(1)'),
        inGameInfo: () => cy.get('.online_stats > :nth-child(2)')
    }
}

export default AboutPage