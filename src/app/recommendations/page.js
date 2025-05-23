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
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) =>
          resolve(position.coords)
        );
      });
    };

    const fetchData = async () => {
      const { latitude, longitude } = await getUserLocation();
      setLocation({ latitude, longitude });
      await fetchRestaurants(latitude, longitude);
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
            <p>
              Category:{' '}
              {restaurant.categories
                ?.map((category) => category.title)
                .join(', ')}
            </p>
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
