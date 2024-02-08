import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns';
import api from '../api/clients';


const AddExercise = ({client, workout, clients, setClients}) => {
    const [newExercise, setNewExercise] = useState({
        exerciseName: '',
        exerciseDetails: '',
        exercisePerformance: ''
    })

    const {clientId, workoutId} = useParams();

    const exercises = workout?.exercises || []

    const handleChange = (event)=>{
      const { id, value } = event.target
      setNewExercise((prevExercise)=>({ ...prevExercise, [id]: value }))
    }

    const handleAddExercise = async (event) => {
      event.preventDefault();
      try {
        const response = await api.post(`/clients/${parseInt(clientId)}/workout/${parseInt(workoutId)}`, {
          exerciseName: newExercise.exerciseName,
          exerciseDetails: newExercise.exerciseDetails,
          exercisePerformance: newExercise.exercisePerformance
        });
    
        const updatedWorkout = response.data;
        console.log('Response Data:', response.data);
        console.log('Updated Workout:', updatedWorkout);
    
        setClients((prevClients) => {
          console.log('Previous Clients State:', prevClients);
        
          const updatedClients = prevClients.map((c) =>
            c.clientId === parseInt(clientId)
              ? {
                  ...c,
                  workouts: c.workouts.map((w) =>
                    w.workoutId === parseInt(workoutId)
                      ? { ...w, exercises: [...w.exercises, updatedWorkout] }
                      : w
                  ),
                }
              : c
          );
        
          console.log('Updated Clients State:', updatedClients);
          return updatedClients;
        });        
    
        setNewExercise({
          exerciseName: '',
          exerciseDetails: '',
          exercisePerformance: '',
        });
      } catch (error) {
        console.log(error);
      }
    };  

  return (
    <div>
        <form>
            <div className='row'>
            <div className='col'>
            <input 
            className='form-control'
            id='exerciseName'
            type='text'
            placeholder='Exercise Name'
            value={newExercise.exerciseName}
            onChange={handleChange}
            required
            />
            </div>
            <div className='col'>
            <input 
            className='form-control'
            id='exerciseDetails'
            type='text'
            placeholder='Sets & Reps'
            value={newExercise.exerciseDetails}
            onChange={handleChange}
            />
            </div>
            <div className='col'>
            <input 
            className='form-control'
            id='exercisePerformance'
            type='text'
            placeholder='Performance'
            value={newExercise.exercisePerformance}
            onChange={handleChange}
            />
            </div>
            </div>
            <button className='btn btn-success w-100 my-2' type='submit' onClick={handleAddExercise}>Add</button>
        </form>
    </div>
  )
}

export default AddExercise
