import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class RulerService {

    public width: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public height: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public scroll: BehaviorSubject<any> = new BehaviorSubject<any>({
        'x': 0,
        'y': 0
    });

    constructor() { };

}