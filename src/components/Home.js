import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Home = ({clients, loading}) => {

  const displayClients = Array.isArray(clients) ? (
    clients.map((client) => (
      <button type='button' className="list-group-item list-group-item-action " key={client.clientId}>
        <Link to={`clients/${client.clientId}`}>{client.name}</Link>
      </button>
    ))
  ) : (
    <h1>Add Client</h1>
  );

  const pleaseWait = <h2 style={{textAlign:"center"}}>Retrieving Data Please Wait...</h2>
  

  return (
    <main>
    <h1 className='text-center mx-auto'>Clients</h1>
    <Link to={"/clients/new"}><h2 className='btn btn-success w-100 my-3' >Add Client +</h2></Link>
    <div className='list-group d-flex justify-content-start flex-column gap-3 overflow-auto'>
      {loading ? pleaseWait : displayClients}
    </div>
    </main>
  )
}
export default Home
