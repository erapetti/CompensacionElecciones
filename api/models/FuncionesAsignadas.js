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

   activos: async function (dependId,fecha) {
     const result = await this.getDatastore().sendNativeQuery(`
          select PersonalPerId,PerDocId,PerNombreCompleto,SillaDependId DependId,FuncionDesc,EscId
          from RELACIONES_LABORALES
          join FUNCIONES_RELACION_LABORAL using (RelLabId)
          join FUNCIONES_ASIGNADAS FA using (FuncAsignadaId)
          join SILLAS S on FA.SillaId = S.SillaId
          join FUNCIONES using (FuncionId)
          join PUESTOS using (PuestoId)
          join DENOMINACIONES_CARGOS using (DenomCargoId)
          join Personas.V_PERSONAS on perid=personalperid
          where SillaDependId=$1
            and RelLabAnulada=0
            and FuncAsignadaAnulada=0
            and ifnull(FuncAsignadaFchDesde,'1000-01-01')<=date($2)
            and (ifnull(FuncAsignadaFchHasta,'1000-01-01')='1000-01-01' or FuncAsignadaFchHasta>=date($2))
          group by PersonalPerId,PerDocId,PerNombreCompleto,SillaDependId,FuncionDesc,EscId
          order by PerDocId
      `, [dependId,fecha]);

      return result.rows;
   },
 };
