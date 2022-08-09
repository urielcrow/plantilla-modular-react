import { fetchCustome } from '../helpers/fetch';
import { getToken, setToken, nameToken} from '../helpers/token';
import Swal from 'sweetalert2';
import { preload } from '.';
import { types } from '../types/types';

//#region 
/* startLogin ------> Verificamos las credenciales del usuario para el logeo en caso de que sea correcto almacenamos el token en el localstorage y modificamos el estado auth en el reducer
 * endLogin   ------> Limpiamos el estado auth del reducer y eliminamos el token del local storage
 * checkLogin ------> Verificamos que el token almacenado en el local storage sea veridico y este vigente
 * 
 * 
 * 
 * 
 */
//#endregion

export const startLogin = (usuario, pass) =>{
   
    return async(dispatch)=>{

        dispatch( preload(true) );//Efecto de carga

        try{
            let resp = await fetchCustome(  { endpoint : 'autenticacion', body : JSON.stringify({usuario,pass}), method : 'POST'}  );
            resp = await resp.json();
            
            if( parseInt(resp.result.code) === 200){
                setToken(resp.result.msg);
                //En types/types únicamente considero por defecto access = administrador || estandar
                dispatch(startLogin_({
                    name:'Uriel',
                    access:'administrador',
                    image: 'http://192.168.0.211/diversos/apis/backend-cliente-almer/img/no-image.jpg'
                }));
                return;
            }

            Swal.fire({
                icon: 'error',
                title: 'Datos incorrectos',
                text: 'Verifica tu información',
            });
        }
        catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Error interno',
                text: e,
            });
        }
        finally{
                dispatch( preload(false) );//Efecto de carga
        }
    } 
}

export const endLogin = () =>{
   
    return (dispatch)=>{

        dispatch( preload(true) );//Efecto de carga

        dispatch(endLogin_());

        localStorage.removeItem(nameToken);

        dispatch( preload(false) );//Efecto de carga
       
    } 
}

export const checkLogin = () =>{
   
    return async(dispatch)=>{

        const existe = getToken();
        
        if(existe){
            try{
                 let resp = await fetchCustome(  { endpoint : 'autenticacion', token : true}  );
                 resp = await resp.json();
                 
                 if( parseInt(resp.result.code) === 200){
                     //console.log(resp.result.msg);
                      //En types/types únicamente considero por defecto access = administrador || estandar
                     dispatch(startLogin_({
                         name:'Uriel',
                         access:'administrador',
                         image: 'http://192.168.0.211/diversos/apis/backend-cliente-almer/img/no-image.jpg'
                     }));
                     return;
                 }
    
                 localStorage.removeItem(nameToken);//Removemos el token en caso de que hubiera caducado o no sea valido
            }
            catch(e){
                 Swal.fire({
                     icon: 'error',
                     title: 'Error interno',
                     text: e,
                 });
            }
            finally{
                 dispatch( preload(false) );//Efecto de carga
            }
        }

        dispatch( preload(false) );//Efecto de carga
    } 
}

const startLogin_ = ( user ) =>({
    type: types.login,
    payload: user
});

const endLogin_ = ( ) =>({
    type: types.logout
});
