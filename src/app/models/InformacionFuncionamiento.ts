//===============================================
// Informacion Funcionamiento de la ecuesta EAC
//===============================================

import { NumericLiteral } from "typescript";

// CaratulaUnica
export interface InformacionFuncionamiento{
	id?:number;
  	anioInicioOperaciones?:number;
	mesesOperacion?:Int32Array;
	cualOtraCausa?:string;
	numeroDepartamentos?: number;
	fechaDiligenciamiento?: string;
	representanteLegal?: string;
	emailRepresentante?: string;
	celularRepresentante?:number;
	personaDiligencia?: string;
	cargoDiligencia?: string;
	emailDiligencia?: string;
	telefonoDiligencia ?:number;
	extensionDiligencia?:number;
	celularDiligencia?:number;
	idTipoCausa?:number;
	idCaratulaUnica?:number;
}
