
import { CaratulaUnica } from "src/app/models/caratulaUnica";
import { InformacionFuncionamiento } from "src/app/models/InformacionFuncionamiento";
import { Direccion } from "src/app/models/Direccion";
import { CapitalSocial } from "src/app/models/CapitalSocial";
import { IngresosNoOperacioneales } from "src/app/models/IngresosNoOperacioneales";
import { VariableEmpresa } from "src/app/models/VariableEmpresa";

import { TipoVariableEmpresa } from "src/app/models/TipoVariableEmpresa";

export interface Modulo1{
    
    IcaratulaUnica:CaratulaUnica,
    IInformacionFuncionamiento:InformacionFuncionamiento,
    IDireccion:Direccion,
    ICapitalSocialE:CapitalSocial,
    IIngresosNoOperacioneales:IngresosNoOperacioneales[],
    IDireccionNotificacion:Direccion,
    IcapitalSocialN:CapitalSocial,
    IVariableEmpresa:TipoVariableEmpresa[],
}