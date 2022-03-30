//===============================================
// CapitalSocial de la ecuesta EAC
//===============================================

import { CIIU } from "src/app/models/CIIU";

// CaratulaUnica
export interface TipoVariableEmpresa{
	id?: number,
	orden?: number,
    codigo?: number,
    nombre?: string

    listCIIU?: any[],
	numeroEstablecimientos?: number,
    ingreso?: number,
    personalOcupado?: number,
    remuneracion?: number,
    otrosCostosGastos?: number,
    idSeccion?: number,
    idCodigoCIIU?: string,
    idCaratulaUnica?: number,
	
}

    