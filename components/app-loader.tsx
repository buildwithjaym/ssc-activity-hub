"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading,setLoading] = useState(true);


  useEffect(()=>{

    const timer = setTimeout(()=>{

      setLoading(false);

    },3000);


    return ()=>clearTimeout(timer);

  },[]);



  return loading ? <Loading /> : children;

}