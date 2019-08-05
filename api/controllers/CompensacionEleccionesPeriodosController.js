/**
 * CompensacionEleccionesPeriodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

/*              _ _     _            _
               | (_)___| |_ __ _  __| | ___
               | | / __| __/ _` |/ _` |/ _ \
               | | \__ \ || (_| | (_| | (_) |
               |_|_|___/\__\__,_|\__,_|\___/
*/
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
      const hoy = (new Date()).toDateString();
      viewdata.periodos = viewdata.periodos.map(p => {p.activo = (p.CompElecDesde.toDateString()<=hoy && hoy<=p.CompElecHasta.toDateString()); return p});
    } catch (e) {
      viewdata.mensaje = e.message;
    }
    return res.view(viewdata);
  },

  /*                                   _
              __ _ _   _  __ _ _ __ __| | __ _ _ __
             / _` | | | |/ _` | '__/ _` |/ _` | '__|
            | (_| | |_| | (_| | | | (_| | (_| | |
             \__, |\__,_|\__,_|_|  \__,_|\__,_|_|
             |___/
  */
  guardar: async function(req,res) {
    try {
      let periodo = {};
      periodo.id = req.param('periodoid','').checkFormat(/\d+/);
      periodo.CompElecDesc = req.param('CompElecDesc','').checkFormat(/[\wáéíóúÁÉÍÓÚüÜñÑ ,;.'"º°-]+/);
      periodo.CompElecFecha = req.param('CompElecFecha','').checkFormat(/\d\d\d\d-\d\d-\d\d/);
      periodo.CompElecDesde = req.param('CompElecDesde','').checkFormat(/\d\d\d\d-\d\d-\d\d/);
      periodo.CompElecHasta = req.param('CompElecHasta','').checkFormat(/\d\d\d\d-\d\d-\d\d/);
      periodo.CompElecLicenciaEscalafones = req.param('CompElecLicenciaEscalafones','').checkFormat(/[\w, ]+/);
      periodo.CompElecLicenciaAsistencia = req.param('CompElecLicenciaAsistencia','').checkFormat(/\d+/);
      periodo.CompElecLicenciaActuacion = req.param('CompElecLicenciaActuacion','').checkFormat(/\d+/);
      periodo.CompElecDineroEscalafones = req.param('CompElecDineroEscalafones','').checkFormat(/[\w, ]+/);
      periodo.CompElecDineroAsistencia = req.param('CompElecDineroAsistencia','').checkFormat(/\d+/);
      periodo.CompElecDineroActuacion = req.param('CompElecDineroActuacion','').checkFormat(/\d+/);

      if (!periodo.CompElecFecha || !periodo.CompElecDesc || !periodo.CompElecDesde || !periodo.CompElecHasta) {
        throw new Error("Parámetros incorrectos");
      }

      if (!periodo.id) {
        await CompensacionEleccionesPeriodos.create(periodo);
      } else {
        await CompensacionEleccionesPeriodos.update({id:periodo.id},periodo);
      }

    } catch(e) {
      return res.status(200).json({error:e.message});
    }
    return res.status(200).json({error:""});
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
