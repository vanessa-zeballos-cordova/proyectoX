import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';


const appRoutes:Routes = [
    {path:"", component:LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'treeSystem', component: SigninComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);