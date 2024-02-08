import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';


const EditWorkout = ({ clients }) => {

    const {clientId, routineId, workoutId} = useParams();
    const navigate = useNavigate()

    const [client] = clients.filter((client)=> client.clientId === parseInt(clientId));



    const workouts = client.workouts

    const [workout] = workouts.filter((workout)=> workout.workoutId === parseInt(workoutId))

    const exercises = workout.exercises

    console.log(exercises)

    const exerciseOptions = exercises.map((exercise)=>(
        <option key={exercise.exerciseId}>{exercise.exerciseName}</option>
    ))
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Exercises</th>
            <th scope="col">Details</th>
            <th scope="col">Performance</th>
          </tr>
        </thead>
        <tbody>
            <tr className='form-floating'>
                <td>
                    <select
                    className='form-select'
                    id='floatingSelect'
                    type='text'
                    value={''}
                    onChange={''}
                    >
                        <>
                        <option>Select Exercise</option>
                        {exerciseOptions}
                        </>
                    </select>
                </td>
            </tr>
        </tbody>
        </table>
        <button className='btn btn-primary w-100 my-3' onClick={()=>navigate(-1)}>Add New Exercise</button>
        <button className='btn btn-warning w-100' onClick={()=>navigate(`../${clientId}/routines/${routineId}/workout/${workoutId}`)}>Cancel</button>
    </div>
  )
}

export default EditWorkout
