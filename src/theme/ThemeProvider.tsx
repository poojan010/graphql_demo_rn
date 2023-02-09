import React, { useState } from 'react';
import colors from './Colors';


export const ThemeContext = React.createContext({
    colors: colors.light,
    toggleTheme: () => { },
    isLightTheme: true
});

const ThemeProvider = ({ children }: any) => {
    const [isLightTheme, setLightTheme] = useState(true);
    const toggleTheme = () => setLightTheme(previousState => !previousState);


    const theme = {
        colors: isLightTheme ? colors.light : colors.dark,
        toggleTheme,
        isLightTheme
    }

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeProvider;