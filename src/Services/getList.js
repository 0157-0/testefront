export function getList() {
    return fetch('https://web-production-5193.up.railway.app/usuarios')
      .then(data => data.json())
  }

  export function  getServiceList() {
    return fetch('http://localhost:3001/services')
      .then(data => data.json())
  }
  export function getFinancesList() {
    return fetch('http://localhost:3001/finances')
      .then(data => data.json())
  }
