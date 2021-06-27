import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import { Badge } from 'primereact/badge';
import { useHistory } from 'react-router-dom';

function Home () {
    const history = useHistory();
    const [tareasPendientes, setTareasPendientes] = useState([]);

    useEffect(()=>{
        fetch('https://60d4bf2fc6549200173a4ceb.mockapi.io/users/18/tasks')
            .then(r => r.json())
            .then(r => {
                setTareasPendientes(r);
            }).catch(error => {

        });
    },[]);


    const handleTask =()=> {
        history.push("/tareas");
    }

    return (
        <>
            <div className="p-grid">
                <div className="p-col-12 p-d-flex p-jc-center p-ai-center">
                    <span className="p-m-1">Tareas Pendientes</span>
                    <Badge value={tareasPendientes?.length || null} size="xlarge" severity="success"/>

                </div>
                <div className="p-col-12 p-d-flex p-jc-center">
                    <Button label="ver tareas" className="p-button-raised p-button-sm" onClick={handleTask} />
                </div>
            </div>
        </>
    );
}
export default Home;
