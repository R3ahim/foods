import React, { useEffect, useState ,useRef} from "react";
import { io } from "socket.io-client";
import audio from '../../assets/ringtone.mp3'

// Establish a socket connection
const socket = io("http://localhost:4000");

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]); // State to hold new orders

  useEffect(() => {
    // Listen for the 'newOrder' event from the server
    socket.on("newOrder", (newOrder) => {
        audioRef.current.play();

      alert(`New order received from user ${newOrder.userId}. Order ID: ${newOrder._id}`);
      
      // Add the new order to the orders state
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("newOrder");
    };
  }, []);

  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  const pauseAudio = () => {
    audioRef.current.pause();
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset to the beginning
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>New Orders</h2>
      {orders.length === 0 ? (
        <p>No new orders.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id}>
              <span>User: {order.userId}</span> - <span>Order ID: {order._id}</span>
            </li>
          ))}
        </ul>
      )}
            <audio ref={audioRef} src={audio} />
            <div>
        <button onClick={playAudio}>Play</button>
        <button onClick={pauseAudio}>Pause</button>
        <button onClick={stopAudio}>Stop</button>
      </div>
      {/* Add other admin dashboard content here */}
    </div>
  );
};

export default AdminDashboard;
