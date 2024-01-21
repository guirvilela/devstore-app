describe('Search products', () => {
  beforeEach(() => {})

  it('should be able to search for product ', () => {
    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"]').first().should('be.visible')
  })

  it('should not be able to visit the ppage without a seach query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
