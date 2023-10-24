import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [

    {
      titulo: 'Marcas de Autos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Marcas', url: 'dashboard/marcas' },
        { titulo: 'Autos', url: 'dashboard/autos' }
      ]
    }
  ]

  constructor() { }
}
