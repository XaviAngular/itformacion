import { Component,ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams,LoadingController, ActionSheetController } from 'ionic-angular';
import { File, Camera, Transfer,Geolocation } from 'ionic-native';

import {RestauranteService} from "../../app/services/restaurante.service";
import {Restaurante} from "../../app/model/restaurante";
import {RestaurantesListComponent} from '../hello-ionic/hello-ionic';

declare var google;
declare var cordova: any;


@Component({
  selector: 'page-edit-restaurante',
  templateUrl: 'edit-restaurante.html',
  providers: [RestauranteService]
})
export class EditRestaurantePage {
	private titulo:string;
	public restaurante: Restaurante;
	public errorMessage: string;
	public status: string;
	public filesToUpload: Array<File>;
	public resultUpload;
  public existeImagen:boolean;
	public params:boolean;
	public mostrarMapa:boolean;
	public imageChosen: boolean;
  public imagePath: any;
  public imageNewPath: any;
	
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
  			public navCtrl: NavController,
  			private _restauranteService: RestauranteService,
  			private navParams: NavParams=null,
  			public actionSheet: ActionSheetController,
    		private loadingCtrl: LoadingController,)
   {
   	this.params=false;
   	this.mostrarMapa=false;
   	this.imageChosen=false;
    this.existeImagen=false;
   	this.titulo="Añadir restaurante";
   	if (navParams.get('id')===undefined){
		this.restaurante = new Restaurante(0,"","","",null,"bajo",0,0);
   	}
   else {
   	this.params=true;
   	this.restaurante = navParams.data;
   	if (this.restaurante.imagen!="null") this.existeImagen=true;
    if (this.restaurante.latitud>0)this.mostrarMapa=true;   	
   } 
   }

  ionViewDidLoad() {
    console.log('Se reciben params: '+this.params);
    if (this.mostrarMapa){
    let latLng = new google.maps.LatLng(this.restaurante.latitud, this.restaurante.longitud);
    let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
        });
    }
  }

  getGeo(){
 	this.mostrarMapa=true;
 
    Geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.restaurante.latitud=position.coords.latitude;
      this.restaurante.longitud=position.coords.longitude;
      

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
        });

 
    }, (err) => {
      console.log(err);
    }); 
  }

  uploadPhoto() {
    let loader = this.loadingCtrl.create({
      content: "Subiendo imagen..."
    });
    loader.present();
 
    let filename = this.imagePath.split('/').pop();
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { 'title': this.restaurante.nombre, 'description': this.restaurante.descripcion }
    }; 
 
    const fileTransfer = new Transfer();
 
    fileTransfer.upload(this.imageNewPath, 'http://vps306727.ovh.net/slim/upload.php',
      options).then((entry) => {
        this.imagePath = '';
        this.imageChosen = false;
         
        loader.dismiss();
        
      }, (err) => {
        alert(JSON.stringify(err));
      });
  } 

  chooseImage() { 
    let actionSheet = this.actionSheet.create({
      title: 'Elige origen',
      buttons: [
        {
          text: 'Galería',
          icon: 'albums',
          handler: () => {
            this.actionHandler(1);
            
          }
        },
        {
          text: 'Cámara',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
 
 
  //}
 
  actionHandler(selection: any) {
    var options: any;
 
    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      };
    }
 
    Camera.getPicture(options).then((imgUrl) => { 
      var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      sourceFileName = sourceFileName.split('?').shift();
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath = imgUrl;
        this.imageChosen = true;
        this.imageNewPath = result.nativeURL;
        this.restaurante.imagen=sourceFileName;
        this.uploadPhoto();       
      }, 
        (err) => {
        alert(JSON.stringify(err));
      })
 
    }, (err) => {
      alert(JSON.stringify(err))
    });
 
  }


  onSubmit(){
  	
  	if (!this.params){
		 this._restauranteService.addRestaurante(this.restaurante).subscribe(
				response => {
					this.status = response.status;
					if(this.status !== "success"){
						alert("Error en el servidor");
					}
					this.navCtrl.pop();
					this.navCtrl.push(RestaurantesListComponent);
				},
				error => {
					this.errorMessage = <any>error;
				
					if(this.errorMessage !== null){
						console.log("no chuta"+this.errorMessage);
						alert("Error en la petición");
					}
					this.navCtrl.pop();
					this.navCtrl.push(RestaurantesListComponent);
				}
			);
			}
	else {
		 let id = this.restaurante.id.toString();
			 this._restauranteService.editRestaurante(id, this.restaurante).subscribe(
					response => {
						this.status = response.status;
						if(this.status !== "success"){
							alert("Error en el servidor");
						}
          this.navCtrl.pop();
          
						
					},
					error => {
						this.errorMessage = <any>error;
					
						if(this.errorMessage !== null){
							console.log(this.errorMessage);
							alert("Error en la petición");
						}
          this.navCtrl.pop();
          
					}
				);
	}

	}
	

}
