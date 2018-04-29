import { AbstractControl } from '@angular/forms';

/**
 * validator functions starting with a capital letter are 
 * form group validators and not form control validators.
 */
export class CustomValidators {

    private static telephoneReg = /^\+[0-9]+$/;
    
    static telephone(control: AbstractControl): {[key: string]: any} {
        let valid = true;
        if(control.value) {
            const matches = control.value.match(CustomValidators.telephoneReg);
            if(!matches) {
                valid = false;
            }
        }

        return valid ? null : {'invalidTelephone': true};
    }

    static Match(firstControlName: string, secondControlName: string)  {
        return (control: AbstractControl) => {
            let firstControlValue = control.get(firstControlName).value; 
            let secondControlValue = control.get(secondControlName).value; 
            if (firstControlValue != secondControlValue) {
                control.get(secondControlName).setErrors({MatchFields: true});
            } else {
                return null
            }
          };
    }

}