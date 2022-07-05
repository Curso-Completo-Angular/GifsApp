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
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    console.log(this._historial);
  }

  constructor() {}
}
