/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/opciones/consulta': { controller: 'CompensacionEleccionesOpciones', action: 'consulta' },
  '/opciones/registro': { controller: 'CompensacionEleccionesOpciones', action: 'registro' },
  '/opciones/guardar': { controller: 'CompensacionEleccionesOpciones', action: 'guardar' },
  '/periodos/listado': { controller: 'CompensacionEleccionesPeriodos', action: 'listado' },
  '/periodos/guardar': { controller: 'CompensacionEleccionesPeriodos', action: 'guardar' },

};
