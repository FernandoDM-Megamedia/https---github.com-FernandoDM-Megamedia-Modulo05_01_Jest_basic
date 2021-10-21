# Modulo 05 - Ejercicio JEST obligatorio

Laboratorio Obligatorio de Jest Testing

# Introducción

Partiendo del ejemplo [05-testing/01-react/05-real-project/00-boilerplate](https://github.com/Lemoncode/master-frontend-lemoncode/tree/master/05-testing/01-react/05-real-project/00-boilerplate) del repositorio, recordad que es una copia del proyecto real de origin-front-admin

# Definición del ejercicio Básico

- Añadir tests al mapper `./src/pods/project/project.mapper.ts`

- Añadir tests al componente `./src/common/components/confirmation-dialog/confirmation-dialog.component.tsx`

- Añadir tests al hook `./src/common/components/confirmation-dialog/confirmation-dialog.hook.ts`

# Pasos a seguir

- `npm install` instalacion de paquetes y dependencias:

```bash
npm install
```

- Ejecución de los test:

- `npm run test:watch` ejecución de los test.

```bash
npm run test:watch
```

- `npm run test:watch xxxxxxx.spec.ts` ejecución de cada uno de los test por separado.

```bash
npm run test:watch project.mapper.spec.ts
npm run test:watch confirmation-dialog.component.spec.tsx
npm run test:watch confirmation-dialog.hook.spec.ts
```

## Mapper

- Se agrega el test al mapper `./src/pods/project/project.mapper.ts`:

Se crean los siguientes test:

- Caso undefined.
- Caso null.
- Caso vacio.
- Caso con datos.

### src/pods/project/project.mapper.spec.ts

```javascript
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('PRUEBAS ---------------> MAPPER', () => {
  describe ('casos de prueba del apiModel / viewModel', () => {
    it('nos tiene que retornar .- undefined ', () => {
      // Arrange
      const project: apiModel.Project = undefined;
  
      // Act
      const result: viewModel.Project =  mapProjectFromApiToVm(project);

      // Assert
      expect(result).toEqual(viewModel.createEmptyProject());
    });
    it('nos tiene que retornar .- null ', () => {
      // Arrange
      const project: apiModel.Project = null;
  
      // Act
      const result: viewModel.Project =  mapProjectFromApiToVm(project);

      // Assert
      expect(result).toEqual(viewModel.createEmptyProject())
    });
    it('nos tiene que retornar .- datos', () => {
      // Arrange
      const mockEmployeeSummaryList = [
        {
          id: '1',
          employeeName: 'Daniel Perez',
          isAssigned: true,
        },
        {
          id: '2',
          employeeName: 'Jose Sanchez',
          isAssigned: false,
        },
        {
          id: '3',
          employeeName: 'Javier Benitez',
          isAssigned: false,
        },
        {
          id: '4',
          employeeName: 'María Peña',
          isAssigned: true,
        },
      ];
      const project: apiModel.Project = {
        id: '1',
        name: 'Nombre',
        isActive: true,
        employees: mockEmployeeSummaryList
      };
      // Act
      const result: viewModel.Project =  mapProjectFromApiToVm(project);
      
      // Assert
      const expectedResult: viewModel.Project = {
        id: '1',
        name: 'Nombre',
        isActive: true,
        employees: mockEmployeeSummaryList
      };
      expect(result).toEqual(expectedResult)
    });
  })
});
```
## Component

- Se agrega el test al componente `./src/common/components/confirmation-dialog/confirmation-dialog.component.tsx`:

Se crean los siguientes test:

- Caso existen elementos titulo y botones.
- Caso se pulsa el boton aceptar.
- Caso se pulsa el boton candelar.

### src/common/components/confirmation-dialog/confirmation-dialog.component.spec.tsx

```javascript
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('PRUEBAS ---------------> COMPONENT', () => {
  it('Popup contiene titulo y botones', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept : jest.fn(),
      onClose : jest.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'cerrar',
        acceptButton: 'aceptar'
      }
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const titleElement = screen.getByText(props.title);
    const buttonAceptar = screen.getByRole('button', { name: 'aceptar' });
    const buttonCerrar = screen.getByRole('button', { name: 'cerrar' });

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(buttonAceptar).toBeInTheDocument();
    expect(buttonCerrar).toBeInTheDocument();
  });
  it('Se pulsa el boton de Aceptar', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'cerrar',
        acceptButton: 'aceptar'
      }
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonAceptar = screen.getByRole('button', { name: 'aceptar' });
    userEvent.click(buttonAceptar);

    // Assert
    expect(props.onAccept).toHaveBeenCalled();

  });
  it('Se pulsa el boton de Cancelar', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept : jest.fn(),
      onClose : jest.fn(),
      title: 'Test Title',
      labels: {
        closeButton: 'cerrar',
        acceptButton: 'aceptar'
      }
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);
    const buttonCerrar = screen.getByRole('button', { name: 'cerrar' });
    userEvent.click(buttonCerrar);
    // Assert
    expect(props.onClose).toHaveBeenCalled();
  });
});
```

## Hook

- Se agrega el test al hook `src/common/components/confirmation-dialog/confirmation-dialog.hook.ts`:

Se crean los siguientes test:

- Caso 'dialog' modal no esta abierta.
- Caso 'dialog' modal abierta con datos.
- Caso se pulsa el boton candelar.
- Caso se pulsa el boton aceptar.

### src/common/components/confirmation-dialog/confirmation-dialog.hook.spec.ts

```javascript
import React from 'react';
import {act, renderHook} from '@testing-library/react-hooks'
import {useConfirmationDialog} from './confirmation-dialog.hook'
import { createEmptyLookup, Lookup } from 'common/models';

describe('PRUEBAS ---------------> HOOK (dudas)', () => {
  it('caso de prueba .-  no esta abierto  ', () => {
    // Arrange
    

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    // Assert
    expect(result.current.isOpen).toEqual(false)

  });
  it('caso de prueba .-  abierto  ', () => {
    // Arrange
    const newItem = {
      id: '123456',
      name: 'proyecto o usuario'
    }

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.onOpenDialog(newItem)
    });

    // Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });
  it('caso de prueba .-  onCLose', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.onClose()
    });

    // Assert
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.onClose).toEqual(expect.any(Function));
  });
  it('caso de prueba .-  onAccept - borramos  ', () => {
    // Arrange
    const newItem: Lookup = {
      id: '',
      name: ''
    }

    // Act
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.onAccept()
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(newItem);
    expect(result.current.onAccept).toEqual(expect.any(Function));
  });
});
```