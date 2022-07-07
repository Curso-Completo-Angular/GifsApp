import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  //Esto hace que el servicio ya sea de acceso global (creo que utilizando singleton)
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = '19xNlbVfq0GKCG4x9uK8DOUlbEV7NwVf';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultado: Gif[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    this.http
      .get<SearchGIFResponse>(`${this.servicioURL}/search`, { params: params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultado = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultado));
      });
  }
}
