import { Component } from '@angular/core';
import {RestauranteService} from "../../app/services/restaurante.service";
import {Restaurante} from "../../app/model/restaurante";

import { NavController, NavParams, AlertController} from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'hello-ionic-page',
  templateUrl: 'hello-ionic.html',
  providers: [RestauranteService]
})
export class RestaurantesListComponent  {
	private titulo:string;
	public restaurantes: Restaurante[];
	public status: string;
	public errorMessage;
	public confirmado;
	public loading;
	public filtro:string;
	public testCheckboxOpen:boolean;
	public testCheckboxResult:any;


	constructor(
		private _restauranteService: RestauranteService,
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController
		){
		this.titulo="Listado";
		this.filtro="bajo";
	}
	ionViewWillEnter (){
		console.log('Pagina principal activa');
		this.getRestaurantes();
		
	}
	ionViewDidLoad() {
	console.log('Pagina principal cargada');
    this.getRestaurantes();
  }
	
	getRestaurantes(){
		
		this._restauranteService.getRestaurantes()
				.subscribe(
					result => {
							this.restaurantes = result.data;
							this.status = result.status;

							if(this.status !== "success"){
								alert("Error en el servidor");
							}

							this.loading = 'hide';
					},
					error => {
						this.errorMessage = <any>error;
						
						if(this.errorMessage !== null){
							console.log(this.errorMessage);
							alert("Error en la petición");
						}
					}
				);
			}

	getFiltro(){
		
		this._restauranteService.getRestaurantesFiltro(this.testCheckboxResult)
				.subscribe(
					result => {
							this.restaurantes = result.data;
							this.status = result.status;

							if(this.status !== "success"){
								alert("Error en el servidor");
							}

							this.loading = 'hide';
					},
					error => {
						this.errorMessage = <any>error;
						
						if(this.errorMessage !== null){
							console.log(this.errorMessage);
							alert("Error en la petición");
						}
					}
				);
			}
 
 	itemTapped(event, restaurante) {
    this.navCtrl.push(ItemDetailsPage, {
      item: restaurante
    });
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filtrar Restaurantes');

    alert.addInput({
      type: 'checkbox',
      label: 'Barato',
      value: 'bajo'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Medio',
      value: 'medio'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Caro',
      value: 'alto'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Filtrar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.getFiltro();
      }
    });
    alert.present();
  }

		
}