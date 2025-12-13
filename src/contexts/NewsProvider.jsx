
import React, { useState, useEffect } from 'react';

import {NewsContext} from '../contexts/NewsContext'
import { toast } from 'sonner';

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [singleNews, setSingleNews] = useState(null);
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleNewsLoading, setSingleNewsLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");  

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);


      // Example: Replace with your own API endpoint or key
      const response = await fetch(
        `${baseUrl}/news`
      );

      if (!response.ok) throw new Error('Failed to fetch news');

      const data = await response.json();
      setNews(data.news || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (newArticle) => {
    try {
      setCreating(true);
      setError(null);

      const response = await fetch(`${baseUrl}/news`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: newArticle,
      });

      if (!response.ok) throw new Error('Failed to create news');

      const created = await response.json();
      
      if(created.status === "success"){
        toast.success(created.message);
      }
      // Update state immediately (optimistic UI)
      setNews((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message); 
    }finally{
      setCreating(false);
    }
  };

  const deleteNews = async (id) => {
    try {
      setError(null);

      const response = await fetch(`${baseUrl}/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete news');

      const data = await response.json();
      if(data.status === "success"){
        toast.success(data.message);
      }

      // Optimistically remove from state
      setNews((prev) => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const getNewsById = async (id) => {
    try {
      setSingleNewsLoading(true);
      const res = await fetch(`${baseUrl}/news/${id}`);
      const data = await res.json();

      if (data.status === 'success') {
        setSingleNews(data.news);
      }
    } catch (error) {
      console.error('Error fetching single news:', error);
    }finally{
      setSingleNewsLoading(false)
    }
  };

  //Facebook Link

  const createFacebookLink = async (data) => {
    try {
      setError(null);

      const response = await fetch(`${baseUrl}/facebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create facebook Link');

      const created = await response.json();

      if (created.status === "success") {
        toast.success(created.message);
        // Immediately add new link to state
        setFacebookPosts((prev) => [created.facebook, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    }
  };


  const fetchFacebookLink = async () => {
    try {
      setError(null);


      // Example: Replace with your own API endpoint or key
      const response = await fetch(
        `${baseUrl}/facebook`
      );

      if (!response.ok) throw new Error('Failed to fetch news');

      const data = await response.json();
      setFacebookPosts(data.facebook || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteFacebookLink = async (id) => {
    try {
      setError(null);

      const response = await fetch(`${baseUrl}/facebook/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete news');

      const data = await response.json();
      if(data.status === "success"){
        toast.success(data.message);
      }

      // Optimistically remove from state
      setNews((prev) => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  


  // Fetch news on mount
  useEffect(() => {
    fetchNews();
    fetchFacebookLink();
  }, []);


  const value = {
    news, 
    loading, 
    creating, 
    error, 
    fetchNews, 
    createNews,
    deleteNews,
    getNewsById,
    singleNews,
    singleNewsLoading,
    createFacebookLink,
    fetchFacebookLink,
    deleteFacebookLink,
    facebookPosts
  }
  // Optional: also expose fetchNews so you can manually refresh
  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};
