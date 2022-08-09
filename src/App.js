import {useState} from 'react';
import { Provider } from 'react-redux';
import { store } from './store/stores';
import { RoutApp1 } from './routes/RoutApp1';
import { customeContext, initValue } from './context/context';



export const App = () =>{

    const [context, setContext] = useState(initValue);
    
    return (
        <Provider store = {store}>
            <customeContext.Provider value={{context,setContext}}>
                <RoutApp1 />
            </customeContext.Provider>
        </Provider>
    )
   

}