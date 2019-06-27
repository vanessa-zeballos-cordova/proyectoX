
export class Berp{

    private e: string;
    private k: string;
    private m: string;
    private p: string;
    private success: boolean ;
    private x: number;

    constructor(e : string, k : string, m : string, p : string, success : boolean, x :number){
        this.e = e;
        this.k = k;
        this.m = m;
        this.p = p;
        this.success = success;
        this.x = x;
    }

    getE(){
        return this.e;
    }
    getK(){
        return this.k;
    }
    getM(){
        return this.m;
    }
    getP(){
        return this.p;
    }
    getSuccess(){
        return this.success;
    }
    getX(){
        return this.x;
    }
}