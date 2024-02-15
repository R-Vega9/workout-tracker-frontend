import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Missing from "./components/Missing";
import AddClient from "./components/AddClient";
import WorkoutsList from "./components/WorkoutsList";
import Exercises from "./components/Exercises";
import EditWorkout from "./components/EditWorkout";
import NewWorkout from "./components/NewWorkout";
import EditExercise from "./components/EditExercise";
import Search from "./components/Search";
import api from './api/clients';

function App() {

  const [clients, setClients]= useState([]);


useEffect(()=>{
  const fetchData = async()=>{
    try {
      const response = await api.get('/clients')
      setClients(response.data.clients)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData()
}, [])

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home clients={clients}/>}/>
        <Route path="clients">
          <Route path="new" element={<AddClient clients={clients} setClients={setClients}/>}/>
          <Route path=":clientId" element={<WorkoutsList clients={clients} setClients={setClients}/>}/>
          <Route path=":clientId/exercises/search" element={<Search clients={clients}/>} />
          <Route path=":clientId/workout/new" element={<NewWorkout clients={clients} setClients={setClients}/>}/>
          <Route path=":clientId/workout/:workoutId" element={<Exercises clients={clients} setClients={setClients}/>}/>
          <Route path=":clientId/workout/:workoutId/edit" element={<EditWorkout clients={clients}/>}/>
          <Route path=":clientId/workout/:workoutId/exercise/:exerciseId/edit" element={<EditExercise clients={clients} setClients={setClients}/>}/>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
