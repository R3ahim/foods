import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list ,moreExtra,sauceOrder} from "../../assets/assets";

export const StoreContext = createContext(null)
const StoreContextProvider = (props) =>{
    
    const [cartItems,setCartItems]= useState({});
    // const [extraItems,setExtraItems]= useState({});//first one
    // const [extraExItems,setExtraExItems] = useState([])//first one

    // const [extrasuce,setExtraSauce]= useState({});//second one
    // const [extraSauceItems,setExtraSauceItems] = useState([])//seocnd one
//  get all extra item

//    }
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    
   const [food_list,setFoodList] = useState([])

    const addToCart =async (itemId)=>{
        if (!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
        }
        if (token) {
             await axios.post(url + '/api/cart/add',{itemId},{headers:{token}})
        }

    }

    // first one
    // const extraBtn =async (itemId)=>{

    //     const items = sauceOrder.find(extra => extra?.id === itemId)

    //     if (!extraItems[itemId]){
    //         setExtraItems((prev)=>({...prev,[itemId]:1}))
    //         setExtraExItems(items)


    //     }
    //     else{
    //   if(extraItems[itemId]>0){
    //     setExtraItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
    //     setExtraExItems(items)

    //   }
    //     }
    //     // if (token) {
    //     //      await axios.post(url + '/api/cart/add',{itemId},{headers:{token}})
    //     // }

    // }
    // // this is first one
    // const removeFromExtra = async (itemId) =>{
    //     setExtraItems((prev)=>({...prev,[itemId]:prev[itemId] - 1}))
    // // if (token) {
    // //     await axios.post(url + '/api/cart/remove',{itemId},{headers:{token}})
    // // }

    // }
    // //second one
    // const addExtraSauce =async (itemId)=>{
    //     const items = moreExtra.find(extra => extra?.id === itemId)

    //     if (!extrasuce[itemId]){
    //         setExtraSauce((prev)=>({...prev,[itemId]:1}))
    //         setExtraSauceItems(items)

    //     }
    //     else{
    //         setExtraSauce((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
    //         setExtraSauceItems(items)

    //     }
    //     if (token) {
    //         //  await axios.post(url + '/api/cart/add',{itemId},{headers:{token}})
    //     }

    // }
    // //   seocnd one
    // const removeExtraSauce = async (itemId) =>{
    //    if(extrasuce[itemId]>0){
    //     setExtraSauce((prev)=>({...prev,[itemId]:prev[itemId] - 1}))
    //    }
    // if (token) {
    //     // await axios.post(url + '/api/cart/remove',{itemId},{headers:{token}})
    // }

    // }
    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId] - 1}))
    if (token) {
        await axios.post(url + '/api/cart/remove',{itemId},{headers:{token}})
    }

    }
   const  getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems)
    {
        if (cartItems[item] >0) {
            let itemInfo = food_list.find((product)=>product._id===item)
            totalAmount += itemInfo.price * cartItems[item];
        }
      
    }
    return totalAmount;
   }

   const fetchFoodList = async ()=>{
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data)
   }
    
   const loadCartData = async(token) =>{
       const response = await axios.post(url + "/api/cart/get",{},{headers:{token}});
       setCartItems(response.data.cartData)
    
   }


      useEffect(()=>{
  
         async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
         }
         loadData();
      },[])

    const contextValue= {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,token,setToken,
    
    

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
             
        </StoreContext.Provider>
    )
  
}
export default StoreContextProvider;

