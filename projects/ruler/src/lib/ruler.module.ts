/* --- MODULES --- */
import { NgModule } from '@angular/core';

/* --- SERVICES --- */
import { RulerService } from './ruler.service';

/* --- COMPONENTS --- */
import { RulerComponent } from './ruler/ruler.component';
import { RulerAxisComponent } from './axis/axis.component';
import { RulerContentComponent } from './content/content.component';

@NgModule({
    exports: [
        RulerComponent
    ],
    providers: [
        RulerService
    ],
    declarations: [
        RulerComponent,
        RulerAxisComponent,
        RulerContentComponent
    ]
})

export class RulerModule { }