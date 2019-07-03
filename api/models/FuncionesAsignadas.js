/**
 * FuncionesAsignadas.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
   datastore: 'Personal',
   migrate: 'safe',
   tableName: 'FUNCIONESASIGNADAS',
   attributes: {
           id: { type:'number', columnName:'FuncAsignadaId', required:true },
   },

   personalActivo: async function (dependId) {
     return await this.getDatastore().sendNativeQuery(`
       select PersonalPerId,PerDocId,PerNombreCompleto,FuncionDesc,EscId
       from v_funciones_del_personal
       where DependId = $1
         and estado = 'A'
     `, [dependId]);
   },
 };
