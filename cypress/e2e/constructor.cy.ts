import { setCookie, deleteCookie } from '../../src/utils/cookie';
describe('Проверяем добавление ингредиента в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  it('Проверяем добавление ингредиента в конструктор', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .common_button')
      .contains('Добавить')
      .click();
    cy.get(':nth-child(4) > :nth-child(1) > .common_button')
      .contains('Добавить')
      .click();
    cy.get(
      '.mJns_Jb07jLke7LQ6UAF.mb-4 > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).contains('Краторная булка N-200i (верх)');
    cy.get(
      '.Hf3gHktDVu9C__6KCbWX > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).contains('Биокотлета из марсианской Магнолии');
    cy.get(
      '.mt-4 > .constructor-element > .constructor-element__row > .constructor-element__text'
    ).contains('Краторная булка N-200i (низ)');
  });
});
describe('Проверяем открытие модальных окон(ингредиентов)', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  it('Проверяем открытие модального окна', () => {
    cy.get('.nwANerpzIt6nknkv21Qj > :nth-child(2) > :nth-child(1)').click();
    cy.get('.G7XCxXE59ujtXU1FO7W1 > .text_type_main-medium').contains(
      'Краторная булка N-200i'
    );
  });
  it('Проверяем закрытие модального окна', () => {
    cy.get('.nwANerpzIt6nknkv21Qj > :nth-child(2) > :nth-child(1)').click();
    cy.get('.G7XCxXE59ujtXU1FO7W1 > .text_type_main-medium').contains(
      'Краторная булка N-200i'
    );
    cy.get('.Z7mUFPBZScxutAKTLKHN').click();
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('not.exist');
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
    cy.get(':nth-child(2) > :nth-child(2) > .common_button')
      .contains('Добавить')
      .click();
    cy.get(':nth-child(4) > :nth-child(2) > .common_button')
      .contains('Добавить')
      .click();
    cy.get(':nth-child(4) > :nth-child(1) > .common_button')
      .contains('Добавить')
      .click();
    cy.get('.button').contains('Оформить заказ').click();
    cy.get('.U070UGjz0x5J0l3NxX3I').should('have.text', '38427');
    cy.get('.Z7mUFPBZScxutAKTLKHN').click();
    cy.get('.xqsNTMuGR8DdWtMkOGiM').should('not.exist');
    cy.get('.OF4tMG36q2aG7QGwf6XA').contains('Выберите булки');
    cy.get('.HEJ0tV35JHL7iuHL89vk > ._W_JfNJJl5H5e8eqr8Ya').contains(
      'Выберите начинку'
    );
    cy.get('.utZ2B1QgZOCmNRbEQvPA').contains('Выберите булки');
  });
});
// 38427
