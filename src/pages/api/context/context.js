import { createContext, useState } from "react";

export const MyContext = createContext();

const MyDataProvider = ({children}) => {
    const [data, setData] = useState ([]);
    const[checkOutCart , setCheckOutCart] = useState([]);
    // console.log(checkOutCart);

    const[userName, setUserName] = useState("");
  const [password, setPassword] = useState(""); 
return(
    <MyContext.Provider value={{ data, setData, checkOutCart, setCheckOutCart, userName, setUserName, password, setPassword}}>
        {children}
    </MyContext.Provider>
)
};

export default MyDataProvider;