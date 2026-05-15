# 🧪 TDD - Playwright + Gherkin

## Estructura del Proyecto

### 📝 Especificación BDD (Gherkin)
```
features/
  └── login.feature        ← Especificación en lenguaje natural
```

### ✅ Implementación de Tests (Playwright)
```
tests/
  └── login.spec.ts        ← Tests ejecutables en TypeScript
```

### 🎯 Page Objects (Abstracción)
```
pages/
  └── LoginPage.ts         ← Interacción con la UI
```

---

## 📋 Mapeo Gherkin → Playwright

### Escenario 1: Logueo exitoso
**Gherkin (login.feature):**
```gherkin
Scenario: Logueo exitoso con credenciales válidas
  Given que el usuario navega a la página de login
  When ingresa su usuario "standard_user" y contraseña "secret_sauce" y hace clic en login
  Then debe ver el inventario de productos
```

**Implementación (login.spec.ts):**
```typescript
test('Login exitoso con credenciales válidas', async ({ page }) => {
  // Arrange + Act (Given + When)
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Assert (Then)
  await expect(page).toHaveURL(/.*inventory/);
});
```

### Escenario 2: Logueo fallido
**Gherkin (login.feature):**
```gherkin
Scenario: Logueo fallido con credenciales inválidas
  Given que el usuario navega a la página de login
  When ingresa su usuario "standard_user" y contraseña "pass123" y hace clic en login
  Then debe ver un mensaje de error de autenticación
```

**Implementación (login.spec.ts):**
```typescript
test('Login no exitoso con credenciales inválidas', async ({ page }) => {
  // Arrange + Act
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.login('standard_user', 'pass123');
  
  // Assert
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
  await expect(errorMessage).toContainText('Username and password do not match any user');
});
```

---

## 🚀 Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar en modo visual (navegador visible)
npm run test:headed

# Ejecutar en modo debug
npm run test:debug

# Ver reporte HTML
npx playwright show-report
```

---

## 📊 Resultados Esperados

```
✅ Login exitoso - Usuario en la página de inventario
✅ Login fallido correctamente - Mensaje de error mostrado
```

---

## 🏗️ Arquitectura

```
TDD Cycle:
┌─────────────────┐
│  1. Escribir    │ ← Gherkin (Especificación)
│     Gherkin     │
└────────┬────────┘
         │
┌────────▼────────┐
│  2. Implementar │ ← Playwright Test
│     Test        │
└────────┬────────┘
         │
┌────────▼────────┐
│  3. Hacer pasar │ ← Code (LoginPage.ts)
│     el Test     │
└─────────────────┘
```

---

## 🎯 Ventajas

✅ **Gherkin**: Legible para no-técnicos (Business Analysts, QA)  
✅ **Playwright**: Rápido, confiable, bien soportado  
✅ **Page Objects**: Mantenible y escalable  
✅ **TDD**: Especificación clara antes de implementar  

---

## 📚 Próximos Pasos

- Agregar más escenarios en `features/login.feature`
- Crear `pages/ProductsPage.ts` para tests de productos
- Agregar `features/products.feature`
- Implementar `tests/products.spec.ts`
