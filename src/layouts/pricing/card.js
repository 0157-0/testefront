import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
      {bull}Para calcular o preço de venda é simples: insira o preço de custo e o valor das despesas operacionais do seu produto, determine a margem de lucro que deseja obter nas vendas e pronto! Sua empresa será financeiramente saudável e rentável no longo prazo.      
      </Typography>
    </CardContent>   
  </React.Fragment>
);

export default function MyCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}