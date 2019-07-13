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

   // Personal con funciones activas en la dependencia
   // En el caso de RECURSOS HUMANOS (2710) se devuelven todos los funcionarios activos en oficinas
   activos: async function (dependId) {
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
          join Direcciones.DEPENDENCIAS D on D.DependId=SillaDependId
          where (SillaDependId=$1 or ($1=2710 and not(DependTipId=2 and DependSubtipId=1)))
            and RelLabAnulada=0
            and FuncAsignadaAnulada=0
            and ifnull(FuncAsignadaFchDesde,'1000-01-01')<=CURDATE()
            and (ifnull(FuncAsignadaFchHasta,'1000-01-01')='1000-01-01' or FuncAsignadaFchHasta>=CURDATE())
          group by PersonalPerId,PerDocId,PerNombreCompleto,SillaDependId,FuncionDesc,EscId
          order by PerDocId
      `, [dependId]);

      return result.rows;
   },
 };
