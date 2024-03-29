/**
 * Numerador.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  datastore: 'Personal',
  migrate: 'safe',
  tableName: 'NUMERADOR',
  attributes: {
          id: { type:'string', columnName:'NumClaveId', required:true },
          NumDsc: 'string',
          NumUltimo: 'number',
  },

/*             _             _            _
           ___(_) __ _ _   _(_) ___ _ __ | |_ ___
          / __| |/ _` | | | | |/ _ \ '_ \| __/ _ \
          \__ \ | (_| | |_| | |  __/ | | | ||  __/
          |___/_|\__, |\__,_|_|\___|_| |_|\__\___|
                 |___/
*/

  // la función 'siguiente' requiere un dbh obtenido por .transaction
  siguiente: async function(dbh, id) {

      await this.getDatastore().sendNativeQuery(
        `update NUMERADOR set NumUltimo=(@ultimo:=NumUltimo+1) where NumClaveId=$1`,
        [ id ]
      ).usingConnection(dbh);

      const result = await this.getDatastore().sendNativeQuery(
        `select @ultimo NumUltimo`,
        [ id ]
      ).usingConnection(dbh);

      const ultimo = result && result.rows[0] ? result.rows[0].NumUltimo : undefined;

      if (!ultimo) {
        throw 'Numerador no encontrado';
      }

      return ultimo;
  },
};
