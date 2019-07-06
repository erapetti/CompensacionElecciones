/**
 * FuncionesAsignadas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
   datastore: 'Personal',
   migrate: 'safe',
   tableName: 'v_funciones_del_personal',
   attributes: {
           id: { type:'number', columnName:'FuncAsignadaId', required:true },
           DependId: 'number',
           Estado: 'string',
           PersonalPerId: 'number',
           PerDocId: 'string',
           PerNombreCompleto: 'string',
           FuncionDesc: 'string',
           EscId: 'string',
   },
 };
