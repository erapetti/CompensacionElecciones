/**
 * CompensacionEleccionesPeriodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  listado: async function(req,res) {
    let viewdata = {
      title: 'Períodos de Elecciones Nacionales',
      id: 'periodosListado',
      sprintf: require("sprintf"),
      mensaje: undefined,
      periodos: [],
    };

    try {
      viewdata.periodos = await CompensacionEleccionesPeriodos.find().sort('id');
      // agrego el atributo activo a cada registro:
      const hoy = new Date();
      viewdata.periodos = viewdata.periodos.map(p => {p.activo = (p.CompElecDesde<=hoy && hoy<=p.CompElecHasta); return p});
    } catch (e) {
      viewdata.mensaje = e.message;
    }
    return res.view(viewdata);
  },
};

/*                            _
                    _ __ ___ (_)___  ___
                   | '_ ` _ \| / __|/ __|
                   | | | | | | \__ \ (__
                   |_| |_| |_|_|___/\___|
*/

String.prototype.checkFormat = function(regexp) {
  if (typeof this === 'undefined') {
    return undefined;
  }
  if (typeof regexp === 'string') {
    regexp = new RegExp('^'+regexp+'$');
  } else {
    regexp = new RegExp('^'+regexp.source+'$');
  }
  return (this.match(regexp) ? this.toString() : undefined);
};

Date.prototype.toDateString = function(d) {
  const sprintf = require("sprintf");
  return sprintf("%04d-%02d-%02d", this.getFullYear(),this.getMonth()+1,this.getDate());
};
