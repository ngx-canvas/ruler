/* --- MODULES --- */
import { NgModule } from '@angular/core';

/* --- COMPONENTS --- */
import { RulerComponent } from './ruler/ruler.component';
import { RulerAxisComponent } from './axis/axis.component';
import { RulerContentComponent } from './content/content.component';

@NgModule({
    exports: [
        RulerComponent,
        RulerAxisComponent,
        RulerContentComponent
    ],
    declarations: [
        RulerComponent,
        RulerAxisComponent,
        RulerContentComponent
    ]
})

export class RulerModule { }