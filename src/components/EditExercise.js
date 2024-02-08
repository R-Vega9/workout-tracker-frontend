import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
    

    const handleSubmit = (event)=>{
        event.preventDefault()
        const updatedClients = clients.map((client)=>{
            if(client.clientId === parseInt(clientId)){
                const updatedWorkouts = client.workouts.map((workout)=>{
                    if(workout.workoutId === parseInt(workoutId)){
                        const updatedExercises = workout.exercises.map((exercise)=>{
                            if(exercise.exerciseId === parseInt(exerciseId)){
                                return {
                                    ...exercise,
                                    exerciseName: exerciseName || exercise.exerciseName,
                                    exerciseDetails: exerciseDetails || exercise.exerciseDetails,
                                    exercisePerformance: exercisePerformance || exercise.exercisePerformance,
                                  };
                            }
                            return exercise
                        })
                        return {...workout, exercises: updatedExercises}
                    }
                    return workout;
                })
                return {...client, workouts: updatedWorkouts}
            }
            return client
        })
        setClients(updatedClients)
        navigate(`../${clientId}/workout/${workoutId}`);
    }

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
