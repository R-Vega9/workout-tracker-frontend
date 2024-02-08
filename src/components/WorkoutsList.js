import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/clients';

const ClientProfile = ({clients, setClients}) => {
    const {clientId} = useParams();
    const navigate = useNavigate()

    
    const [client] = clients.filter((client)=> client.clientId === parseInt(clientId))
    const workouts = client.workouts


    const handleDelete = async (clientId, workoutId) => {
        if (window.confirm("Are you sure you want to delete? You cannot recover it!")) {
          try {
            await api.delete(`/clients/${clientId}/workout/${workoutId}`)
            const updatedClients = clients.map((client) =>
            client.clientId === parseInt(clientId)
              ? { ...client, workouts: client.workouts.filter((workout) => workout.workoutId !== workoutId) }
              : client
            );
            setClients(updatedClients);
            }
            catch (error) {
            console.log(error)
          }
      }
    };


    const displayWorkouts = workouts.map((workout) => {
      return (
        <div key={workout.workoutId} className="card">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`workout/${workout.workoutId}`}>{workout.workoutName}</Link>
            </h5>
            <p className="card-text">{workout.details}</p>
          </div>
          <button onClick={() => handleDelete(client.clientId, workout.workoutId)} className='btn btn-danger'>Delete</button>
        </div>
      );
    });



    return (
        <main>
        <h1 className='text-center mx-auto'>{`${client.name}'s Workouts`}</h1>
        <button onClick={()=>navigate('/')} className='btn btn-primary w-100'>Home Page</button>
        <Link to={`/clients/${clientId}/workout/new`}><h2 className='text-center mx-auto btn btn-success w-100 my-2'>Add Workout +</h2></Link>
        <div className='list-group d-flex justify-content-start flex-column gap-3'>
          {workouts ? displayWorkouts : "Add Workouts"}
        </div>
        </main>
      )
}

export default ClientProfile;
