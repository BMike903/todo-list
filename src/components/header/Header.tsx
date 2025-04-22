import { useEffect } from "react";

import { Toolbar, AppBar, Typography, Stack} from "@mui/material";
import {Divider} from "@mui/material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import ThemeSwitcher from "../themeSwitcher/themeSwitcher";
import { useUserActions } from "../../hooks/useActions";
import { AddTaskModal } from "../addTaskModal/addTaskModal";

function Header(){
    const {user, loading, error} = useTypedSelector(state => state.user);
    const {fetchUser} = useUserActions();

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
                
                <Stack direction="row" sx={{"alignItems": "center"}}>
                    <Typography variant="subtitle1">{userName}</Typography>
                    <AddTaskModal/>
                    <Divider flexItem orientation="vertical"/>
                    <ThemeSwitcher/>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header;