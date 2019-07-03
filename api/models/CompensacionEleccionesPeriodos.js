/**
 * CompensacionEleccionesPeriodos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
   datastore: 'Personal',
   migrate: 'alter',
   tableName: 'COMPELECPERIODOS',
   attributes: {
           id: { type:'number', columnName:'CompElecPeriodoId', required:true },
           CompElecDesc: 'string',
           CompElecAnio: 'number',
           CompElecActivo: 'number',
   },
 };
