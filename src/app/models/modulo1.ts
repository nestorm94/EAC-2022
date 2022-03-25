
import { CaratulaUnica } from "src/app/models/caratulaUnica";
import { InformacionFuncionamiento } from "src/app/models/InformacionFuncionamiento";
import { Direccion } from "src/app/models/Direccion";
import { CapitalSocial } from "src/app/models/CapitalSocial";
import { IngresosNoOperacioneales } from "src/app/models/IngresosNoOperacioneales";


export interface Modulo1{
    
    IcaratulaUnica:CaratulaUnica,
    IInformacionFuncionamiento:InformacionFuncionamiento,
    IDireccion:Direccion,
    ICapitalSocialE:CapitalSocial,
    IIngresosNoOperacioneales:IngresosNoOperacioneales,
    IDireccionNotificacion:Direccion,
    IcapitalSocialN:CapitalSocial,
}