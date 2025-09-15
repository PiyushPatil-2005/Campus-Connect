import { createContext } from "react";
import { mentors } from '../assets/assets';


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'


    const value = {
        mentors,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;