/**
 * InasLicHaber.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore: 'Personal',
  migrate: 'safe',
  tableName: 'INASLICHABER',
  attributes: {
          id: { type:'number', columnName:'InasHabLinea', required:true },
          InasCausId: 'string',
          PersonalPerId: 'number',
          InasHabFecha: { type:'ref', columnType:'date' },
          InasHabCant: 'number',
          InasHabAnioGenera: 'number',
          InasHabFchVtoIni: { type:'ref', columnType:'date' },
          InasHabFchVtoFin: { type:'ref', columnType:'date' },
          InasHabUserId: 'string',
          InasHabUserFec: { type:'ref', columnType:'datetime' },
  },

/*                 _               _ _
         __ _  ___| |_ _   _  __ _| (_)______ _ _ __
        / _` |/ __| __| | | |/ _` | | |_  / _` | '__|
       | (_| | (__| |_| |_| | (_| | | |/ / (_| | |
        \__,_|\___|\__|\__,_|\__,_|_|_/___\__,_|_|
*/

  // la función 'actualizar' requiere un dbh obtenido por .transaction
  actualizar: async function(dbh, personalPerId, fecha, dias, userId) {

    const hoy = new Date();

    // preciso saber si en la base ya está este registro entonces tuve que usar sendNativeQuery
    const result =
      await this.getDatastore().sendNativeQuery(
        'update INASLICHABER set InasHabCant=$1,InasHabFchVtoIni=least(InasHabFchVtoIni,$2) where InasCausId="CE" and PersonalPerId=$3 and InasHabAnioGenera=$4',
        [ dias, fecha, personalPerId, fecha.getFullYear() ]
      ).usingConnection(dbh);

    if (!result) {
      throw new Error('No se pudo registrar el cambio en la licencia al haber');
    }

    if (result.affectedRows == 0 && dias > 0) {

      const obj = {
        id: await Numerador.siguiente(dbh,'LICHABERES'),
        InasCausId: 'CE',
        PersonalPerId: personalPerId,
        InasHabAnioGenera: fecha.getFullYear(),
        InasHabCant: dias,
        InasHabFecha: hoy.toDateString(),
        InasHabFchVtoIni: fecha.toDateString(),
        InasHabUserId: userId,
        InasHabUserFec: hoy,
      };
      await this.create(obj).usingConnection(dbh);

    }
  },

};
