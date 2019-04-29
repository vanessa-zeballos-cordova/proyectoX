
export class Claim{ 
    /* constructor(
        id_tipo_incidente: number,
        id_subtipo_incidente: number,
        id_medio_reclamo: number,
        id_funcionario_recepcion: number,
        id_funcionario_denunciado: number,
        id_oficina_incidente: number,
        id_oficina_registro_incidente: number,
        id_proceso_wf: number,
        id_estado_wf: number,
        id_proceso_macro: number,
        id_cliente: number
    ){
        
    } */
    public id_reclamo:string;
    public id_cliente:string;
    public hide:boolean;

    constructor(
        id_reclamo: string,
        id_cliente: string,
        hide: boolean
    ){
        this.id_reclamo = id_reclamo;
        this.id_cliente = id_cliente;
        this.hide = hide;
    }

    toggle(){
        this.hide =!this.hide;
    }
}