import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CounterInputComponent } from "./counter-input/counter-input.component";
import { LoaderComponent } from './loader/loader.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CounterInputComponent,
        LoaderComponent,
        CountdownComponent
    ],
    exports: [
        CounterInputComponent,
        LoaderComponent,
        CountdownComponent
    ]
})
export class SharedModule { }
