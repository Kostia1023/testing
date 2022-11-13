describe('Calculator', () => {
  it('input X', () => {
    cy.visit('http://localhost:8080/')
    cy.get('#size').clear().type('4')
    cy.get('#0').type('1')
    cy.get('#1').type('2')
    cy.get('#2').type('3')
    cy.get('#3').type('4')
    cy.get('#4').type('1')
    cy.get('#5').type('4')
    cy.get('#6').type('9')
    cy.get('#7').type('16')
    cy.get('#x').type('5')
    cy.contains('Лагранж для Х = 25').should("exist")
    cy.contains('Ньютон для Х = 25').should("exist")
    cy.contains('Лагранж для Х = 25').should("exist")
  });
  it('residual term', ()=>{
    cy.contains("All").click()
    cy.contains("Залишковий член ньютона вперед = 3.55").should('exist')
    cy.contains("Залишковий член ньютона назад = 3.73").should('exist')

  })
})