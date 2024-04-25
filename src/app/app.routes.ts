import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import AdditemComponent from './components/additem/additem.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about_us', component: AboutusComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'add_item', component: AdditemComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }