const fs = require('fs');

class Vehiculo{
	constructor(marca,modelo,precio){
		this.marca = marca;
		this.modelo = modelo;
		this.precio = precio;
	}
	
	static mostrarDatos = (arrayVehiculos) => {
		let arrayFinal = [];
		let vehiculoMasCaro = arrayVehiculos[0];
		let vehiculoMasBarato = arrayVehiculos[0];
		let vehiculoConY = ''
		console.log('\n')
		arrayVehiculos.forEach((vehiculo,index) => {
			let datosVehiculo
			if(vehiculo.cilindrada === undefined){
				datosVehiculo = `Marca: ${vehiculo.marca} // Modelo: ${vehiculo.modelo} // Puertas: ${vehiculo.puertas} // Precio: $${vehiculo.precio}`; 
			}else{
				datosVehiculo = `Marca: ${vehiculo.marca} // Modelo: ${vehiculo.modelo} // Cilindrada: ${vehiculo.cilindrada} // Precio: $${vehiculo.precio}`; 
			}
			let precio = parseFloat(vehiculo.precio);
			vehiculoMasCaro = ((parseFloat(vehiculoMasCaro.precio)) < precio) ? vehiculo : vehiculoMasCaro;
			vehiculoMasBarato = ((parseFloat(vehiculoMasBarato.precio)) > precio) ? vehiculo : vehiculoMasBarato;
			if(vehiculo.modelo.indexOf('y') >= 0 || vehiculo.modelo.indexOf('Y') >= 0){
				vehiculoConY = vehiculo;
			}
			console.log(datosVehiculo);
		})
		console.log('============================');
		console.log(`Vehiculo mas caro: ${vehiculoMasCaro.marca} ${vehiculoMasCaro.modelo}`);
		console.log(`Vehiculo mas barato: ${vehiculoMasBarato.marca} ${vehiculoMasBarato.modelo}`);
		console.log(`Vehiculo que contiene en el modelo la letra 'Y': ${vehiculoConY.marca} ${vehiculoConY.modelo} $${vehiculoConY.precio}`);
		console.log('============================');
		arrayVehiculos.sort((a,b)=>{
			return parseFloat(b.precio)-parseFloat(a.precio)
		})
		console.log('Vehículos ordenados por precio de mayor a menor:');
		arrayVehiculos.forEach((vehiculo,index) => {
			let datos = `${vehiculo.marca} ${vehiculo.modelo}`;
			console.log(datos);
			
		});
		
		//console.log(arrayFinal);
	}
	
	static cargarDatos = () => {
		fs.readFile('DatosAutos.txt','utf-8',(error,data)=>{
			let vehiculos = [];
			let datosAutosIndividuales = data.split('\r\n');
			datosAutosIndividuales.forEach((auto,index)=>{
				if(auto !== ''){
					if(index < (datosAutosIndividuales.length)){
						let vehiculo;
						let dato = auto.split('@');
						if(auto.indexOf('Cilindrada') > 0){
							vehiculo = new Motocicleta((dato[0].split(':'))[1].trim(),(dato[1].split(':'))[1].trim(),(dato[2].split(':'))[1].trim(),(dato[3].split(':'))[1].trim());
						}else{
							vehiculo = new Motocicleta((dato[0].split(':'))[1].trim(),(dato[1].split(':'))[1].trim(),(dato[2].split(':'))[1].trim(),(dato[3].split(':'))[1].trim());
						}
						vehiculos.push(vehiculo);
					}
				}
			})
			Vehiculo.mostrarDatos(vehiculos);
		})
	}
}

class Auto extends Vehiculo{
	constructor(marca,modelo,puertas,precio){
		super(marca,modelo,precio);
		this.puertas = puertas;
	}
}

class Motocicleta extends Vehiculo{
	constructor(marca,modelo,cilindrada,precio){
		super(marca,modelo,precio);
		this.cilindrada = cilindrada;
	}
}

module.exports.Vehiculo = {Vehiculo,Auto,Motocicleta}