import * as React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';

const StyledButton = styled(Button)`
  
  &:hover {
    border: 2px solid ${props => props.theme.bg.dark};
    color: ${props => props.theme.text.dark};
  }
`
type buttonProps = {
    title: string,
    handleAction: (e:any) => void 
}
export default function BasicButtons({title, handleAction}: buttonProps) {
    return (
        <StyledButton variant="outlined" color="inherit" onClick={handleAction}>{title}</StyledButton>
    );
}
