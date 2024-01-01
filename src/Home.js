import React, { useContext } from "react";
import { KindOfUser } from "./App";
import Client from "./Client/Client";
import Manager from "./Manager/Manager";


export default function Home(){
    const isAdmin=useContext(KindOfUser).isAdmin;
    return(
        <>
        {isAdmin?<Manager/>:<Client/>}
        </>
    );
}