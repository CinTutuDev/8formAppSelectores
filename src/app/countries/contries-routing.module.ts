import { NgModule } from '@angular/core';
import { SelectorPageComponent } from './pages/selector-page.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'selector', component: SelectorPageComponent },
      { path: '**', redirectTo: 'selector' },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContriesRoutingModule { }
