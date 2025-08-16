import { Children, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";



export const DataContext = createContext(null);

export const DataProvider = ({children}) =>{
    const[data,setData]=useState([]);

    const fetchAllProducts  = async () =>{
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        const updateData = res.data.map((item)=>({
            ...item,
            id:`fs-${item.id}`,
            source:"fekestore",
           
      }));
       setData(updateData);
      } catch (error) {
        console.error("error fetching data:",error)
        
      }
    };
    useEffect(()=>{
    fetchAllProducts();
    },[]);

    const getUniqueCategories = (data,property) =>{
       const newVal = ["All", ...new Set(data?.map((cur)=>cur[property]))];
        return newVal;
    };
  const categoryList = getUniqueCategories(data, "category");

    return(
  <DataContext.Provider
  value={{
    data,
    setData,
    fetchAllProducts,
    categoryList
  }}
>
   {children} 
  </DataContext.Provider>   
    );
};

export const  useData = () =>useContext(DataContext);