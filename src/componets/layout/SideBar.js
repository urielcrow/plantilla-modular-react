
import React , {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { Link,useLocation } from "react-router-dom";
import { menus,stateInit } from '../../routes/tipos/menus';

export const SideBar = ({ setShowHideSideBar, widthScreen, showHideSideBar }) => {

    const {name,image,access} = useSelector( store => store.auth );
    const refSideBar = useRef(null);
    const refDropDownMenu = useRef(null);

    const {pathname:location} = useLocation();

    const [active,setActive] = React.useState({
        ...stateInit,
        [location] : 'active'
    });

    const [ toggleShow , setToggleShow ] = React.useState( false );

    useEffect(()=>{

        const handleClickOutside = (event)=> {
            if (refSideBar.current && !refSideBar.current.contains(event.target) && widthScreen <= 1364 && showHideSideBar === false) 
                setShowHideSideBar(true);

            if (refDropDownMenu.current && !refDropDownMenu.current.contains(event.target)) 
                setToggleShow( false );
        }
    
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    },[widthScreen,showHideSideBar,setShowHideSideBar]);

   
    const changeActive = (val)=>{
        setActive({
            ...stateInit,
            [val]:'active'
        });

        if(val === '/acount')
            setToggleShow( false );//cerramos el Drop Down Menu 

        closeSideBarForClickItem();//si es una resolución baja al dar clic en algún módulo cerramos el sideBar
    }

    const closeSideBarForClickItem = ()=>{
        if(widthScreen <= 1364)
            setShowHideSideBar(true);
    }

    return (
        <div ref={refSideBar} className="sidebar-menu">
            <div className="sidebar-header">
                <div className="logo">
                    <img src="assets/img/logo/logo.png" alt="logo" />
                </div>
            </div>
        
            <div className="col clearfix">
                <div className={`user-profile ${ active['/acount'] && 'perfilActive' }`} style={{ marginLeft : -30}}>
                    <img className="avatar user-thumb"  alt="avatar" src={image} />
                    <div ref={refDropDownMenu}>
                         <h4 className="user-name dropdown-toggle" data-toggle="dropdown" onClick={ ()=>setToggleShow( state => !state) }> { name } <i className="fa fa-angle-down"></i></h4>
                        <div className={`dropdown-menu ${ toggleShow && 'show'}`}>
                            <Link className="dropdown-item link-principal" style={{lineHeight: 4}} to="/acount" onClick={()=>changeActive('/acount')}>Mi cuenta</Link>
                            <Link className="dropdown-item link-principal" style={{lineHeight: 4}} to="/logout">Cerrar sesión  </Link>
                        </div>
                    </div>
                   
                </div>
            </div>
        
            <div className="main-menu">
                <div className="menu-inner">
                    <nav>
                        <ul className="metismenu" id="menu">
                        {
                            menus(access).map(option =>(
                                <li className={active[`${option.to}`]} key={option.name}>
                                    <Link
                                        className="link-principal"
                                        to={`${option.to}`}
                                        onClick={()=>changeActive(`${option.to}`)}
                                    >
                                        <i className={`${option.icon}`}></i> {option.name}
                                    </Link>
                                </li>
                            ))
                        }


                            {/* <li className={active['/inicio']}>
                                    <Link
                                        className="link-principal"
                                        to="/inicio"
                                        onClick={()=>changeActive('/inicio')}
                                    >
                                        <i className="fa fa-home fa-2x fa-fw"></i> Inicio
                                    </Link>
                                </li>
                            */}

                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}


