import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { MainLayoutModule } from '@layouts/main-layout/main-layout.module';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout';
import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    MainLayoutModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainLayoutComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./features/catalogue/catalogue.module').then(
                (m) => m.CatalogueModule,
              ),
          },
        ],
      },
    ]),
    CoreModule,
  ],
  bootstrap: [App],
})
export class AppModule {}
