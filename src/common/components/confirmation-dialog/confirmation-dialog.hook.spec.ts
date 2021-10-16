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