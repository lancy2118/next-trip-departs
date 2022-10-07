import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextTripDetailsComponent } from './Components/next-trip-details/next-trip-details.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'nextTrip/:routeId/:directionId/:stopId',
    component: NextTripDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
