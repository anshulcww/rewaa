import React, { Component } from 'react';
// import { getUsers } from '../../actions/userActions'
import { logout } from '../../actions/userActions'
// import { editUser } from '../../actions/userActions'
// import { deleteUser } from '../../actions/userActions'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalIsOpen: false,
            firstName: '',
            lastName: '',
            email: '',
            userId : ''
        }
        this.handleModal = this.handleModal.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    async handleDeleteUser(select){
        let userId = select._id
        await this.props.deleteUser(userId)
    }


    async handleSubmit(e){
        e.preventDefault();
        let body = {
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            email: this.state.email,
            updateUserId : this.state.userId
        }
        await this.props.editUser(body)
        this.setState({
            modalIsOpen : false
        })
    }

    handleClick(select) {
        this.setState({
            modalIsOpen: true,
            firstName: select.firstName,
            lastName: select.lastName,
            email: select.email,
            userId : select._id
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    handleModal() {
        this.setState({
            modalIsOpen: false
        })
    }
    async handleLogout(e) {
        e.preventDefault()
        await this.props.logout()
    }
    async componentDidMount() {

        // await this.props.getUsers()
    }

    render() {
        let isAuth = localStorage.getItem('token')
        let loginTime = localStorage.getItem('loginTime')
        if (!isAuth) {
            return <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        }
        // if(loginTime !== null && Date.now() - loginTime > 6000){
        //     //localStorage.removeItem('loginTime')
        //     return  <Redirect
        //     to={{
        //         pathname : '/login'
        //     }}
        //     /> 
        // }
        let userName = localStorage.getItem('userName');       
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'><h2>Dashboard</h2></div>
                    <div className='col'><h3>{userName ? userName : 'Hello'}</h3><span><button type='button' onClick={this.handleLogout}>Log out</button></span></div>
                </div>
                <div className='row'>
                    {
                        this.props.products.map((p, index) => (
                            <div className="card user-card" key={index}>
                                <div class="card-body">
                                    <h5 class="card-title"><span>{p.productName}</span><span> {u.productType}</span></h5>
                                </div>
                            </div>
                        ))
                    }
                </div>
       
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.user.products,
    user: state.user.user
})


export default connect(mapStateToProps, {  logout })(DashboardComponent);
