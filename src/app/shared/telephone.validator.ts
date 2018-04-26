import { ValidatorFn, AbstractControl } from '@angular/forms';

const telephoneReg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

export function telephoneValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const invalid = control.value.match(telephoneReg);
        return invalid ? {'invalidTelephone': {value: control.value}} : null;
    };
}
