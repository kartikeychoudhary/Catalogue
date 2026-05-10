import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CoreModule } from '@core/core.module';
import { IconRegistryService } from '@core/services/icon-registry.service';
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
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (registry: IconRegistryService) => () =>
        firstValueFrom(registry.load()),
      deps: [IconRegistryService],
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
