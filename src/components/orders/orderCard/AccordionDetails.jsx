import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/system';

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));