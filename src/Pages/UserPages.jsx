import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserForm from './UserForm'

class UserPages extends Component {
    handleSearch = (e) => {
        const { value } = e.target;
        // console.log(stringToSlug(value))
        if (value !== '') {
            const action = {
                type: 'SEARCH_BY_NAME',
                payload: value
            }
            this.props.dispatch(action);
        } else {
            if (localStorage.getItem('arrSinhVien')) {
                var stringArrSinhVien = localStorage.getItem('arrSinhVien');
                var arrSinhVien = JSON.parse(stringArrSinhVien);
                // console.log("arrSinhVien: ", arrSinhVien);
                const action = {
                    type: 'GET_LOCAL_STORAGE',
                    payload: arrSinhVien
                }
                this.props.dispatch(action);
            }
        }

    }

    render() {
        const { arrUser } = this.props;

        return (

            <div className='container'>
                <UserForm />
                <label className='mt-2 fs-5 fw-3'>Search By Name</label>
                <input className='my-3' type="text" id='searchBar' style={{ width: "100%" }} onChange={this.handleSearch} />
                <table className='table mt-2'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <th>mã SV</th>
                            <th>họ tên</th>
                            <th>email</th>
                            <th>số điện thoại</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrUser.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.maSV}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.SDT}</td>
                                <td>
                                    <button className='btn btn-outline-danger mx-2' onClick={() => {
                                        const action = {
                                            type: 'XOA_USER',
                                            payload: item.maSV
                                        }
                                        this.props.dispatch(action);
                                    }}  >Xóa</button>
                                    <button className='btn btn-outline-success mx-2' onClick={() => {
                                        document.querySelector('#themSV').disabled = true;
                                        // document.querySelector('#suaSV').disabled = false;
                                        // this.state.disabled_button = false;
                                        // document.querySelector('#suaSV').style.visibility = 'visible';
                                        document.querySelector('#maSV').disabled = true;

                                        // let tag = document.querySelectorAll('input');
                                        // for(let index of tag){
                                        //     document.getElementById(index.id).value =item[index.id];
                                        // }
                                        const actionDisabledUpdated = {
                                            type: "ON_OFF_UPDATE",
                                            payload: false
                                        }
                                        this.props.dispatch(actionDisabledUpdated)
                                        
                                        const actionResetError = {
                                            type: 'RESET_ERROR',
                                            payload: this.props.user
                                        }
                                        this.props.dispatch(actionResetError)

                                        const action = {
                                            type: "EDIT_USER",
                                            payload: item
                                        }
                                        this.props.dispatch(action)
                                    }}>Sữa</button>
                                </td>
                            </tr>
                        })}


                    </tbody>
                </table>
            </div>
        )
    }
    shouldComponentUpdate (nextProps) {
        if (nextProps.arrUser !== this.props.arrUser) {
            return true
        }
        return false
     }

    componentDidMount() {
        
        if (localStorage.getItem('arrSinhVien')) {
            var stringArrSinhVien = localStorage.getItem('arrSinhVien');
            var arrSinhVien = JSON.parse(stringArrSinhVien);
            // console.log("arrSinhVien: ", arrSinhVien);
            const action = {
                type: 'GET_LOCAL_STORAGE',
                payload: arrSinhVien
            }
            this.props.dispatch(action);
        }
    }
}

const mapStateToProps = (state) => ({
    arrUser: state.arrUserReducer,
    user: state.userReducer
})


export default connect(mapStateToProps)(UserPages)