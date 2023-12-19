import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorPageComponent } from './pages/selector-page.component';
import { ContriesRoutingModule } from './contries-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectorPageComponent],
  imports: [CommonModule, ContriesRoutingModule, ReactiveFormsModule],
})
export class ContriesModule {}
