//===============================================
// Direccion de la ecuesta EAC
//===============================================

import { NumericLiteral } from "typescript";

// CaratulaUnica
export interface Direccion{
	id?:number; 
	localizacionGeoreferenciada?: number, 
	direccion?: string, 
	telefono?:number, 
	redesSociales?: string, 
	correoElectronico?: string, 
	paginaWeb?: string,
	idTipoDireccion?: string,
	idCaratulaUnica?: number
}
