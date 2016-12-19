import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { RestaurantesListComponent } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { EditRestaurantePage } from '../pages/edit-restaurante/edit-restaurante';

@NgModule({
  declarations: [
    MyApp,
    RestaurantesListComponent,
    ItemDetailsPage,
    EditRestaurantePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RestaurantesListComponent,
    ItemDetailsPage,
    EditRestaurantePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
