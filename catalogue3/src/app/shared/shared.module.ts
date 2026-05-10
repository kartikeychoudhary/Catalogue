import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon';
import { ButtonComponent } from './components/button/button';
import { IconButtonComponent } from './components/icon-button/icon-button';
import { InputComponent } from './components/input/input';
import { TextareaComponent } from './components/textarea/textarea';
import { SelectComponent } from './components/select/select';
import { CheckboxComponent } from './components/checkbox/checkbox';
import { RadioGroupComponent } from './components/radio-group/radio-group';
import { ToggleComponent } from './components/toggle/toggle';
import { SliderComponent } from './components/slider/slider';
import { SearchComponent } from './components/search/search';
import { UploadComponent } from './components/upload/upload';
import { CardComponent } from './components/card/card';
import { CardFeatureComponent } from './components/card-feature/card-feature';
import { CardPricingComponent } from './components/card-pricing/card-pricing';
import { CardProfileComponent } from './components/card-profile/card-profile';
import { CardStatComponent } from './components/card-stat/card-stat';
import { CardMediaComponent } from './components/card-media/card-media';
import { AvatarComponent } from './components/avatar/avatar';
import { NavbarComponent } from './components/navbar/navbar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { TabsComponent } from './components/tabs/tabs';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs';
import { PaginationComponent } from './components/pagination/pagination';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav';
import { TableComponent } from './components/table/table';
import { BadgeComponent } from './components/badge/badge';
import { TagComponent } from './components/tag/tag';
import { ListComponent } from './components/list/list';
import { ListItemComponent } from './components/list/list-item';
import { KeyValueComponent } from './components/key-value/key-value';
import { AvatarGroupComponent } from './components/avatar-group/avatar-group';
import { EmptyStateComponent } from './components/empty-state/empty-state';
import { AlertComponent } from './components/alert/alert';
import { ToastComponent } from './components/toast/toast';
import { ModalComponent } from './components/modal/modal';
import { DrawerComponent } from './components/drawer/drawer';
import { ProgressComponent } from './components/progress/progress';
import { SkeletonComponent } from './components/skeleton/skeleton';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { PopoverDirective } from './directives/popover/popover.directive';
import { ThemeControlsComponent } from './components/theme-controls/theme-controls';
import { SparkChartComponent } from './components/spark-chart/spark-chart';
import { SignalRingComponent } from './components/signal-ring/signal-ring';
import { NowPlayingComponent } from './components/now-playing/now-playing';

const components = [
  IconComponent,
  ButtonComponent,
  IconButtonComponent,
  InputComponent,
  TextareaComponent,
  SelectComponent,
  CheckboxComponent,
  RadioGroupComponent,
  ToggleComponent,
  SliderComponent,
  SearchComponent,
  UploadComponent,
  CardComponent,
  CardFeatureComponent,
  CardPricingComponent,
  CardProfileComponent,
  CardStatComponent,
  CardMediaComponent,
  AvatarComponent,
  NavbarComponent,
  SidebarComponent,
  TabsComponent,
  BreadcrumbsComponent,
  PaginationComponent,
  BottomNavComponent,
  TableComponent,
  BadgeComponent,
  TagComponent,
  ListComponent,
  ListItemComponent,
  KeyValueComponent,
  AvatarGroupComponent,
  EmptyStateComponent,
  AlertComponent,
  ToastComponent,
  ModalComponent,
  DrawerComponent,
  ProgressComponent,
  SkeletonComponent,
  TooltipDirective,
  PopoverDirective,
  ThemeControlsComponent,
  SparkChartComponent,
  SignalRingComponent,
  NowPlayingComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class SharedModule {}
