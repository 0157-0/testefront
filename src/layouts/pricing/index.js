import { BrowserRouter as Router, Link, useLocation, useSearchParams } from "react-router-dom";
import { React, useCallback, useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { Popconfirm, Table, notification } from "antd";
// import { columns } from "layouts/tables/data/columns";

import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { useProduct } from "hooks/useProduct";
import Masks from "utils/masks";
import MyCard from "./card";

const INITIAL_DATA = {
  dutv: "",
  df: "",
  dv: "",
  ml: "",  
  cp: "",
};

function Princing({}) {
  const [data, setData] = useState(INITIAL_DATA);
  const [dutv, setDd] = useState();
  const [df, setDf] = useState();
  const [dv, setDv] = useState();
  const [ml, setMl] = useState();
  const [cp, setCp] = useState();
  const [markup, setMarkup] = useState();
  const [result, setResult] = useState();
  const [total, setTotal] = useState();

  console.log(">>>>", data);


  useEffect(() => {
    if(data != null) {

      setDd(data.dutv);
      setDf(data.df);
      setDv(data.dv);
      setMl(data.ml);
      setCp(data.cp);
    }
    console.log("data vazio")
  }, [data]);

 
  // Função para calcular o resultado
  function calculateResult(dutv, df, dv, ml) {
    const dutvValue = parseFloat(dutv);
    const dfValue = parseFloat(df);
    const dvValue = parseFloat(dv);
    const mlValue = parseFloat(ml);
  
    if (isNaN(dutvValue) || isNaN(dfValue) || isNaN(dvValue) || isNaN(mlValue)) {
      return 0; // ou outro valor padrão de sua escolha
    }
  
    const result = 100 / (dutvValue - (dfValue + dvValue + mlValue));
    return result;
  }

  // Atualiza o resultado sempre que os valores mudarem
  useEffect(() => {
    const { dutv, df, dv, ml } = data;
    const calculatedResult = calculateResult(dutv, df, dv, ml);
    setMarkup(calculatedResult);
  }, [data]);

   
  function calculateTotal(cp, markup) {
    const cpValue = parseFloat(cp);
    const markupValue = parseFloat(markup);
  
    if (isNaN(cpValue) || isNaN(markupValue)) {
      return 0; // ou outro valor padrão de sua escolha
    }
  
    return cpValue * markupValue;
  }


   // Atualiza o total sempre que cp ou markup mudarem
   useEffect(() => {
    const calculatedTotal = calculateTotal(data.cp, markup);
    const roundedTotal = calculatedTotal.toFixed(2); // Arredonda para 2 casas decimais
    setTotal(roundedTotal);
  }, [data.cp, markup]);

console.log("total", total)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox justifyContent="center" alignItems="center" display="flex" mb={5}>
        <MDTypography variant="h5" component="h2">
          Calculadora de Preço de Venda
        </MDTypography>
      </MDBox>
      <MDBox mb={5}>

      <MyCard />
      </MDBox>
      <TextField
     
        label="Preço unitário total de venda"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        name="dutv"
        value={Masks.moneyP(data.dutv)}
        onChange={(e) => setData({ ...data, dutv: Masks.moneyP(e.target.value) })}
      />
      <TextField
        label="Despesas fixas"
        id="outlined-start-adornment"
        onChange={(e) => setData({ ...data, df: Masks.moneyP(e.target.value) })}
        value={Masks.moneyP(data.df)}
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
      />
      <TextField
        label="Despesas variáveis"
        onChange={(e) => setData({ ...data, dv: Masks.moneyP(e.target.value) })}
        value={Masks.moneyP(data.dv)}
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
      />
      <TextField
        label="Margem de lucro"
        onChange={(e) => setData({ ...data, ml: Masks.moneyP(e.target.value) })}
        value={Masks.moneyP(data.ml)}
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
      />
      <TextField
        label="Custo de produção"
        onChange={(e) => setData({ ...data, cp: Masks.moneyP(e.target.value) })}
        value={Masks.moneyP(data.cp)}
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />
      <TextField
        label="Resultado"
        disabled
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        value={total}
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />

      <Footer />
    </DashboardLayout>
  );
}

export default Princing;
