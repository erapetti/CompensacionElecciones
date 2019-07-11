'use strict'


module.exports = {
	getSession: async function(sesionId, prmObjId) {
		// recibe string con el número de sesión y el id de este programa
		// devuelve un objeto {Sesionesid,Userid,Dependid,Lugarid}
		if (typeof sesionId === 'undefined' || ! sesionId.match(/^ *([a-zA-Z\d]+) *$/)) {
			throw new Error("Sesión no válida. Reinicie su conexión con el portal de servicios");
		}

		const util = require('util');
		const soap = require('soap');
		const createClient = util.promisify(soap.createClient);
		const client = await createClient('assets/wsdl/aws_dame_datos_de_sesion.wsdl');

		const execute = util.promisify(client.Execute);
		let sesion;
		try  {
			sesion = await execute({Sesionesid:sesionId});
		} catch (e) {
			return (typeof e.Fault !== 'undefined' ? e.Fault : e);
		}

		if (!sesion || !sesion.Userid) {
			throw new Error("Sesión no válida. Reinicie su conexión con el portal de servicios");
		}

		const permiso = await wsPortal.leoPermiso(sesionId, prmObjId, 'DSP');

		if (permiso.Autorizado !== "S") {
			throw new Error("No tiene los privilegios requeridos para acceder a esta página");
		}
		return sesion;
	},

	leoPermiso: async function(sesionId,prmObjId,modo) {
		// devuelve {Autorizado,Path}

		const util = require('util');
		const soap = require('soap');
		const createClient = util.promisify(soap.createClient);

		const client = await createClient('assets/wsdl/aws_autorizar_usuario_objeto.wsdl');
		const execute = util.promisify(client.Execute);
		let permiso;
		try {
			permiso = await execute({Sesionesid:sesionId,Programa:prmObjId,Modo:modo});
		} catch (e) {
			return (typeof e.Fault !== 'undefined' ? e.Fault : e);
		}

		return permiso;
	},

};
