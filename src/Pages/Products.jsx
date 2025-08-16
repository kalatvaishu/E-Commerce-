import React, { useEffect, useState } from 'react';
import Filtersection from '../componets/Filtersection';
import ProductCard from '../componets/ProductCard';
import Pagination from '../componets/Pagination';
import { useData } from '../Context/DataContaxt';
import Lottie from 'lottie-react';
import notfound from "../assets/notfound.json"
import Loading from "../assets/Loading4.webm"


function Products() {
  const { data, fetchAllProducts } = useData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const fakestoreData = data?.filter((item )=> item.source === "fekestore");

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleCategoryChange =(e)=> {
    setCategory(e.target.value);
    setPage(1);
  };

  const pageHandler = (selected )=> {
    setPage(selected);
    window.scrollTo(0, 0);
  };
const filteredData = fakestoreData?.filter(
  (item)=>
    item.title.toLowerCase().includes(search.toLowerCase())&&
  (category === "All" || item.category===category)&&
  item.price >=priceRange[0]&&
  item.price <=priceRange[1]
 );


  const totalPages = Math.ceil(filteredData.length / 8);

  return (
    <div>
    <div className='max-w-6xl mx-auto px-4 mb-10'>
    
       {data?.length> 0 ? (
       
       <div className='flex gap-8'>
          <Filtersection
            search={search}
            setSearch={setSearch}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
          />
           {/* product grid & Pagination */}
          {filteredData?.length > 0 ? (
            <div className='flex flex-col justify-center items-center flex-grow'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10 w-full'>
              {
          filteredData
        .slice((page - 1) * 8, page * 8)
         .map((product, index) => (
         <ProductCard
          key={product.id || index} 
          product={product} />
         ))}
 </div>
         <Pagination
                page={page}
                pageHandler={pageHandler}
                dynamicPage={totalPages}
              />
            </div>
          ):(
            <div className='flex flex-col justify-center items-center flex-grow'>
           <Lottie
           animationData={notfound}
           className='[w-500px]'
           />
          </div>
          )}
        </div>
       ):(
         <div className='flex items-center justify-center h-[400px]'>
          <video muted autoPlay loop>
          <source src={Loading}  type="video/webm"/>
         </video>
        </div>
       )}
    </div>
</div>
  );
}

export default Products;
