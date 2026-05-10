import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CatalogueHomeComponent } from './pages/catalogue-home/catalogue-home.component';
import { IdentitySectionComponent } from './sections/identity-section/identity-section.component';
import { ColorsSectionComponent } from './sections/colors-section/colors-section.component';
import { TypographySectionComponent } from './sections/typography-section/typography-section.component';
import { ButtonsSectionComponent } from './sections/buttons-section/buttons-section.component';
import { FormsSectionComponent } from './sections/forms-section/forms-section.component';
import { CardsSectionComponent } from './sections/cards-section/cards-section.component';
import { NavigationSectionComponent } from './sections/navigation-section/navigation-section.component';
import { DataSectionComponent } from './sections/data-section/data-section.component';
import { FeedbackSectionComponent } from './sections/feedback-section/feedback-section.component';
import { PatternsSectionComponent } from './sections/patterns-section/patterns-section.component';

const routes: Routes = [
  { path: '', component: CatalogueHomeComponent },
];

@NgModule({
  declarations: [
    CatalogueHomeComponent,
    IdentitySectionComponent,
    ColorsSectionComponent,
    TypographySectionComponent,
    ButtonsSectionComponent,
    FormsSectionComponent,
    CardsSectionComponent,
    NavigationSectionComponent,
    DataSectionComponent,
    FeedbackSectionComponent,
    PatternsSectionComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class CatalogueModule {}
