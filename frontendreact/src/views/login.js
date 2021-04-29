import React , { useEffect }  from 'react'
import {  Link} from 'react-router-dom'
import { query } from '../utils/query'

function Login (){
    const baseURL = process.env.REACT_APP_URL_BACKEND
    
    useEffect( () => {
       console.log('login');
       document.querySelector('#myForm').addEventListener('submit', async  (event)=> {
        event.preventDefault()
        let nombre = event.target.elements['nombre'].value;
        let password = event.target.elements['password'].value;
        let respuesta = await query('/login','post',{nombre,password})
        if(respuesta.status!=200){
            localStorage.removeItem('user')
            window.location.href='/error/inicio'
        }
        respuesta = await respuesta.json()
        window.localStorage.setItem('user',respuesta)
        window.location.href = "/";
      });
      }, []) // este efecto se ejecuta sólo al montarse el componente 

    return (
        <div className="jumbotron">
            <h3>Login de Usuario</h3>
            <br/>

            <form id="myForm" autoComplete="off"> {/* action={`${baseURL}/login`} method="post" */}
                <div className="form-group">
                    <label htmlFor="nombre">Ingrese su nombre</label>
                    <input id="nombre" className="form-control" type="text" name="nombre" required/>
                </div>
                <br/>
                <div className="form-group">
                    <label htmlFor="password">Ingrese su clave</label>
                    <input id="password" className="form-control" type="password" name="password" required/>
                </div>
                <div>
                    <span>No tienes usuario?,</span> <a href="/register">registrate.</a>
                </div>

                <button className="btn btn-success mt-3">Enviar</button>
            </form>
        </div>
    )
}

export default Login