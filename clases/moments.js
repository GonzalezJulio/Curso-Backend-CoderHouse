import moment from "moment"

const hoy = moment();

const FdN = moment("1988-01-18", "YYYY-MM-DD");
if(FdN.isValid()) {
    console.log("Es Valido")
    console.log(`${hoy.diff(FdN, 'days')} dias desde mi nacimiento`)
} else {
    console.log("No es Valido")
}