
import React, { useState, useEffect, useCallback } from 'react';
import SupplierCard from './components/SupplierCard';
import Pagination from './components/Pagination';
import Filter from './components/Filter';

import './App.css';

const BASE_URL = "https://staging.iamdave.ai";

const HEADERS = {
  "Content-Type": "application/json",
  "X-I2CE-ENTERPRISE-ID": "dave_vs_covid",
  "X-I2CE-USER-ID": "ananth+covid@i2ce.in",
  "X-I2CE-API-KEY": "0349234-38472-1209-2837-3432434"
};

const App = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [channelOptions, setChannelOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const fetchSuppliers = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/list/supply?_page_number=${currentPage}`, {
        headers: HEADERS
      });
      const data = await response.json();
      setSuppliers(data.suppliers);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchSuppliers();
    fetchFilterOptions();
  }, [fetchSuppliers]);

  const fetchFilterOptions = async () => {
    try {
      const categoryResponse = await fetch(`${BASE_URL}/unique/supply/category`, {
        headers: HEADERS
      });
      const categoryData = await categoryResponse.json();
      if (Array.isArray(categoryData)) {
        setCategoryOptions(categoryData);
      } else {
        console.error("Category data is not an array:", categoryData);
      }

      const channelResponse = await fetch(`${BASE_URL}/unique/supply/channel`, {
        headers: HEADERS
      });
      const channelData = await channelResponse.json();
      if (Array.isArray(channelData)) {
        setChannelOptions(channelData);
      } else {
        console.error("Channel data is not an array:", channelData);
      }

      const stateResponse = await fetch(`${BASE_URL}/unique/supply/state`, {
        headers: HEADERS
      });
      const stateData = await stateResponse.json();
      if (Array.isArray(stateData)) {
        setStateOptions(stateData);
      } else {
        console.error("State data is not an array:", stateData);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleFilterChange = (event, filterType) => {
    const value = event.target.value;
    if (filterType === 'category') {
      setCategoryFilter(value);
    } else if (filterType === 'channel') {
      setChannelFilter(value);
    } else if (filterType === 'state') {
      setStateFilter(value);
    }
    setCurrentPage(1);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }

  return (
    <div className="app">
      <div className="filters">
        <Filter
          options={categoryOptions}
          selectedValue={categoryFilter}
          onFilterChange={(e) => handleFilterChange(e, 'category')}
        />
        <Filter
          options={channelOptions}
          selectedValue={channelFilter}
          onFilterChange={(e) => handleFilterChange(e, 'channel')}
        />
        <Filter
          options={stateOptions}
          selectedValue={stateFilter}
          onFilterChange={(e) => handleFilterChange(e, 'state')}
        />
        <button onClick={() => setCurrentPage(1)}>Apply Filters</button>
        <button onClick={() => {
          setCategoryFilter('');
          setChannelFilter('');
          setStateFilter('');
          setCurrentPage(1);
        }}>Clear Filters</button>
      </div>
      <div className="supplier-list">
        {suppliers.map(supplier => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  );
}

export default App;
