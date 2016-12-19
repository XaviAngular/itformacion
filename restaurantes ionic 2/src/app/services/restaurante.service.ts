import {Injectable} from "@angular/core";
import {Http,  Headers} from "@angular/http";
import "rxjs/add/operator/map";

import {Restaurante} from "../model/restaurante";

@Injectable()
export class RestauranteService{
	constructor(private _http: Http){}

	getRestaurantes(){
		//Petición Ajax asíncrona, el metedo map es el encargado de tratar los datos
		return this._http.get("http://vps306727.ovh.net/slim/restaurantes-api.php/restaurantes")
							.map(res => res.json());
	}
	getRestaurantesFiltro(filtro:any){
		let json = JSON.stringify(filtro);
		let params = "json="+json;	
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post("http://vps306727.ovh.net/slim/restaurantes-api.php/filtro", 
				params, {headers: headers}).map(res => res.json());
	}

	getRestaurante(id: string){		
			return this._http.get("http://vps306727.ovh.net/slim/restaurantes-api.php/restaurante/"+id)
							.map(res => res.json());
			}
	addRestaurante(restaurante: Restaurante) {
		let json = JSON.stringify(restaurante);
		let params = "json="+json;	
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post("http://vps306727.ovh.net/slim/restaurantes-api.php/restaurante-add", 
				params, {headers: headers}).map(res => res.json());
	}
	editRestaurante(id: string, restaurante: Restaurante) {
		let json = JSON.stringify(restaurante);
		let params = "json="+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post("http://vps306727.ovh.net/slim/restaurantes-api.php/update-restaurante/"+id, 
				params, {headers: headers}).map(res => res.json());
	}

	deleteRestaurante(id: string){
		return this._http.get("http://vps306727.ovh.net/slim/restaurantes-api.php/delete-restaurante/"+id)
							.map(res => res.json());
	}
}