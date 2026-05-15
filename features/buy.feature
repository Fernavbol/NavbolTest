Feature: Compra de Productos en SauceDemo

  Background:
    Given que el usuario navega a la página de login
    When ingresa su usuario "standard_user" y contraseña "secret_sauce" y hace clic en login
    Then debe ver el inventario de productos

  Scenario: Agregar un producto al carrito exitosamente
    Given que el usuario está en la página de inventario
    When selecciona el producto "Sauce Labs Backpack"
    And lo agrega al carrito
    Then el producto debe aparecer en el carrito
    And el contador del carrito debe mostrar "1"

  Scenario: Agregar múltiples productos al carrito
    Given que el usuario está en la página de inventario
    When selecciona el producto "Sauce Labs Backpack"
    And lo agrega al carrito
    And selecciona el producto "Sauce Labs Bike Light"
    And lo agrega al carrito
    Then el contador del carrito debe mostrar "2"

  Scenario: Remover un producto del carrito
    Given que el usuario está en la página de inventario
    When selecciona el producto "Sauce Labs Backpack"
    And lo agrega al carrito
    And navega al carrito
    And remueve el producto del carrito
    Then el carrito debe estar vacío
