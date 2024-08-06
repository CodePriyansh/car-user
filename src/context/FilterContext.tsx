"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeFilter') || 'car';
    }
    return 'car';
  });

  useEffect(() => {
    localStorage.setItem('activeFilter', activeFilter);
  }, [activeFilter]);

  return (
    <FilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
