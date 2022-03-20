//===============================================
// CapitalSocial de la ecuesta EAC
//===============================================

import { NumericLiteral } from "typescript";

// CaratulaUnica
export interface CapitalSocial{
	id?:number; 
	publico?: number, 
	privado?:number, 
    total?: number,
	idTipoCapitalSocial?: string, 
	idCaratulaUnica?: string
	
}
