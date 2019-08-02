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
    Compensacion: { type:'string', isIn:['licencia','dinero'], allowNull:true },
    FechaRegistro: { type:'ref', columnType:'datetime' },
    UsrRegistro: 'string',
    FechaEnvio: { type:'ref', columnType:'datetime' },
  },
/*                       _ _
                      __| (_) __ _ ___
                     / _` | |/ _` / __|
                    | (_| | | (_| \__ \
                     \__,_|_|\__,_|___/
*/
  // la función 'dias' requiere un dbh obtenido por .transaction
  dias:async function(dbh, personalPerId, anio) {

    const result =
      await this.getDatastore().sendNativeQuery(`
        select sum(if(O1.Compensacion="licencia",if(O1.Tipo="asistencia",CompElecLicenciaAsistencia,if(O1.Tipo="actuacion",CompElecLicenciaActuacion,0)),0)) dias
        from COMPELECPERIODOSOPCIONES O1
        join COMPELECPERIODOS using (CompElecPeriodoId)
        left join COMPELECPERIODOSOPCIONES O2
          on O2.PersonalPerId=O1.PersonalPerId
          and O2.CompElecPeriodoId=O1.CompElecPeriodoId
          and O2.CompElecPeriodoOpcionId>O1.CompElecPeriodoOpcionId
        where O1.PersonalPerId=$1
          and year(CompElecFecha)=$2
          and O2.CompElecPeriodoOpcionId is null
        `, [personalPerId, anio]).usingConnection(dbh);

      return result && result.rows[0] ? result.rows[0].dias : 0;
  },
 };
