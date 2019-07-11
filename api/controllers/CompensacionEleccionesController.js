/**
 * CompensacionEleccionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

/*                          _     _
             _ __ ___  __ _(_)___| |_ _ __ ___
            | '__/ _ \/ _` | / __| __| '__/ _ \
            | | |  __/ (_| | \__ \ |_| | | (_) |
            |_|  \___|\__, |_|___/\__|_|  \___/
                      |___/
*/
  registro: async function(req,res) {
    const periodoId = (req.param('periodoid') || '').checkFormat(/\d+/);

    let viewdata = {
      title: 'Opciones para el personal asignado a Elecciones Nacionales',
      id: 'registro',
      dependDesc: undefined,
      //periodo: {},
      periodos: [],
      dependNom: undefined,
      personal: [],
      mensaje: undefined,
      tipos: [],
      compensaciones: [],
      periodoid: periodoId,
    };

    try {
      const hoy = new Date();
      const periodos = await CompensacionEleccionesPeriodos.find({CompElecDesde:{'<=':hoy},CompElecHasta:{'>=':hoy}}).sort('id');
      if (!periodos) {
        throw new Error("No hay ningún período de elecciones que esté activo para registrar opciones");
      }
      if (periodoId && !periodos.find(p => p.id==periodoId)) {
        throw new Error("El período solicitado no se encuentra activo para registrar opciones");
      }
      viewdata.periodos = periodos;
      viewdata.periodoid = periodoId || periodos[0].id;

      const depend = await Dependencias.findOne({id:req.session.Dependid});
      if (!depend) {
        throw new Error("No se encuentra la definición de la dependencia "+req.session.Dependid);
      }
      viewdata.dependDesc = depend.DependDesc;
      viewdata.dependNom = depend.DependNom;

      const personal = await FuncionesAsignadas.activos(req.session.Dependid);
      if (!personal) {
        throw new Error("No se encuentra personal activo en la dependencia "+req.session.Dependid);
      }
      viewdata.personal = personal;

      const perIds = personal.map(p => p.PersonalPerId);

      const opciones = await CompensacionEleccionesOpciones.find({CompElecPeriodoId:periodoId, PersonalPerId:{ in:perIds }}).sort('id desc').populate('DependId');
      viewdata.opciones = opciones;

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
      const perId = (req.param('perid') || '').checkFormat(/\d+/);
      const tipo = (req.param('tipo') || '').checkFormat(/\w+/);
      const compensacion = (req.param('compensacion') || '').checkFormat(/\w+/);
      const periodoId = (req.param('periodoid') || '').checkFormat(/\d+/);

      if (!perId || !tipo || !compensacion || !periodoId) {
        throw new Error("Parámetros incorrectos");
      }

      const hoy = new Date();
      const periodo = await CompensacionEleccionesPeriodos.findOne({id:periodoId,CompElecDesde:{'<=':hoy},CompElecHasta:{'>=':hoy}});
      if (!periodo) {
        throw new Error("No hay ningún período de elecciones que esté activo para registrar opciones");
      }

      if (!req.session.Dependid || !req.session.Userid) {
        throw new Error("Reinicie  || !periodo[0]su sesión en el Portal de Servicios");
      }

      const opcion = {
        PersonalPerId: perId,
        CompElecPeriodoId: periodoId,
        DependId: req.session.Dependid,
        Tipo: tipo,
        Compensacion: compensacion,
        FechaRegistro: new Date(),
        UsrRegistro: req.session.Userid,
      };

      await CompensacionEleccionesOpciones.create(opcion);

    } catch(e) {
      return res.status(200).json({error:e.message});
    }
    return res.status(200).json({error:""});
  },

/*                                    _ _
             ___ ___  _ __  ___ _   _| | |_ __ _
            / __/ _ \| '_ \/ __| | | | | __/ _` |
           | (_| (_) | | | \__ \ |_| | | || (_| |
            \___\___/|_| |_|___/\__,_|_|\__\__,_|
*/
  consulta: async function(req,res) {
    let viewdata = {
      title: 'Autoconsulta del registro de opciones de compensación para los asignados a elecciones nacionales',
      id: 'consulta',
    };
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
