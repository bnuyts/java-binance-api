import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtcPriceStreamComponent } from './btc-price-stream/btc-price-stream.component';

import { socketConfig, socketConfigWithDebug } from '../configuration/socket.configuration';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BtcPriceStreamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: environment.production ? socketConfig : socketConfigWithDebug,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
