import React, {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddExercise from './AddExercise'

const Exercises = ({clients, setClients}) => {

    const navigate = useNavigate()

    const {clientId, workoutId} = useParams()

    const client = clients.find(
      (client) => client.clientId === parseInt(clientId)
    );
    const workouts = client ? client.workouts : [];

    const workout = workouts.find((workout)=> workout.workoutId === parseInt(workoutId))

    const exercises = workout ? workout.exercises : [];

    const displayExercises = exercises ? (
      exercises.map((exercise) => (
        <tr key={exercise.exerciseId}>
          <td>{exercise.exerciseName}</td>
          <td>{exercise.exerciseDetails}</td>
          <td>{exercise.exercisePerformance}</td>
          <td>
            <button
              className='btn btn-warning'
              onClick={() => navigate(`../${clientId}/workout/${workoutId}/exercise/${exercise.exerciseId}/edit`)}
            >
              Edit
            </button>
          </td>
        </tr>
      ))
    ) : null;


    return (
      client ? (
          <div style={{ overflow: "scroll" }}>
            <h3 className='text-center'>{`${client.name}'s ${workout ? workout.workoutName : 'Workout'}`}</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Exercises</th>
                  <th scope="col">Details</th>
                  <th scope="col">Performance</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {displayExercises}
              </tbody>
            </table>
            <div><AddExercise client={client} workout={workout} clients={clients} setClients={setClients}/></div>
            <button onClick={()=>navigate(`../${clientId}/exercises/search`)} className='btn btn-dark w-100 mb-1'>Search Exercise History</button>
            <button className='btn btn-primary mt-1 w-100' onClick={()=>navigate(`../${clientId}`)}>Go Back</button>
          </div>
      ) : (
        <h1>Loading...</h1>
      )
    );    
}

export default Exercises
