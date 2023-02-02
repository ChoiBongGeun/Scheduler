import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Loading(): JSX.Element {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    )
}

export default Loading;
