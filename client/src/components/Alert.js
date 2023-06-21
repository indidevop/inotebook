import {React,useContext} from 'react'
import noteContext from '../contexts/notes/noteContext';

const capitalize=(word)=>{
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function Alert() {
    const {alert}=useContext(noteContext);
    return (
        <div style={{height:'60px'}}>
        {alert && <div>
            <div className={`alert alert-${alert.type} alert fade show`} role="alert">
                 {capitalize(alert.msg)}
            </div>
        </div>}
        </div>
    )
}
