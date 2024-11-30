import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from 'react-toastify';


export const AuthContext = createContext()




export default function AuthContextProvider({children}){
    
    const BACKEND_URL = 'https://lms-backend-ydwv.onrender.com/api/v1'
    // const BACKEND_URL = 'http://127.0.0.1:5000/api/v1'

    const [ authUser , setAuthUser ] = React.useState(()=> JSON.parse(localStorage.getItem('user'))|| null);
    const [ authToken , setAuthToken ] = React.useState(()=> JSON.parse(localStorage.getItem('tokens'))|| null);

    const [ isLoading , setIsLoading ] = useState(null)

    
    function displayNotification(type: string, text: any ){
        if(type==='info'){
            toast.info(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if(type==='success'){
            toast.success(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        else if(type==='error'){
            toast.error(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }else{
            toast(`${text}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    // Fetch the updated user profile from the backend
    const fetchUserProfile = async () => {
        if (!authToken) return;

        setIsLoading(true);
        try {
        const response = await fetch(`${BACKEND_URL}/account/`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setAuthUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
        } else {
            // Handle error
            // displayNotification('error', 'Failed to fetch user profile.');
        }
        } catch (error) {
        console.error('Error fetching user profile:', error);
        // displayNotification('error', 'An error occurred while fetching the profile.');
        } finally {
        setIsLoading(false);
        }
    };

    // Run the fetchUserProfile function when the component mounts
    useEffect(() => {
        if (authToken && !authUser) {
        fetchUserProfile();  // Fetch updated user profile if user exists but no profile is set
        }
    }, [authToken, authUser]);  // Depend on authToken and authUser


    const deleteUserFromLocalStorage = () => {
      localStorage.removeItem('user');    
      localStorage.removeItem('tokens');    
      window.location.href = '/auth/signin';
    };

    async function fetchWithAuth({ method = 'GET', path, queryParams = {}, body = null , isformData = false}) {
        const accessToken = authToken?.access
        const refreshToken = authToken?.refresh
        const REFRESH_TOKEN_URL = `${BACKEND_URL}/auth/token/refresh/`;
      
        // Build the full URL with query parameters if provided
        let url = `${BACKEND_URL}${path}`;
        if (Object.keys(queryParams).length > 0) {
          const query = new URLSearchParams(queryParams).toString();
          url = `${url}?${query}`;
        }
      
        const headers = {
          'Content-Type': 'application/json',
        };
      
        // Include the access token in the Authorization header if available
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // Make the initial API request
        let response;
        if(isformData){
          response = await fetch(url, { method, headers, body: body });
        }else{
          response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
        }
        
      
        // Check if the response is a 401 (Unauthorized) error (token might be expired)
        if (response.status === 401 && refreshToken) {
          try {
            // Attempt to refresh the token using the refresh token
            const refreshResponse = await fetch(REFRESH_TOKEN_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });
      
            if (!refreshResponse.ok) {
              throw new Error('Unable to refresh token');
            }
      
            // Parse the new tokens from the response
            const refreshData = await refreshResponse.json();
            // Store the new tokens in localStorage
            localStorage.setItem('tokens', JSON.stringify(refreshData));
            setAuthToken(refreshData)
            // Retry the original request with the new access token
            headers['Authorization'] = `Bearer ${refreshData?.access}`;
            response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
 
            if (!response.ok) {
              if(response.status === 400){
                const errorData = await response.json();
                displayNotification('error',errorData?.message)
                throw new Error(errorData?.message)
              }
              if(response.status === 401){
                deleteUserFromLocalStorage()
              }
              throw new Error(`Error fetching data from ${path}: ${response.statusText}`);
            }

            return response.json();
          } catch (error) {
            console.error('Token refresh failed:', error);
            deleteUserFromLocalStorage()
            throw new Error('Authentication error. Please log in again.');
            
          }
        }
      
        // If the response is not successful, throw an error
        if (!response.ok) {
          // add 400 error handling
          if(response.status === 400){
            const errorData = await response.json();
            displayNotification('error',errorData?.message)
            throw new Error(errorData?.message)
          }
          throw new Error(`Error fetching data from ${path}: ${response.statusText}`);
        }
      
        // Return the response JSON data
        return response.json();
      }


      const formatDate = (created_at) => {
        const formattedDate = new Date(created_at).toLocaleString('en-US', {
          // weekday: 'long',  // "Monday"
          year: 'numeric',  // "2024"
          month: 'long',  // "November"
          day: 'numeric',  // "24"
          // hour: '2-digit', // "06"
          // minute: '2-digit', // "43"
          // second: '2-digit', // "19"
          // hour12: true // 12-hour clock (AM/PM)
        });
      
        return formattedDate
      }

    const value = {  displayNotification, authUser , setAuthUser, BACKEND_URL,authToken,setAuthToken,fetchWithAuth,formatDate,deleteUserFromLocalStorage}
     
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}