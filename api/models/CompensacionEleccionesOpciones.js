/**
 * CompensacionEleccionesOpciones.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
   datastore: 'Personal',
   migrate: 'alter',
   tableName: 'COMPELECPERIODOSOPCIONES',
   attributes: {
     id: { type:'number', columnName:'CompElecPeriodoOpcionId', autoIncrement:true },
     PersonalPerId: 'number',
     CompElecPeriodoId: { model:'CompensacionEleccionesPeriodos' },
     DependId: { model:'Dependencias' },
     Tipo: { type:'string', isIn:['nopresenta','asistencia','actuacion']},
     Compensacion: { type:'string', isIn:['licencia','dinero']},
     FechaRegistro: { type:'ref', columnType:'datetime' },
     UsrRegistro: 'string',
     FechaEnvio: { type:'ref', columnType:'datetime' },
     FechaAnulacion: { type:'ref', columnType:'datetime' },
     UsrAnulacion: 'string',
     FechaEnvioAnulacion: { type:'ref', columnType:'datetime' },
   },
 };
