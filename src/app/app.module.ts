//import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFsModule } from 'ngx-fs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HttpClient } from '@angular/common/http';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {}

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
  ],
  imports     : [
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxFsModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide   : TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps      : [HttpClient]
      }
    })
  ],
  providers   : [ElectronService],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
