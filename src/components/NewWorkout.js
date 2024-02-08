import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/clients';


const NewWorkout = ({ clients, setClients }) => {

  const [newWorkout, setNewWorkout] = useState({
    workoutName: '',
    details: '',
    exercises: []
  });


  const navigate = useNavigate();
  const {clientId} = useParams();

  const client = clients.find((client)=> client.clientId === parseInt(clientId));


  const workouts = client.workouts


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/clients/${parseInt(clientId)}/workout/new`, {
        workoutName: newWorkout.workoutName,
        details: newWorkout.details,
      });
  
      const { workoutId } = response.data;
  
      const updatedClients = clients.map((client) =>
        client.clientId === parseInt(clientId)
          ? {
              ...client,
              workouts: [...client.workouts, response.data],
            }
          : client
      );
  
      setClients(updatedClients);
      setNewWorkout({
        workoutName: '',
        details: '',
      });
  
      navigate(`/clients/${clientId}/workout/${workoutId}`);
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };


  return (
    <div className='m-3'>
      <form onSubmit={handleSubmit}>
        <label>Workout Name:</label>
        <input 
        className='form-control'
        id='workoutName'
        type='text'
        value={newWorkout.workoutName}
        onChange={(e) => setNewWorkout({ ...newWorkout, workoutName: e.target.value })}
        required
        />
        <label>Workout Details:</label>
        <input 
        className='form-control'
        id='details'
        type='text'
        value={newWorkout.details}
        onChange={(e) => setNewWorkout({ ...newWorkout, details: e.target.value })}
        required
        />
        <div className='d-flex justify-content-center'>
        <button type='button' className='btn btn-warning w-100 m-1' onClick={()=>navigate(`../${clientId}`)}>Go Back</button>
        <button type='submit' className='btn btn-primary w-100 m-1'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default NewWorkout
