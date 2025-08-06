"use client";
import { useEffect } from "react";
import Banner from '@/components/Banner/Banner';
import Benefits from '@/components/Benefits/Benefits';
import CommonHeader from '@/components/CommonHeader/CommonHeader';
import Footer from '@/components/Footer/Footer';
import { getAllHotelProperties } from '@/lib/api/getallproperties';

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllHotelProperties();
        console.log("Fetched Hotel Properties:", data);
      } catch (err) {
         console.error("Failed to fetch hotel properties:", err);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <CommonHeader/>
       <main>
         <Banner />
          <Benefits />
      </main>
      <Footer/>
    </>
  );
}


