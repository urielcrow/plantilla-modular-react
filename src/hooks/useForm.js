import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [state, setState] = useState(initialState)

    const changeInput = (e)=>{
        setState({
            ...state,
            [e.target.name]:{
                ...state[e.target.name],
                val: e.target.value
            }
        });
    }

    const focus = (e)=>{
        setState({
            ...state,
            [e.target.name]:{
                ...state[e.target.name],
                focus: true
            }
        });
    }

    const blur = (e)=>{
        if(e.target.value.trim() !== "")
            return;
        
        setState({
            ...state,
            [e.target.name]:{
                ...state[e.target.name],
                focus: false
            }
        });
    }

    const updateForm = (form)=>{
        setState(form);
    }

    return [state,updateForm,changeInput,focus,blur];
    
}

export const configInput = (params)=>{
    const {
        val = '',
        type = "text",
        required = false,
        focus = false,
        error = false}  =  params;

    return{
        val,
        type,
        required,
        focus,
        error
    }
}

export const validateCustome = (form,updateForm)=>{

    let errores = false;
    let formTemp = {...form};

    Object.keys(formTemp).forEach( input =>{

        formTemp[input].error = false;

        switch (formTemp[input].type) {
            case "text":
                    if( formTemp[input].val.trim() === "" && formTemp[input].required){
                        formTemp[input].error = true;
                        errores = true;
                    }
            break;

            case "mail":
                    if( formTemp[input].val.trim() === "" && formTemp[input].required){
                        formTemp[input].error = true;
                        errores = true;
                    }
                    else if( formTemp[input].val.trim() !== "" && !formTemp[input].val.trim().match(/^([a-zA-Z0-9._-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)  ){
                        formTemp[input].error = true;
                        errores = true;
                    }
            break;
        
            default:
            break;
        }
    });

    if(errores){
        updateForm(formTemp);
    }


    return errores;
}

/******************************Ejemplo de uso********************************
const [form,updateForm,changeInput,focus,blur] = useForm({
    usuario : configInput( "", "mail", true),
    ....
});

const sendSubmit = (e)=>{
    e.preventDefault();
    validateCustome(form,updateForm) ? console.log('no enviado') : console.log('enviado...');
}

<form>
    <label className={form.usuario.focus ? 'focusActive' : ''}>Usuario</label>
    <input name="usuario" type="text" onChange={changeInput} onFocus={focus} onBlur={blur} value={form.usuario.val} autoComplete="off"/>
    <div className="text-danger">{ form.usuario.error && 'Obligatorio' }</div>
</form>


.focusActive{
    margin-top: -15px;
}

******************************************************************************/