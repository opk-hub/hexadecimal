import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get(`https://hexadecimal-backend-apis.onrender.com/v1/users`, {
                    params: {
                        searchText: searchText
                    }
                });

                setUsers(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchText]);

    return (
        <div className="container">
          <div className='input-container'>
          <h1 >User Posted Data</h1>

          <label>Search Based On Name:</label>
            <input
                type="text"
                placeholder="Search by name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            </div >
            {loading && <p className='loding'>Loading Data from server...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
           
            {users.length === 0 && !loading ? (
                    <p className='no-matching'>No matching results found.</p>
                ) : (
                <div className='table-container'>
                
                  <table style={{  width: '2500px' }} >
                      <thead >
                          <tr className='table-heading'>
                              <th>ID</th>
                              <th>Name</th>
                              {/* <th>Email</th> */}
                              <th>User Name</th>
                              <th>Posts</th>
                              <th>Adress</th>
                              <th>Phone</th>
                              <th>Company</th>

                          </tr>
                      </thead>
                      <tbody >
                          {users.map(user => (
                              <tr key={user.id} className='table-body'>
                                  <td >{user.id}</td>
                                  <td>{user.name}</td>
                                  {/* <td>{user.email}</td> */}
                                  <td>{user.username}</td>
                                  <td>
                                      <ul>
                                        <table>
                                        <thead>
                                        <tr>
                                          <th>Id</th>
                                          <th>Tittle</th>
                                          <th>body</th>

                                        </tr>
                                        </thead>

                                        <tbody>
                                          {user.posts.map(post => (
                                            <tr key={post.id}>
                                              <td>{post.id}</td>
                                              <td>{post.title}</td>
                                              <td>{post.body}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                        </table>
                                      </ul>
                                  </td>

                                  <td>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Street</th>
                                          <th>City</th>
                                          <th>Zip Code</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>{user.address.street}</td>
                                          <td>{user.address.city}</td>
                                          <td>{user.address.zipcode}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>    
                                  <td>{user.phone}</td>

                                  <td>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Street</th>
                                          <th>City</th>
                                          <th>Zip Code</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>{user.company.name}</td>
                                          <td>{user.company.catchPhrase}</td>
                                          <td>{user.company.bs}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td> 
        



                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
                )}
              </div>
          );
}

export default App;