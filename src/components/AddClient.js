import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import api from '../api/clients';

const AddClient = ({clients, setClients}) => {

    const [newClient, setNewClient] = useState({
      name: '',
      workouts: []
    })

    const [newWorkout, setNewWorkout] = useState({
      workoutName: '',
      details: '',
      exercises: []
    })

    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const updatedClient = {
          name: newClient.name,
          workouts: [
            {
              date: format(new Date(), 'MMMM dd, yyyy'),
              workoutName: newWorkout.workoutName,
              details: newWorkout.details,
              exercises: []
            }
          ]
        }
        try {
          const response = await api.post('/clients', updatedClient);
          const allClients = [...clients, response.data];
          setClients(allClients);
          setNewClient({ name: '', workouts: [] });
          setNewWorkout({ workoutName: '', details: '' });
          navigate(`/clients/${response.data.clientId}`);
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="m-3">
            <label htmlFor="name" className="form-label">Clients Name:</label>
            <input 
            id="name"
            type="text" 
            className="form-control" 
            value={newClient.name}
            onChange={(event)=>setNewClient({...newClient, name: event.target.value})}
            required
            />
            <label htmlFor="workoutName" className="form-label">Workout Name:</label>
            <input 
            id='workoutName'
            type='text'
            className='form-control'
            value={newWorkout.workoutName}
            onChange={(event)=>setNewWorkout({...newWorkout, workoutName: event.target.value})}
            required
            />
            <label>Details:</label>
            <input 
            id='workoutDetails'
            type='text'
            className='form-control'
            value={newWorkout.details}
            onChange={(event)=>setNewWorkout({...newWorkout, details: event.target.value})}
            required
            />
            <div className='d-flex justify-content-center'>
                <button type='submit' className='btn btn-success m-1'>Submit</button>
                <button onClick={()=>navigate('/')} className='btn btn-primary m-1'>Home Page</button>
            </div>
            </div>
    </form>
  )
}

export default AddClient
