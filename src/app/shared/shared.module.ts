import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterInputComponent } from "./counter-input/counter-input.component";
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CounterInputComponent,
        LoaderComponent
    ],
    exports: [
        CounterInputComponent,
        LoaderComponent
    ]
})
export class SharedModule { }
