import { format } from 'date-fns';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Search = ({clients}) => {
    const [search, setSearch] = useState('')
    const [displaySearch, setDisplaySearch] = useState([])

    const {clientId} = useParams();
    const navigate = useNavigate()

    const client = clients.find((client)=> client.clientId === parseInt(clientId));

    const workouts = client.workouts

    const exercises = workouts.map((workout)=>workout.exercises)

    useEffect(() => {
        const flattenedExercises = [].concat(...exercises);
        const filteredExercises = flattenedExercises.filter((exercise) => {
          const exerciseName = exercise.exerciseName || '';
          return exerciseName.toLowerCase().includes(search.toLowerCase());
        });
        const sortedExercises = filteredExercises.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDisplaySearch(sortedExercises);
      }, [search]);


    return (
        <div>
          <input
            className='form-control'
            type="text"
            placeholder="Search Exercises"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Exercises</th>
                <th scope="col">Details</th>
                <th scope="col">Performance</th>
              </tr>
            </thead>
            <tbody>
                {displaySearch.map((exercise) => (
                    <tr key={exercise.exerciseId}>
                    <td>{format(new Date(exercise.date), 'MM/dd/yy')}</td>
                    <td>{exercise.exerciseName}</td>
                    <td>{exercise.exerciseDetails}</td>
                    <td>{exercise.exercisePerformance}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          <button className='btn btn-warning w-100' onClick={()=>navigate(-1)}>Back</button>
        </div>
      );
    };

export default Search
