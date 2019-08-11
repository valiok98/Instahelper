export class FilterTerms {
    constructor(store) {
        this.store = store;
        this.comment_input = mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field.comments'));
        this.tag_input = mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field.tags'));
        this.location_input = mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field.locations'));
        this.inputElems = [];
        this.instantiate_objects();
        // this.disable_objects();
    }

    instantiate_objects() {

        rxjs.fromEvent(this.comment_input.input_, 'keyup')
            .pipe(
                rxjs.operators.distinctUntilChanged(),
                rxjs.operators.map(
                    e => {
                        if (e.key === 'Enter' && this.comment_input.value) {
                            return true;
                        }
                        return false;
                    })).subscribe(valid => {
                        if (valid) {
                            this.store.dispatch({
                                type: 'component_terms_lists:ADD_COMMENT', payload: {
                                    comment: this.comment_input.value
                                }
                            });
                            this.comment_input.value = '';
                        }
                    });

        rxjs.fromEvent(this.tag_input.input_, 'keyup')
            .pipe(
                rxjs.operators.distinctUntilChanged(),
                rxjs.operators.map(
                    e => {
                        if (e.key === 'Enter' && this.tag_input.value) {
                            return true;
                        }
                        return false;
                    })).subscribe(valid => {
                        if (valid) {
                            this.store.dispatch({
                                type: 'component_terms_lists:ADD_TAG', payload: {
                                    tag: this.tag_input.value
                                }
                            });
                            this.tag_input.value = '';
                        }
                    });

        rxjs.fromEvent(this.location_input.input_, 'keyup')
            .pipe(
                rxjs.operators.distinctUntilChanged(),
                rxjs.operators.map(
                    e => {
                        if (e.key === 'Enter' && this.location_input.value) {
                            return true;
                        }
                        return false;
                    })).subscribe(valid => {
                        if (valid) {
                            this.store.dispatch({
                                type: 'component_terms_lists:ADD_LOCATION', payload: {
                                    location: this.location_input.value
                                }
                            });
                            this.location_input.value = '';
                        }
                    });
    }

    disable_objects() {
        this.comment_input.root_.classList.add('mdc-text-field--disabled');
        this.comment_input.input_.classList.add('disabled');
        this.tag_input.root_.classList.add('mdc-text-field--disabled');
        this.tag_input.input_.classList.add('disabled');
        this.location_input.root_.classList.add('mdc-text-field--disabled');
        this.location_input.input_.classList.add('disabled');
    }

    enable_objects() {
        this.comment_input.root_.classList.remove('mdc-text-field--disabled');
        this.comment_input.input_.classList.remove('disabled');
        this.tag_input.root_.classList.remove('mdc-text-field--disabled');
        this.tag_input.input_.classList.remove('disabled');
        this.location_input.root_.classList.remove('mdc-text-field--disabled');
        this.location_input.input_.classList.remove('disabled');
    }

    destroy_objects() {

    }
}