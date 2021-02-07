import { NgModule } from '@angular/core';
import { RulerModule } from 'projects/ruler/src/public-api';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        RulerModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent
    ]
})

export class AppModule { }
