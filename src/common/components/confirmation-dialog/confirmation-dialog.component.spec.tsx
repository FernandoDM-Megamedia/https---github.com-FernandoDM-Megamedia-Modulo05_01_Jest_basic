import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('PRUEBAS ---------------> COMPONENT', () => {
  it('Popuop contiene titulo y botones', () => {
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
