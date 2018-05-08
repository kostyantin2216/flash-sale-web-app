import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterInputComponent } from "./counter-input/counter-input.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CounterInputComponent
    ],
    exports: [
        CounterInputComponent
    ]
})
export class SharedModule { }
