class Programa {
	public nombre:string;
	public version: number;

	getNombre(nombre:string){
		return this.nombre;
	}

	getVersion(){
		return this.version;
	}

	setNombre(nombre:string){
		this.nombre = nombre;
	}

	setVersion(version:number){
		this.version = version;
	}
}

class EditorVideo extends Programa {
	public timeline:number;

	setTimeLine(timeline:number){
		this.timeline = timeline;
	}
	
	getTimeLine(){
		return this.timeline;
	}

	getAllData(){
		return this.getNombre()+" - "+this.getVersion()+" - "+this.getTimeLine();
	}
}

var debug = true;
var editor = new EditorVideo();
editor.setNombre("Camtasia Studio");
editor.setVersion(8);
editor.setTimeLine(4000);

if (debug)console.error(editor.getAllData());

//logica del formulario

var programas:Array<any> = [];

function guardar(){
	//guardar el valor del input
	var nombre = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
	var programa = new Programa();
	programa.setNombre(nombre);
	programa.setVersion(1);
	programas.push(programa);

	//bucle que recorre el array
	var list="";
	for (var i =0; i < programas.length; i++){
		list= list+"<li>"+programas[i].getNombre()+"</li>"
	}
	var listado = <HTMLElement>document.getElementById("listado");
	listado.innerHTML = list;
	(<HTMLInputElement>document.getElementById("nombre")).value = "";
}