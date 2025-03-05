// 'use client';

// import { useState, useEffect } from 'react';

// export default function NearbyRestaurants() {
//   const [location, setLocation] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchRestaurants = async (latitude, longitude) => {
//       const res = await fetch(
//         `/api/yelp?latitude=${latitude}&longitude=${longitude}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setRestaurants(data.businesses || []);
//       }
//     };

//     const getUserLocation = () => {
//       return new Promise((resolve) => {
//         navigator.geolocation.getCurrentPosition((position) =>
//           resolve(position.coords)
//         );
//       });
//     };

//     const fetchData = async () => {
//       const { latitude, longitude } = await getUserLocation();
//       setLocation({ latitude, longitude });
//       await fetchRestaurants(latitude, longitude);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Nearby Restaurants</h2>
//       {location ? (
//         <p>
//           Showing results near {location.latitude}, {location.longitude}
//         </p>
//       ) : (
//         <p>Fetching location...</p>
//       )}
//       <ul>
//         {restaurants.map((restaurant) => (
//           <li
//             key={restaurant.id}
//             className='m-5 p-6 w-56 border border-red-100'
//           >
//             <p>{restaurant.name}</p>
//             <p>Rating: {restaurant.rating}</p>
//             <p>Address: {restaurant.location?.address1}</p>
//             <p>
//               Category:{' '}
//               {restaurant.categories
//                 ?.map((category) => category.title)
//                 .join(', ')}
//             </p>
//             {restaurant.image_url && restaurant.image_url !== '' ? (
//               <img
//                 src={restaurant.image_url}
//                 alt={restaurant.name}
//                 className='w-[300px]'
//               />
//             ) : (
//               <p>No image available</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NearbyRestaurants() {
  const mapsKey = process.env.MAPS_API_KEY;
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
      <div className='flex flex-col items-center gap-4 w-full bg-white m-6'>
        <Link
          href='/NearMeMap'
          className='bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105'
        >
          See the map
        </Link>
        <h2 className='items-center text-center capitalize text-black text-[40px] font-bold'>
          Nearby Restaurants
        </h2>
        {location ? (
          <p className='text-xl'>
            <strong>Your Location is </strong>: {location.latitude},{' '}
            {location.longitude}
          </p>
        ) : (
          <p>Fetching location...</p>
        )}
        <Link
          href={'/NearMeYelp'}
          className=' p-2 rounded-md bg-gray-600 text-white text-center font-bold hover:bg-gray-700 transition'
        >
          ← Back
        </Link>
      </div>

      <div className='bg-white flex flex-row overflow-scroll'>
        {restaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <div className='w-[250px] h-[250px]'>
              {restaurant.image_url && restaurant.image_url !== '' ? (
                <img
                  className='h-full w-full object-cover'
                  src={restaurant.image_url}
                  alt={restaurant.name}
                  width={250}
                  height={250}
                  unoptimized='true'
                />
              ) : (
                <img
                  className='h-full w-full object-cover'
                  src={
                    'https://as1.ftcdn.net/v2/jpg/04/62/93/66/1000_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg'
                  }
                  alt={'no image'}
                  width={250}
                  height={250}
                  unoptimized='true'
                />
              )}
            </div>
            <p className='text-black font-bold'>{restaurant.name}</p>
            <p className='text-black font-bold'>Rating: {restaurant.rating}</p>
            <p className='text-black font-bold'>
              Address: {restaurant.location?.address1}
            </p>
            <p className='text-black font-bold'>
              Category:{' '}
              {restaurant.categories
                ?.map((category) => category.title)
                .join(', ')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
