import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {ShoppingListModule} from './shopping-list/shopping-list.module';
import {CoreModule} from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    ShoppingListModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
