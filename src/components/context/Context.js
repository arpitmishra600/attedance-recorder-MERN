import React, { createContext, useEffect, useState } from "react";
import Cont from "./cont";
import dayjs from "dayjs";

export default function Context({ children }) {
  const [backdrop,setBackdrop]=useState(false)
  const [selectedDate,setSelectedDate]=useState(dayjs())
  const [user,setUser]=useState(localStorage.getItem("user"))
  return (
    <Cont.Provider
      value={{
        backdrop,
        setBackdrop,
        selectedDate,setSelectedDate,
        user,setUser
      }}
    >
      {children}
    </Cont.Provider>
  );
}
