import { Component,ViewChild, ElementRef} from '@angular/core';
import {RestauranteService} from "../../app/services/restaurante.service";
import { EditRestaurantePage } from '../edit-restaurante/edit-restaurante';

import { NavController, NavParams, Platform, ActionSheetController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'item-details-page',
  templateUrl: 'item-details.html',
  providers: [RestauranteService]
})
export class ItemDetailsPage {
  selectedItem: any;
  public status: string;
	public errorMessage;
  public mostrarMapa:boolean;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    private _restauranteService: RestauranteService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.mostrarMapa=false;
  }
  ionViewDidLoad() {    
    if (this.selectedItem.latitud>0){
      this.mostrarMapa=true;
    let latLng = new google.maps.LatLng(this.selectedItem.latitud, this.selectedItem.longitud);
    let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
        });
    }
  }
  ionViewWillEnter (){
      if (this.selectedItem.latitud>0){
      this.mostrarMapa=true;
    let latLng = new google.maps.LatLng(this.selectedItem.latitud, this.selectedItem.longitud);
    let mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
        });
    }
  }


    openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opciones Restaurante',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked: '+this.selectedItem.id);
            this._restauranteService.deleteRestaurante(this.selectedItem.id)
            	.subscribe(
							result => {
									this.status = result.status;

									if(this.status !== "success"){
										alert("Error en el servidor");
									}
									else {console.log('Restaurante Eliminado');}
									this.navCtrl.popToRoot();
									

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
        },
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'paper' : null,
          handler: () => {
            console.log('Edit clicked: '+this.selectedItem.id);
            this.navCtrl.push(EditRestaurantePage,this.selectedItem);            
          }
        },
        
        
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
