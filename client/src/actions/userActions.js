import { NEW_USER, FETCH_PRODUCTS } from './types';
// import history from './history';
import axios from 'axios';
import history from '../history';
let baseUrl = 'http://localhost:5000'


// //Get All Registered Users
export const getProducts = () => async dispatch => {
    let token = localStorage.getItem('token');
    return await axios.get(baseUrl + '/user/products', { 'headers': { 'Authorization': token } })
      .then((res) => {
        if (res.status === 201 && res.data.success) {
            //console.log(res.data.users)
          dispatch({
              type : FETCH_PRODUCTS,
              payload : res.data.products
          })
        }
      })
  }


// Registration function
export const createUser = userData => async dispatch => {
    console.log(userData, "login data")
    return await axios.post(baseUrl + '/user/register', userData)
      .then(res => {
        //console.log(res.data.success , 'data')
        if (res.data.success === true) {
            console.log('anshul registered')
          dispatch({
            type: NEW_USER,
            payload: res.data.user
          })
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.user._id)
          history.push('/');
        }
      }
      )
      .catch((e) => {
        alert('Invalid authentication')
      })
  
  };

 // Login Function 
export const createLogin = loginData => async dispatch => {
    console.log(loginData, "login data")
    return await axios.post(baseUrl + '/user/login', loginData)
      .then(res => {
        //console.log(res.data.success , 'data')
        if (res.data.success === true) {
          dispatch({
            type: NEW_USER,
            payload: res.data.user
          })
          let name =  res.data.user.firstName ? res.data.user.firstName : 'Hello'
          console.log(name)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.user._id)
          localStorage.setItem('userName', name)
          history.push('/');
          localStorage.setItem('loginTime', Date.now())
          setTimeout(() => {
            console.log('anshul')
            dispatch(logout())
          }, 60000)
        }
      }
      )
      .catch((e) => {
        alert('Invalid authentication')
        
      })
  
  };

  export const logout = () => async dispatch => {
    let token = localStorage.getItem('token');
    console.log(token, 'token')
    return axios.post(baseUrl + '/user/logout', "", { headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" } })
      .then((response) => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.setItem('loginTime', Date.now())
        history.push('/login')
        window.onpopstate = (url) => {
          console.log(url)
          let token = localStorage.getItem('token');
          if (!token) {
            history.push('/login')
          }
        }
      })
      .catch(error => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.setItem('loginTime', Date.now())
        history.push('/login')
        window.onpopstate = (url) => {
          console.log(url)
          let token = localStorage.getItem('token');
          if (!token) {
            history.push('/')
          }
        }
        console.log(error, 'error')
      })
  }