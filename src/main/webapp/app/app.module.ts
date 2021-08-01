import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MydrawSharedModule } from 'app/shared/shared.module';
import { MydrawCoreModule } from 'app/core/core.module';
import { MydrawAppRoutingModule } from './app-routing.module';
import { MydrawHomeModule } from './home/home.module';
import { MydrawEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MydrawSharedModule,
    MydrawCoreModule,
    MydrawHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MydrawEntityModule,
    MydrawAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class MydrawAppModule {}
