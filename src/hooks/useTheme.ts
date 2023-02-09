import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';

const useTheme = () => {
    return useContext(ThemeContext);
};

export default useTheme;