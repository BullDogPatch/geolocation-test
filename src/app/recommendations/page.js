'use client';

import { useState, useEffect } from 'react';

export default function NearbyRestaurants() {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async (latitude, longitude) => {
      const res = await fetch(
        `/api/yelp?latitude=${latitude}&longitude=${longitude}`
      );
      const data = await res.json();

      if (res.ok) {
        setRestaurants(data.businesses || []);
      }
    };

    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation not supported'));
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(new Error('Geolocation error: ' + error.message))
          );
        }
      });
    };

    const fetchData = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        setLocation({ latitude, longitude });
        await fetchRestaurants(latitude, longitude);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Nearby Restaurants</h2>
      {location ? (
        <p>
          Showing results near {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
      <ul>
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className='m-5 p-6 w-56 border border-red-100'
          >
            <p>{restaurant.name}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Address: {restaurant.location?.address1}</p>
            {restaurant.image_url && restaurant.image_url !== '' ? (
              <img
                src={restaurant.image_url}
                alt={restaurant.name}
                className='w-[300px]'
              />
            ) : (
              <p>No image available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
