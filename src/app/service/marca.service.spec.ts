import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarcaService } from './marca.service';
import { Marca } from '../models/marca';

describe('MarcaService', () => {
  let service: MarcaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarcaService]
    });
    service = TestBed.inject(MarcaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a marca by ID', () => {
    const marcaId = 1;
    const dummyMarca: Marca = { id: marcaId, nombre: 'Marca1', descripcion: 'Descripción de la Marca' };

    service.getMarca(marcaId).subscribe((marca) => {
      expect(marca).toEqual(dummyMarca);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/marcas/${marcaId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMarca);
  });

  it('should retrieve a marca by ID', () => {
    const marcaId = 1;
    const dummyMarca: Marca = { id: marcaId, nombre: 'Marca1' };

    service.getMarca(marcaId).subscribe((marca) => {
      expect(marca).toEqual(dummyMarca);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/marcas/${marcaId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMarca);
  });

  it('should create a new marca', () => {
    const newMarca: Marca = { nombre: 'NuevaMarca' };

    service.createMarca(newMarca).subscribe((marca) => {
      expect(marca).toEqual(newMarca);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/azurian/postmarcas');
    expect(req.request.method).toBe('POST');
    req.flush(newMarca);
  });

  it('should update an existin marca by ID', () => {
    const marcaId = 1;
    const updatedMarca: Marca = { id: marcaId, nombre: 'MarcaActualizada' };

    service.updateMarca(marcaId, updatedMarca).subscribe((marca) => {
      expect(marca).toEqual(updatedMarca);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/marcas/${marcaId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMarca);
  });

  it('should delete a marcaid by ID', () => {
    const marcaId = 1;

    service.deleteMarca(marcaId).subscribe(() => {
      // Expect nothing returned on a successful delete
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/marcas/${marcaId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Null response for successful delete
  });
});