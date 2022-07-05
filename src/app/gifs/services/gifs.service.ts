import { Injectable } from '@angular/core';

@Injectable({
  //Esto hace que el servicio ya sea de acceso global (creo que utilizando singleton)
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    this._historial.unshift(query);
    console.log(this._historial);
  }

  constructor() {}
}
