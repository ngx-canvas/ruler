import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RulerModule } from 'projects/ruler/src/public-api';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
    imports: [
        FormsModule,
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
