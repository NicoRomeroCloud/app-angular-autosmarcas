import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutoService } from './auto.service';
import { Auto } from '../models/auto';
import { Marca } from '../models/marca';

describe('AutoService', () => {
  let service: AutoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutoService]
    });
    service = TestBed.inject(AutoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an car by ID', () => {
    const autoId = 1;
    const dummyAuto: Auto = { id: autoId, nombre: 'Auto1', precio: 10000, marca: null };

    service.obtenerAutoPorId(autoId).subscribe((auto) => {
      expect(auto).toEqual(dummyAuto);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/autos/${autoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAuto);
  });

  it('should create a new car', () => {
    const newAuto: Auto = { nombre: 'NewAuto', precio: 20000, marca: null };

    service.crearAuto(newAuto).subscribe((auto) => {
      expect(auto).toEqual(newAuto);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/azurian/autos');
    expect(req.request.method).toBe('POST');
    req.flush(newAuto);
  });

  it('should update an existing carr by ID', () => {
    const updatedAuto: Auto = { id: 1, nombre: 'UpdatedAuto', precio: 25000, marca: null };

    service.actualizarAuto(updatedAuto).subscribe((auto) => {
      expect(auto).toEqual(updatedAuto);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/autos/${updatedAuto.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedAuto);
  });

  it('should delete an carq by ID', () => {
    const autoId = 1;

    service.eliminarAuto(autoId).subscribe(() => {
      // No se espera ningun return para un delete correcto
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/azurian/autos/${autoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // req null para delete correcto
  });
});