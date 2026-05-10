import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CataloguePageComponent } from './pages/catalogue-page/catalogue-page';

@NgModule({
  declarations: [CataloguePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CataloguePageComponent }]),
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [CataloguePageComponent],
})
export class CatalogueModule {}
