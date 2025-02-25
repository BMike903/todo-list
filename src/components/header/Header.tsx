import { useEffect } from "react";

import { Toolbar, AppBar, Typography, Stack} from "@mui/material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import ThemeSwitcher from "../themeSwitcher/themeSwitcher";
import { useActions } from "../../hooks/useActions";

function Header(){
    const {user, loading, error} = useTypedSelector(state => state.user);
    const {fetchUser} = useActions();

    useEffect(()=>{
        fetchUser(4);
    }, [])

    let userName;

    if(loading){
        userName = "User info is loading";
    }else if(error){
        userName = error;
    }else{
        userName = user?.name;
    }

    return(
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todo list
                </Typography>
                <Stack direction="row">
                    <Typography>{userName}</Typography>
                    <ThemeSwitcher/>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header;