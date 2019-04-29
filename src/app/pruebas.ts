class Persona{
    nombre:string;
    apellido:string;

    constructor(nombre:string, apellido:string){
        this.nombre = nombre;
        this.apellido = apellido;
    }

    nombreCompleto() {
        return this.nombre+' '+this.apellido;
    }

    tuNombre(){
        return 'Me llamo'+this.nombreCompleto();
    }
}