import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useForm,validateCustome,configInput } from '../../hooks/useForm';
import { startLogin } from '../../actions';
import './login.css';

export const Login = () => {

    const {name} = useSelector( store => store.auth );
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        type:'password',
        check:'fa-square color-disabled-check'
    });

    const changeType = (val)=>{
        let [type,check] = ['password','fa-square color-disabled-check'];
        
        if(val === 'password'){
            type = 'text';
            check = 'fa-check-square color-enabled-check';
        }

        setInput({
            type,
            check
        });
    }

    const [form,updateForm,changeInput,focus,blur] = useForm({
        usuario : configInput( {val:"urielcrow@gmail.com", type:"mail", required:true, focus:true} ),
        pass : configInput( {val:"RobMax2018@", type:"text", required:true, focus:true} )
    });

    const resetPass = async()=>{
        const { value: email } = await Swal.fire({
            title: 'Recuperar contraseña',
            input: 'email',
            inputLabel: 'Escribe tu suario',
            inputPlaceholder: '...'
        })
          
        if (email) {
            Swal.fire({
                icon: 'success',
                title: '',
                text: "En breve recibiras un correo con las instrucciones para recuperar tu contraseña",
            })
        }
    }

    const sendSubmit = (e)=>{
        e.preventDefault();
        if(!validateCustome(form,updateForm)){
            dispatch( startLogin(form.usuario.val,form.pass.val) );
        }
    }

    if(!!name)
        return <Navigate to="/inicio"/>;

    return (
        <div className="login-area login-bg">
            <div className="container">
                <div className="login-box ptb--100">
                    <form onSubmit={sendSubmit}>
                        <div className="login-form-head"></div>
                        <div className="login-form-body">

                            <div className="form-gp">
                                <label className={form.usuario.focus ? 'focusActive' : ''}>Usuario</label>
                                <input name="usuario" type="text" onChange={changeInput} onFocus={focus} onBlur={blur} value={form.usuario.val} autoComplete="off"/>
                                <i className="fa fa-user"></i>
                                <div className="text-danger">{ form.usuario.error && 'Obligatorio' }</div>
                            </div>

                            <div className="form-gp">
                                <label className={form.pass.focus ? 'focusActive' : ''}>Contraseña</label>
                                <input name="pass" type={input.type} onChange={changeInput} onFocus={focus} onBlur={blur} value={form.pass.val} autoComplete="off"/>
                                <i className="fa fa-lock"></i>
                                <div className="text-danger">{ form.pass.error && 'Obligatorio' }</div>
                            </div>
        
                            <div className="row custom-control custom-checkbox mr-sm-2 mb-5">
                                <div className="col-sm-6">
                                    <div style={{position:'absolute',cursor:'pointer',zIndex:3}} onClick={()=>changeType(input.type)}>
                                        <i className={`fa ${input.check} fa-2x me-1`} style={{cursor:'pointer'}}></i>
                                        <label className="custom-control-label ml-3" style={{cursor:'pointer'}}>Mostrar</label>
                                    </div>
                                </div>
                                <div className="col-md-6 text-right">
                                    <span style={{cursor:'pointer'}} onClick={resetPass}>Olvidé mi contraseña</span>
                                </div>
                            </div>
        
                            <div className="submit-btn-area">
                                <button type="submit">Enviar <i className="fa fa-arrow-right"></i></button>
                            </div>
                           
                        </div>
                    
                    </form>
                    
                </div> 
            </div>
        </div>
    );

}
