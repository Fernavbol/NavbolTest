Feature: Autenticación de Usuario en SauceDemo

  Scenario: Logueo exitoso con credenciales válidas
    Given que el usuario navega a la página de login
    When ingresa su usuario "standard_user" y contraseña "secret_sauce" y hace clic en login
    Then debe ver el inventario de productos

  Scenario: Logueo fallido con credenciales inválidas
    Given que el usuario navega a la página de login
    When ingresa su usuario "standard_user" y contraseña "pass123" y hace clic en login
    Then debe ver un mensaje de error de autenticación

  Scenario: Logueo fallido con usuario bloqueado
    Given que el usuario navega a la página de login
    When ingresa su usuario "locked_out_user" y contraseña "secret_sauce" y hace clic en login
    Then debe ver un mensaje de error que indique que el usuario se encuentra bloqueado.

