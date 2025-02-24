import { useState } from "react";

import { MenuItem, Menu, IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';

function ThemeSwitcher() {
    const { mode, setMode } = useColorScheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (selectedMode: 'system' | 'light' | 'dark' | null) => {
        if(selectedMode !== null){
            setMode(selectedMode as 'system' | 'light' | 'dark');
        }
        setAnchorEl(null);
    };

    if (!mode) {
        return null;
    }

    return(
        <>
            <IconButton onClick={handleClick} onMouseOver={handleClick}><DarkModeIcon/></IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() =>handleClose(null)} MenuListProps={{onMouseLeave: () => handleClose(null)}}>
                <MenuItem onClick={() => handleClose("system")}>System</MenuItem>
                <MenuItem onClick={() => handleClose("light")}>Light</MenuItem>
                <MenuItem onClick={() => handleClose("dark")}>Dark</MenuItem>
            </Menu>
        </>
    );
}

export default ThemeSwitcher;