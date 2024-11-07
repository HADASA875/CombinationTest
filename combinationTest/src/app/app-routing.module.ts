import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginationComponent } from './component/pagination/pagination.component';
import { MainComponent } from './component/main/main.component';

const routes: Routes = [
  { path: 'all-combination', component: PaginationComponent },
  { path: '', component: MainComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
