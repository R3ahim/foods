import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({catergory,setCatergory}) => {
  return (
    <div className="explore-menu" id='explore-menu'>
     <h1>Explore our Menu</h1>
     <p className="explore-menu-text">chose from a delskjf sakdlfjsalkd Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus?</p>
     <div className="explore-menu-list">
        {
            menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCatergory(prev=>prev===item.menu_name?"All":item.menu_name)}  key={index} className="explore-menu-list-item">
                       <img className={catergory===item.menu_name ?"active":''} src={item.menu_image} alt="" />
                       <p>{item.menu_name}</p>
                    </div>
                )
            })
        }
     </div>
     <hr />
    </div>
  )
}

export default ExploreMenu
