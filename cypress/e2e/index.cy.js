function mockLocation(latitude, longitude) {
  return {
    onBeforeLoad(win) {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb, err) => {
        if (latitude && longitude) {
          return cb({ coords: { latitude, longitude } });
        }

        throw err({ code: 1 });
      });
    },
    timeout: 20000,
  };
}
describe('IndexPage', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/', mockLocation(38.725, -9.137));

    cy.get('[data-cy="h1-el"]').should('be.visible');
    cy.get('[data-cy="autocomplete-el"]').should('be.visible');
    cy.get('[data-cy="weather-forecast-component"]').should('be.visible');
    cy.get('[data-cy="weather-forecast-component-locale"]').contains('Lisbon');
  });
});
