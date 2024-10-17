import React, { useEffect, useState } from 'react'
import './User.css'
import axios from 'axios'
import { toast } from 'react-toastify' 
const Users = ({url}) => {
    
    const [list,setList] = useState([]);
    const fetchList = async () =>{
        const response = await axios.get(`${url}/api/user/users`)
     try {
        setList(response.data.data);
        res.json({success:true,message:'loaded data'});
     } catch (error) {
        console.log(error)
        res.json({success:false,message:"not laodded"})
        
     }

  
    }

   const removeFood = async(foodId) =>{
       const response = await axios.post(`${url}/api/user/remove`,{id:foodId})
       await fetchList();
       if(response.data.success){
   
        toast.success('Food Added')
       }
       else{
        toast.error(response.data.message)
   
        
       }
    }

    useEffect(()=>{
        fetchList();
       
    },[])




  return (
    <div className="list add flex-col">
        <p>All Users  List </p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>name</b>
                <b>email</b>
                <b>function</b>
                            </div>
            {list.map((item,index)=>{
                            return(
                                <div key={index} className='list-table-format'>
                                    <p>{item.name}</p>
                                    <p>{item.email}</p>
                                    <p  onClick={()=>removeFood(item._id)} className='cursor'>delite</p>
                                </div>
                            )
            })}
        </div>
    </div>
  )
}

export default Users