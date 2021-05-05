import { useState, useEffect, createContext } from 'react';
import axios from '../utils/axios'

export const UserContext = createContext(null);

// TODO 使用React Context共享全局用户信息变量

const UserContextProvider = (props: any) => {
    const [user, setUser] = useState({
        username: "游客",
        email: "yungeeker@gmail.com"
    });
    useEffect(()=>{
        axios.get('/userInfo').then((res)=>{
            console.log(res);
            setUser(res.data)
        })
    }, [])
    return (
        //@ts-expect-error
        <UserContext.Provider value={{
            userData: user,
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
