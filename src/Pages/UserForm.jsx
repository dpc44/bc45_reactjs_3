import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { userReducer } from '../redux/reducers/userReducer';

class UserForm extends PureComponent {
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('here')
        const values = this.props.user;
        const action = {
            type: 'SUBMIT_FORM',
            payload: values
        }
        this.props.dispatch(action);
        document.querySelector('form').reset();
        const actionDisableAfter = {
            type: 'DISABLE_AFTER',
            payload: true
        }
        this.props.dispatch(actionDisableAfter);
    }
    handleChange = (e) => {
        const { value, id } = e.target;

        let messageError = '';
        //data-type
        let dataType = e.target.getAttribute('data-type');
        let dataMinMaxLength = e.target.getAttribute('data-min-max-length');
        let idKey = e.target.getAttribute('id-key');
        // validation
        if (value.trim() === '') {
            messageError = id + ' cannot be blanked';
        } else {
            switch (dataType) {
                case 'number': {
                    // console.log('go h ere');
                    let regexNumber = /^[0-9]+$/;
                    if (!regexNumber.test(value)) {
                        messageError = id + ' is numbers';
                    }
                }; break;
                case 'letter': {
                    // console.log('go h ere');
                    let regexLetter = /^[A-Z a-záàạảãăặẵẳằắ]+$/;
                    if (!regexLetter.test(value)) {
                        messageError = id + ' is letters';
                    }
                }; break;
                case 'email': {
                    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if (!regexEmail.test(value)) {
                        messageError = id + ' is wrong form';
                    }
                }; break;
            }

            if (dataMinMaxLength) {
                let [min, max] = JSON.parse(dataMinMaxLength);
                if (value.length < min || value.length > max) {
                    messageError += ' ' + id + ` from ${min} - ${max} letter`;
                }
            }

            if (idKey) {

                let a = this.props.arrUser.findIndex((item) => item.maSV.toUpperCase() == value.toUpperCase())

                if (a !== -1) {
                    messageError = id + ' existed';
                }
            }

        }
        const actionError = {
            type: 'HANDLE_ERROR',
            payload: {
                id: id,
                messageError: messageError
            }
        }
        this.props.dispatch(actionError);










        const action = {
            type: "HANDLE_FORM",
            payload: {
                value: value,
                id: id
            }
        }
        this.props.dispatch(action);

    }


    checkInValidForm = (errors) => {

        let output = false;
        for (let key in errors) {
            if (errors[key] !== '') {
                output = true;
                break
            }
        }
        return output;
    }

    render() {

        return (
            <form className='frm' onSubmit={this.handleSubmit}>
                <h3>Thông Tin Sinh Viên</h3>
                <div className='row'>
                    <div className='col-6'>
                        <div className='form-group'>
                            <label>mã SV</label>
                            <input id-key="valid" data-min-max-length="[3,6]" className='form-control' id="maSV" value={this.props.user.maSV} onChange={this.handleChange} />
                            <p className='text text-danger'>{this.props.errorForm.maSV}</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='form-group'>
                            <label>họ tên</label>
                            <input data-type="letter" className='form-control' id="name" value={this.props.user.name} onChange={this.handleChange} />
                            <p className='text text-danger'>{this.props.errorForm.name}</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='form-group'>
                            <label>email</label>
                            <input data-type="email" className='form-control' id="email" value={this.props.user.email} onChange={this.handleChange} />
                            <p className='text text-danger'>{this.props.errorForm.email}</p>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='form-group'>
                            <label>số điện thoại</label>
                            <input data-type="number" data-min-max-length="[9,10]" className='form-control' id="SDT" value={this.props.user.SDT} onChange={this.handleChange} />
                            <p className='text text-danger'>{this.props.errorForm.SDT}</p>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <button className='btn btn-success mt-2 me-2' id="themSV" type="submit" disabled={this.props.disabled}> Thêm Sinh Viên</button>

                            {/* style={{visibility:'hidden'}} */}
                            <button className='btn btn-success mt-2 me-2' id="suaSV" type='button'  onClick={() => {

                                const values = this.props.user;

                                const action = {

                                    type: 'UPDATE_USER',
                                    payload: values
                                }
                                this.props.dispatch(action);
                            }}>Update</button>




                            <button className='btn btn-success mt-2 me-2' type="reset" value="Reset" onClick={() => {
                                document.querySelector('#themSV').disabled = false;
                                document.querySelector('#suaSV').disabled = true;
                                document.querySelector('#maSV').disabled = false;
                            }}>Reset</button>
                        </div>
                    </div>
                </div>




            </form>
        )
    }
    componentDidUpdate() {
        let res = this.checkInValidForm(this.props.errorForm);

        const actionDisabledOff = {
            type: 'ON_OFF',
            payload: res
        }
        this.props.dispatch(actionDisabledOff);
    }

}

const mapStateToProps = (state) => ({
    user: state.userReducer,
    arrUser: state.arrUserReducer,
    errorForm: state.errorFormReducer,
    disabled: state.disabledReducer
})


export default connect(mapStateToProps)(UserForm)