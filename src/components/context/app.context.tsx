import { userSearchAPI } from "services/admin/users.api";
import { createContext, useContext, useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";


interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUserInfo: (v: IUserInfo | null) => void;
    userInfo: IUserInfo | null;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;

    carts: ICart[];
    setCarts: (v: ICart[]) => void;
}

const CurrentAppContext = createContext<IAppContext | null>(null);

type TProps = {
    children: React.ReactNode
}

export const AppProvider = (props: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
    const [carts, setCarts] = useState<ICart[]>([])

    useEffect(() => {
        const fetchAccount = async () => {
        
            const res = await userSearchAPI(localStorage.getItem("username"));
          
            const carts = localStorage.getItem("carts");
            if (res.data) {
             
                setUserInfo(res.data);
  // console.log("toi day roi ne", JSON.stringify(res.data))
                setIsAuthenticated(true);
                if (carts) {
                    setCarts(JSON.parse(carts))
                }
            }
            setIsAppLoading(false)
        }

        fetchAccount();
    }, [])

    return (
        <>
            {isAppLoading === false ?
                <CurrentAppContext.Provider value={{
                    isAuthenticated,userInfo, setIsAuthenticated, setUserInfo: setUserInfo,
                    isAppLoading, setIsAppLoading,
                    carts, setCarts
                }}>
                    {props.children}
                </CurrentAppContext.Provider>
                :
                <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }}>
                     <FadeLoader
                        height={15}
                        color="#36d6b4"
                    /> 
                </div>
            }

        </>

    );
};


export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);

    if (!currentAppContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAppContext.Provider>"
        );
    }

    return currentAppContext;
};
