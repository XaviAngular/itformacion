interface cocheBase{
	getModelo():string;
	getVelocidad():number;
}
class coche implements cocheBase  {
	//Se definen las propiedades publicas
	public color: string;
	public modelo: string;
	public velocidad: number; //esto se debería hacer con un constructor que ya veremos
	//Contructor
	constructor(modelo = null){
		this.color="Blanco";
		this.velocidad = 0;
		if(modelo==null){
			this.modelo = "BMW Generico";
		} else {
			this.modelo =modelo;
		}
		
	}
	//Funciones/métodos
	public getColor(){
		return this.color;
	}

	public setColor(color:string){
		this.color = color;
	}
	public getModelo(){
		return this.modelo;
	}

	public setModelo(modelo:string){
		this.color = modelo;
	}

	public acelerar(){
		this.velocidad++;
	}
	public frenar(){
		this.velocidad--;
	}

	public getVelocidad():number{
		return this.velocidad;
	}

}

var turismo = new coche("Ford Fusion"); //declaración de objeto
var furgoneta = new coche(); //declaración de objeto
var camion = new coche(); //declaración de objeto
turismo.setColor("Rojo"); 
turismo.acelerar();
turismo.acelerar();
turismo.acelerar();


furgoneta.setColor("Azul"); 
camion.setColor("Amarillo"); 
console.log("El color del turismo es: " + turismo.getColor());
console.log("El color de la furgoneta es: " + furgoneta.getColor());
console.log("El color del camion es: " + camion.getColor());
console.log("La velocidad del turismo es :"+turismo.getVelocidad());

turismo.frenar();
console.log("Después de frenar, la velocidad del turismo es :"+turismo.getVelocidad());
console.log("El modelo del turismo es: "+turismo.getModelo());
console.log("El modelo de furgoneta es: "+furgoneta.getModelo());
console.log("El modelo del camion es: "+camion.getModelo());

