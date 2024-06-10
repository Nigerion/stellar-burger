import { setCookie, deleteCookie } from '../../src/utils/cookie';
describe('Проверяем добавление ингредиента в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  it('Проверяем добавление ингредиента в конструктор', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="bunTop"]').contains('Краторная булка N-200i (верх)');
    cy.get(
      '[data-testid="ingredient 643d69a5c3f7b9001cfa0941"] > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).contains('Биокотлета из марсианской Магнолии');
    cy.get('[data-testid="bunBottom"]').contains(
      'Краторная булка N-200i (низ)'
    );
  });
});
describe('Проверяем открытие модальных окон(ингредиентов)', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  it('Проверяем открытие модального окна', () => {
    cy.get(
      '[data-testid="643d69a5c3f7b9001cfa093c"] > .J2V21wcp5ddf6wQCcqXv'
    ).click();
    cy.get('[data-testid="modal"]').contains('Краторная булка N-200i');
  });
  it('Проверяем закрытие модального окна', () => {
    cy.get(
      '[data-testid="643d69a5c3f7b9001cfa093c"] > .J2V21wcp5ddf6wQCcqXv'
    ).click();
    cy.get('[data-testid="modal"]').contains('Краторная булка N-200i');
    cy.get('[data-testid="modalClose"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
describe('Проверяем создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    setCookie(
      'accessToken',
      'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjM3ZTRhOTdlZGUwMDAxZDA2NmI1NiIsImlhdCI6MTcxMzcwNjEwNiwiZXhwIjoxNzEzNzA3MzA2fQ.TrNeUs8cAlGlVxM4ygK1_ONeBEVeP5rVbmCt_oo0Lh0'
    );
    localStorage.setItem(
      'refreshToken',
      'a05159916d6ad85d3314a1787a20beb31f4419c5c3ae39f28daab607e40e80b0cd2d3931be53f0ea'
    );
    cy.visit('http://localhost:4000/');
  });
  it('Проверяем создание заказа', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa093d"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa093e"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('[data-testid="643d69a5c3f7b9001cfa0941"] > .common_button')
      .contains('Добавить')
      .click();
    cy.get('.button').contains('Оформить заказ').click();
    cy.get('[data-testid="orderNumber"]').should('have.text', '38427');
    cy.get('[data-testid="modalClose"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
    cy.get('[data-testid="bunTop"]').contains('Выберите булки');
    cy.get('[data-testid="ingredient"]').contains('Выберите начинку');
    cy.get('[data-testid="bunBottom"]').contains('Выберите булки');
  });
  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
// 38427
