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
           id: { type:'number', columnName:'CompElecPeriodoId', autoIncrement:true },
           CompElecDesc: 'string',
           CompElecFecha: { type:'ref', columnType:'date' },
           CompElecDesde: { type:'ref', columnType:'date' },
           CompElecHasta: { type:'ref', columnType:'date' },
           // licencia
           CompElecLicenciaEscalafones: { type:'string', allowNull: true },
           CompElecLicenciaAsistencia: 'number',
           CompElecLicenciaActuacion: 'number',
           // dinero
           CompElecDineroEscalafones: { type:'string', allowNull: true },
           CompElecDineroAsistencia: 'number',
           CompElecDineroActuacion: 'number',
   },
 };
