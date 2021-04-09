import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BtcPriceStreamComponent } from './btc-price-stream/btc-price-stream.component';

const routes: Routes = [{
  path: '',
  component: BtcPriceStreamComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
