import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { // default route
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ctest',
    component: CalendarComponent
  },
  {
    path: 'main',
    component: MainComponent,
    children:
    [
      {path: 'calendar',
      component:  CalendarComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'map',
        component: MapComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
