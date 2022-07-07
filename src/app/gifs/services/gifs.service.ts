import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  //Esto hace que el servicio ya sea de acceso global (creo que utilizando singleton)
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = ' ';
  private _historial: string[] = [];

  public resultado: Gif[] = [];

  constructor(private http: HttpClient) {}

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

    this.http
      .get<SearchGIFResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=19xNlbVfq0GKCG4x9uK8DOUlbEV7NwVf&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultado = resp.data;
      });
  }
}
