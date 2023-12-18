import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPageComponent } from './pages/selector-page.component';
import { ContriesRoutingModule } from './contries-routing.module';



@NgModule({
  declarations: [SelectorPageComponent],
  imports: [
    CommonModule, ContriesRoutingModule
  ]
})
export class ContriesModule { }
