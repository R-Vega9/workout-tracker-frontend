import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/clients';


const EditExercise = ({clients, setClients}) => {

    const {clientId, workoutId, exerciseId} = useParams();

    const navigate = useNavigate();

    const [client] = clients.filter((client)=> client.clientId === parseInt(clientId));

    const workouts = client.workouts || []

    const [workout] = workouts.filter((workout)=> workout.workoutId === parseInt(workoutId))

    const exercises = workout ? workout.exercises : [];

    const [exercise] = exercises.filter((exercise)=> exercise.exerciseId === parseInt(exerciseId))

    const [exerciseName, setExerciseName] = useState(exercise.exerciseName || '');
    const [exerciseDetails, setExerciseDetails] = useState(exercise.exerciseDetails || '');
    const [exercisePerformance, setExercisePerformance] = useState(exercise.exercisePerformance || '');
    

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await api.put(`/clients/${parseInt(clientId)}/workout/${parseInt(workoutId)}/exercise/${parseInt(exerciseId)}`, {
              exerciseName,
              exerciseDetails,
              exercisePerformance
          });
          const updatedExercise = response.data;

          console.log(updatedExercise)

          const updatedClients = clients.map((client) => {
              if (client.clientId === parseInt(clientId)) {
                  const updatedWorkouts = client.workouts.map((w) => {
                      if (w.workoutId === parseInt(workoutId)) {
                          const updatedExercises = w.exercises.map((ex) => {
                              if (ex.exerciseId === parseInt(exerciseId)) {
                                  return updatedExercise;
                              }
                              return ex;
                          });
                          return { ...w, exercises: updatedExercises };
                      }
                      return w;
                  });
                  return { ...client, workouts: updatedWorkouts };
              }
              return client;
          });
          setClients(updatedClients);
          navigate(`../${clientId}/workout/${workoutId}`);
      } catch (error) {
          console.error('Error updating exercise:', error);
      }
  };

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
          case 'exerciseName':
            setExerciseName(value);
            break;
          case 'exerciseDetails':
            setExerciseDetails(value);
            break;
          case 'exercisePerformance':
            setExercisePerformance(value);
            break;
          default:
            break;
        }
      };


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Exercise Name:</label>
                <input 
                className='form-control'
                id='exerciseName'
                type='text'
                value={exerciseName}
                onChange={(e)=> handleChange(e, 'exerciseName')}
                required
                />
                <label>Exercise Details:</label>
                <input 
                className='form-control'
                id='exerciseDetails'
                type='text'
                value={exerciseDetails}
                onChange={(e)=> handleChange(e, 'exerciseDetails')}
                required
                />
                <label>Performance:</label>
                <input 
                className='form-control'
                id='exercisePerformance'
                type='text'
                value={exercisePerformance}
                onChange={(e)=> handleChange(e, 'exercisePerformance')}
                required
                />
                <button type='submit' className='btn btn-success w-100 my-2'>Save</button>
                <button onClick={()=>navigate(-1)} type='button' className='btn btn-warning w-100'>Back</button>
        </form>
    </div>
  )
}

export default EditExercise
