//===============================================
// Caratula unica de la ecuesta EAC
//===============================================

// CaratulaUnica
export interface CaratulaUnica{
    id?: number;
	numeroOrden?:number;    
    numeroDocumento?: number;    
    digitoVerificacion?: number;    
    numeroCamara?: number;
    numeroRegistro?: number;
	razonSocial?: string;
	georeferenciaGerecia?: number;
	nombreComercial?: string;
	sigla?: string;
	paginaWeb?: string;
	georeferenciaNotificacion?: number;
	cualTipoOrgaizacion?: string;
	fechaConstitucionDesde?: string;
	fechaConstitucionHasta?: string;
	cualOtroEstado?: string;
	numeroUnidadesApoyo?: string;	
	idTipoDocumento?: number;  
	tipoDocumento?:number; 
	tipoRegistroMercantil?:number;
	tipoOrganizacion?:Number;
	subTipoOrganizacion?:number;
	estadoEmpresa?:number; 
	capitalSocial?:number;
	operaciones?:string;
	variablesEmpresa?:number;
	idTipoOrganizacion?:number;
	idSubTipoOrganizacion?:string;
	idEstadoEmpresa?:number;
	idPeriodoRecoleccion?:number;
	idDirectorio?:number;
	idEstadoEncuesta?:number;	
	idTipoRegistroMercantil?:number;

}