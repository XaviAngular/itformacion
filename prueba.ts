function holaMundo(nombre){
	return "Hola Mundo! Soy "+nombre;
}

var nombre = "Xavi García";
var resultado = holaMundo(nombre);
var etiqueta =<HTMLElement>document.getElementById("container");
etiqueta.innerHTML = resultado;

//Variables y tipos
var nombre:string="Xavier García";
var edad:number=23;
var programador:boolean = true;
var langs: Array<string>= ["PHP", "JavaScript", "CSS"];

etiqueta.innerHTML = nombre+" - "+edad;
console.log("Esto Funciona");

//Let y var

var a=7;
var b=2;

if (a===7) {
	let a=4;
	let b=1;
	console.log('Dentro del IF: a='+a+" b= "+b );
}
console.log('Fuera del IF: a='+a+" b= "+b );

// Funciones y tipado

//Recibe number y devuelve string
function devuelveNumero(num:number):string{
	return 'El número es: '+num;
}

console.log(devuelveNumero(45));

//Recibe string y devuelve number
function devuelveString(texto:string):number{
	if (texto=="hola"){
		var num = 66;
	}else {
		var num= 99;
	}
	return num;
}

console.log(devuelveString('Javier'));
console.log(devuelveString('hola'));

//Recibe string y devuelve boolean
function devuelveBoolean(texto:string):boolean{
	if (texto=="hola"){
		var num = true;
	}else {
		var num= false;
	}
	return num;
}

console.log(devuelveBoolean('Javier'));
console.log(devuelveBoolean('hola'));

//Recibe string y devuelve cualquier cosa
function devuelveCualquierCosa(texto:string):any{
	if (texto=="hola"){
		var num = 50;
	}else {
		 var num= "texto simple";
	}
	return num;
}

console.log(devuelveCualquierCosa('Javier'));
console.log(devuelveCualquierCosa('hola'));
