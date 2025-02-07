import { Toolbar, AppBar, Typography} from "@mui/material";

function Header(){
    return(
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Todo list
                </Typography>
                <Typography>Username will be here</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;