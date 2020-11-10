import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';;
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    LazyLoadImagesModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
})
export class AppModule { }
