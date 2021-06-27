import {useEffect, useState, useRef} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { ToggleButton } from 'primereact/togglebutton';
import {Link} from "react-router-dom";
import { Toast } from 'primereact/toast';


function Tareas () {

    let emptyTask = {
        name: '',
        userId: '18',
        completed: false
    };

    const [submitted, setSubmitted] = useState(false);
    const [tareasPendientes, setTareasPendientes] = useState([]);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [task, setTask] = useState(emptyTask);
    const toast = useRef(null);
    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
        setTask(emptyTask);
        setSubmitted(false);
        if (position) {
            setPosition(position);
        }
    }



    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
        setSubmitted(false);
    }
    const getTasks =()=>{
        fetch('https://60d4bf2fc6549200173a4ceb.mockapi.io/users/18/tasks')
            .then(r => r.json())
            .then(r => {
                let temp = [];
                const completadas = r.filter( item => item.completed);
                const noCompletadas = r.filter( item => !item.completed);

                temp = [...temp, ...completadas];
                temp = [...temp, ...noCompletadas];

                setTareasPendientes(temp);

            }).catch(error => {

        });
    }



    useEffect(()=>{
        getTasks();
    },[]);

    const saveTask = (name) => {
        setSubmitted(true);

        if (task.name.trim()) {
            fetch('https://60d4bf2fc6549200173a4ceb.mockapi.io/users/18/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(r => r.json())
                .then(r => {
                   debugger;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Tarea Creada', life: 3000 });

                    setTask(emptyTask);
                    getTasks();
                    dialogFuncMap[`${name}`](false);

                }).catch(error => {

            });
        }
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Guardar" icon="pi pi-check" onClick={() => saveTask(name)} autoFocus />
            </div>
        );
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _task = {...task};
        _task[`${name}`] = val;

        setTask(_task);
    }


    return (
        <>
            <Toast ref={toast} />
            <div className="p-grid">
                <div className="p-col-12 p-d-flex p-jc-start">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="p-col-12 p-d-flex p-jc-center">
                    <Button label="Agregar Nueva Tarea" icon="pi pi-plus"
                            onClick={() => onClick('displayResponsive')} />
                </div>
                <div className="p-col-12 p-d-flex p-jc-center">
                    <Dialog header="Nueva Tarea" visible={displayResponsive}
                            onHide={() => onHide('displayResponsive')} modal
                            className="p-fluid" breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}
                            footer={renderFooter('displayResponsive')}>
                        <div className="p-field">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name" value={task.name} onChange={(e) => onInputChange(e, 'name')}
                                       required autoFocus className={classNames({ 'p-invalid': submitted && !task.name })} />
                            {submitted && !task.name && <small className="p-error">Nombre es requerido.</small>}


                        </div>
                        <div className="p-field">
                            <label htmlFor="completed">Completado</label>

                            <ToggleButton checked={task.completed} onChange={(e) => onInputChange(e, 'completed')}  onLabel="SI" offLabel="NO" onIcon="pi pi-check" offIcon="pi pi-times" />

                        </div>
                    </Dialog>
                    <ul>
                        {
                            tareasPendientes && tareasPendientes.length && (
                                tareasPendientes.map((item, index)=>{
                                    return (<li key={index}>
                                        {item.name}
                                    </li>);
                                })
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Tareas;
