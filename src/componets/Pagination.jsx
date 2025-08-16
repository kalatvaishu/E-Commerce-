import React from 'react';

const getPages = (current, total) => {
  const pages = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, '...', total);
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }
  return pages;
};

const Pagination = ({ page, pageHandler, dynamicPage }) => {
  return (
    <div className="flex items-center space-x-2 mt-10">
      <button
        disabled={page === 1}
        className={`${
          page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400'
        } text-white rounded-md px-3 py-1`}
        onClick={() => pageHandler(page - 1)}
      >
        Prev
      </button>

      {getPages(page, dynamicPage).map((item, index) => (
        <span
          key={index}
          onClick={() => typeof item === 'number' && pageHandler(item)}
          className={`cursor-pointer px-2 ${
            item === page ? 'font-bold text-yellow-600' : 'text-white'
          }`}
        >
          {item}
        </span>
      ))}

      <button
        disabled={page === dynamicPage}
        className={`${
          page === dynamicPage ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-400'
        } text-white rounded-md px-3 py-1`}
        onClick={() => pageHandler(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
