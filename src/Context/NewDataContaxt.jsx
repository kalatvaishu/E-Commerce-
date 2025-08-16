import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";



export const NewDataContaxt = createContext(null);

export const NewDataProvider = ({children}) =>{
    const[data,setData]=useState([]);

    const fetchAllProducts  = async () =>{
      try {
        const res = await axios.get('https://dummyjson.com/products');
        const updateProducts = res.data.products.map((products) =>({
            ...products,
            id:`ps-${products.id}`,
          
           
      }));
       setData(updateProducts);
      } catch (error) {
        console.error("error fetching data:",error)
        
      }
    };
    useEffect(()=>{
    fetchAllProducts();
    },[]);

    const getUniqueCategories = (items,key) =>{
      if (!items) return[];
      const values = items.map((item)=>item[key]);
      return ["All", ...new Set (values)];
    };
  const categoryList = getUniqueCategories(data, "category");

    return(
  <NewDataContaxt.Provider
  value={{
    data,
    setData,
    fetchAllProducts,
    categoryList
  }}
>
   {children} 
  </NewDataContaxt.Provider>   
    );
};

export const  useNewData = () =>useContext(NewDataContaxt);