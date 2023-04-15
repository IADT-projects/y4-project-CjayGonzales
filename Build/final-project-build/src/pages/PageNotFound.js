import React from 'react';
import { Grid } from "@mui/material";

const PageNotFound = () => {
    return (
        <>
            <Grid md={12} container justifyContent="center">
                <p>User is either unauthorized, or page is unavailable. Please ensure you are logged in</p>

            </Grid>
        </>
    );
}

export default PageNotFound;