import { EjectorValueBindingService } from '../../src/app/service/EjectorService/EjectorValueBinding.service';
import * as luckysheet from "luckysheet";

describe('Luckysheet synchronization operation', () => {
  it('Selects section 1', () => {
    cy.visit('/');
  });

  it('binds the section one, other two fields', () => {
    // section 1
    // vbind the velocity field
    cy.wait(1000);
    cy.get('[data-testid="eject-section-dropdown"]').click();
    cy.get('[data-testid="eject-section-value"]').contains(1).click();
    cy.get('[data-testid="eject-param-dropdown"]').click();
    cy.get('[data-testid="eject-param-value"]').contains('velocity').click();
    cy.get('[data-testid="eject-cell-position-input"]').type('S14');
    cy.get('[data-testid="eject-save-btn"]').click();

    // bind the pressure field
    cy.wait(1000);
    cy.get('[data-testid="eject-section-dropdown"]').click();
    cy.get('[data-testid="eject-section-value"]').contains(1).click();
    cy.get('[data-testid="eject-param-dropdown"]').click();
    cy.get('[data-testid="eject-param-value"]').contains('pressure').click();
    cy.get('[data-testid="eject-cell-position-input"]').type('S15');
    cy.get('[data-testid="eject-save-btn"]').click();

    // bind the position field
    cy.wait(1000);
    cy.get('[data-testid="eject-section-dropdown"]').click();
    cy.get('[data-testid="eject-section-value"]').contains(1).click();
    cy.get('[data-testid="eject-param-dropdown"]').click();
    cy.get('[data-testid="eject-param-value"]').contains('position').click();
    cy.get('[data-testid="eject-cell-position-input"]').type('S16');
    cy.get('[data-testid="eject-save-btn"]').click();
  });

  it('binds the section two all fields', () => {
    // section 2
    // bind the velocity field
    cy.wait(1000);
    cy.get('[data-testid="eject-section-dropdown"]').click();
    cy.get('[data-testid="eject-section-value"]').contains(2).click();
    cy.get('[data-testid="eject-param-dropdown"]').click();
    cy.get('[data-testid="eject-param-value"]').contains('velocity').click();
    cy.get('[data-testid="eject-cell-position-input"]').type('U14');
    cy.get('[data-testid="eject-save-btn"]').click();

    // bind the pressure field
    cy.wait(1000);
    cy.get('[data-testid="eject-section-dropdown"]').click();
    cy.get('[data-testid="eject-section-value"]').contains(2).click();
    cy.get('[data-testid="eject-param-dropdown"]').click();
    cy.get('[data-testid="eject-param-value"]').contains('pressure').click();
    cy.get('[data-testid="eject-cell-position-input"]').type('U15');
    cy.get('[data-testid="eject-save-btn"]').click();

    // bind the position field
    cy.wait(1000);
    cy.get('[data-testid="eject-section-dropdown"]').click();
    cy.get('[data-testid="eject-section-value"]').contains(2).click();
    cy.get('[data-testid="eject-param-dropdown"]').click();
    cy.get('[data-testid="eject-param-value"]').contains('position').click();
    cy.get('[data-testid="eject-cell-position-input"]').type('U16');
    cy.get('[data-testid="eject-save-btn"]').click();
  });

  it('should have all the bindings', () => {
    cy.get('[data-testid="eject-expansion').click();
    // section 1
    cy.get('[data-testid="eject-table-row"]').contains('S14');
    cy.get('[data-testid="eject-table-row"]').contains('S15');
    cy.get('[data-testid="eject-table-row"]').contains('S16');
    
    // section 2
    cy.get('[data-testid="eject-table-row"]').contains('U14');
    cy.get('[data-testid="eject-table-row"]').contains('U15');
    cy.get('[data-testid="eject-table-row"]').contains('U16');
  });

  it('values according to the cell position translates to the right coordinates', () => {
    let service = new EjectorValueBindingService();

    service.initCharHash();

    let coordinate = service.convertCellToCoordinate('S14');
    expect(coordinate.x).to.equal(18);
    expect(coordinate.y).to.equal(13);

    let coordinate2 = service.convertCellToCoordinate('S15');
    expect(coordinate2.y).to.equal(14);

    let coordinate3 = service.convertCellToCoordinate('S16');
    expect(coordinate3.y).to.equal(15);

    let coordinate4 = service.convertCellToCoordinate('U14');
    expect(coordinate4.x).to.equal(20);
    expect(coordinate4.y).to.equal(13);

    let coordinate5 = service.convertCellToCoordinate('U15');
    expect(coordinate5.y).to.equal(14);

    let coordinate6 = service.convertCellToCoordinate('U16');
    expect(coordinate6.y).to.equal(15);
  });

  it('fills the specified values to the luckysheet', () => {
    let service = new EjectorValueBindingService();

    service.initCharHash();

    let coordinate = service.convertCellToCoordinate('S15');
    luckysheet.setCellValue(coordinate.y, coordinate.x, '80', 'sheet1');
  
    let coordinate2 = service.convertCellToCoordinate('S15');
    luckysheet.setCellValue(coordinate2.y, coordinate2.x, '20', 'sheet1');

    let coordinate3 = service.convertCellToCoordinate('S16');
    luckysheet.setCellValue(coordinate3.y, coordinate3.x, '200', 'sheet1');

    let coordinate4 = service.convertCellToCoordinate('U14');
    luckysheet.setCellValue(coordinate4.y, coordinate4.x, '100', 'sheet1');

    let coordinate5 = service.convertCellToCoordinate('U15');
    luckysheet.setCellValue(coordinate5.y, coordinate5.x, '200', 'sheet1');

    let coordinate6 = service.convertCellToCoordinate('U16');
    luckysheet.setCellValue(coordinate6.y, coordinate6.x, '300', 'sheet1');
  });

  // it('selects the desired sections, and show the values', () => {
  //   cy.get('[data-testid="eject-form-section-dropdown"]').click();
  //   cy.get('[data-testid="eject-form-section-value"]').contains('2').click();
  // });

  // delete the bindings

})
