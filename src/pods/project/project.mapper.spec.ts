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
    it('nos tiene que retornar .- vacio (duda)', () => {
      // Arrange
      const project: apiModel.Project = { id:'', name: '', isActive: false, employees: []};
      
      // Act
      const result = mapProjectFromApiToVm(project).employees.length;

      // Assert
      expect(result).toEqual(0)
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
