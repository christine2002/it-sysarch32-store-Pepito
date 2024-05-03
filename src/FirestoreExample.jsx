import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import MyNavbar from './MyNavbar';
import Carousel from 'react-bootstrap/Carousel';
import { RiStarFill } from 'react-icons/ri'; 
import { FaShoppingBag } from 'react-icons/fa';
import Footer from './Footer';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAomq5WM8sHhYIv_e99N8wCENSmUKstIh4",
  authDomain: "it-sysarch32-store-janoh-4bed0.firebaseapp.com",
  projectId: "it-sysarch32-store-janoh-4bed0",
  storageBucket: "it-sysarch32-store-janoh-4bed0.appspot.com",
  messagingSenderId: "202819665263",
  appId: "1:202819665263:web:1444a05486960d24b1fc9a",
  measurementId: "G-5KYZ5RS9S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const FirestoreExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const newData = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }; // Include document ID along with data
        });
        setData(newData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [db]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to handle button click
  const handleButtonClick = (productId) => {
    const product = data.find(item => item.id === productId);
    if (product) {
      navigate(`/product-detail/${productId}`, { state: { products: data } });
    } else {
      console.error(`Product with ID '${productId}' not found`);
    }
  };
  
  
  
  


  return (
    <div> 
      <MyNavbar/>
     
      <div className="text-center py-4" style={{ backgroundColor: '#343a40' }}> {/* Padding and background color */}
  <div className="d-flex align-items-center justify-content-center">
    <RiStarFill style={{ fontSize: '48px', marginRight: '10px', color: '#FFD700' }} /> {/* Larger star icon */}
    <h2 className="mb-0" style={{ fontSize: '36px', color: '#FFD700' }}>Featured Product</h2> {/* Larger header font */}
  </div>
  <p className="text-white mt-3 mb-0">Explore our top picks for the season. Find the perfect products that stand out!</p> {/* White supporting text */}
</div>

      <Carousel indicators={false} controls={true} interval={1000}>
  {data.slice(0, 4).map((item, index) => (
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={item.imageURL}
        alt={item.name}
        style={{ 
          maxHeight: '500px',
          objectFit: 'contain',
          zIndex: '1',
          position: 'relative', // Position relative for overlay positioning
        }}
      />
      <div 
        className="carousel-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#343a40', // Adjust opacity as needed
        }}
      >
      


      <Carousel.Caption 
  style={{ 
    zIndex: 3, // Ensure the caption is above the overlay
    position: 'absolute',
    bottom: 0, // Position the caption at the bottom
    left: 0,
    width: '100%',
    textAlign: 'center', // Align the text to the center
  }}
>
  {/* Overlay */}
  <div
    className="caption-overlay"
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%', // Set width to 100% to match the width of the image
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    }}
  ></div>
  {/* Content */}
  <div style={{ position: 'relative', zIndex: 4 }}>
    <h3 style={{ color: 'white' }}>{item.name}</h3>
    <p style={{ color: 'white' }}>{item.description}</p>
    {/* Add more details here if needed */}
  </div>
</Carousel.Caption>



      </div>
    </Carousel.Item>
  ))}
</Carousel>

      {/* Card section */}




      <div className="text-center py-4" style={{ backgroundColor: '#343a40' }}> {/* Padding and background color */}
  <div className="d-flex align-items-center justify-content-center">
    <FaShoppingBag style={{ fontSize: '48px', marginRight: '10px', color: '#FFD700' }} /> {/* Larger star icon */}
    <h2 className="mb-0" style={{ fontSize: '36px', color: '#FFD700' }}>Products</h2> {/* Larger header font */}
  </div>
  <p className="text-white mt-3 mb-0">Browse through our wide range of products and find the perfect items for you!</p> {/* White supporting text */}
</div>


      <div className="d-flex flex-wrap justify-content-center" style={{ flexDirection: 'row' }}>
        {/* Render other products as cards */}
        {data.map((item, index) => (
          <Card key={index} className="m-3" style={{ width: '18rem',color: 'white' }}>
            <Card.Img variant="top" src={item.imageURL} style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div>
    <Card.Title style={{ color: 'white' }}>{item.name}</Card.Title>
    <Card.Text style={{ color: 'white' }}>Price: ${item.price}</Card.Text>
  </div>
  <Button variant="primary" style={{ color: 'black', backgroundColor: '#FFD700', alignSelf: 'flex-end' }} onClick={() => handleButtonClick(item.id)}>View Details</Button>

</Card.Body>

          </Card>
        ))}
      </div>

      <Footer/>
    </div>
  );
};

export default FirestoreExample;