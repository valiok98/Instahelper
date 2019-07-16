export class FilterTerms {
    constructor(store) {
        this.store = store;
        this.objects = document.querySelectorAll('.user-actions .mdc-text-field');
        this.inputElems = [];
        this.instantiate_objects();
        // this.disable_objects();
    }

    instantiate_objects() {
        for (const obj of this.objects) {
            const modObj = mdc.textField.MDCTextField.attachTo(obj);
            obj.addEventListener('keyup', e => {
                if (e.key === 'Enter') {
                    this.store.dispatch({
                        type: 'component_terms_lists:ADD', payload: {
                            comment: modObj.value
                        }
                    });
                }
                // console.log(modObj.value);
            });
            this.inputElems.push(modObj);
        }
    }

    disable_objects() {
        for (const obj of this.objects) {
            obj.classList.add('mdc-text-field--disabled');
            obj.querySelector('input').classList.add('disabled');
        }
    }

    enable_objects() {
        for (const obj of this.objects) {
            obj.classList.remove('mdc-text-field--disabled');
            obj.querySelector('input').classList.remove('disabled');
        }
    }

    destroy_objects() {

    }
}