import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PartialObserver } from 'rxjs/Observer';

export enum LoaderState {
    SHOWN,
    HIDDEN
}

@Injectable()
export class LoaderService {

    private emitLoaderState = new Subject<LoaderState>();

    loaderState$: Observable<LoaderState>;

    constructor() {
        this.loaderState$ = this.emitLoaderState.asObservable().startWith(LoaderState.HIDDEN);
    }

    show() {
        this.emitLoaderState.next(LoaderState.SHOWN);
    }

    hide() {
        this.emitLoaderState.next(LoaderState.HIDDEN);
    }

}
