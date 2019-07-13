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
      periodoId: periodoId,
    };

    try {
      const hoy = (new Date()).toDateString();
      const periodos = await CompensacionEleccionesPeriodos.find({CompElecDesde:{'<=':hoy},CompElecHasta:{'>=':hoy}}).sort('id');
      if (!periodos || !periodos.length) {
        throw new Error("No hay ningún período de elecciones que esté activo para registrar opciones");
      }
      if (periodoId && !periodos.find(p => p.id==periodoId)) {
        throw new Error("El período solicitado no se encuentra activo para registrar opciones");
      }
      viewdata.periodos = periodos;
      viewdata.periodoId = periodoId || periodos[0].id;

      const depend = await Dependencias.findOne({id:req.session.Dependid});
      if (!depend) {
        throw new Error("No se encuentra la definición de la dependencia "+req.session.Dependid);
      }
      viewdata.dependDesc = depend.DependDesc;
      viewdata.dependNom = depend.DependNom;

      const personal = await FuncionesAsignadas.activos(req.session.Dependid, periodos.find(p => p.id==viewdata.periodoId).CompElecFecha);
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

      const hoy = (new Date()).toDateString();
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
      title: 'Registro de opciones de compensación por Elecciones Nacionales',
      id: 'consulta',
      sprintf: require("sprintf"),
      mensaje: undefined,
      periodos: [],
      persona: {},
      opciones: [],
      dependencias: [],
    };

    try {
      viewdata.periodos = await CompensacionEleccionesPeriodos.find();
      viewdata.persona = await Personas.findOne({PaisCod:'UY',DocCod:'CI',PerDocId:req.session.Userid.replace('u','')});
      if (!viewdata.persona || !viewdata.persona.id) {
        throw new Error("No se encuentra la información para el usuario "+req.session.Userid+". Reinicie la sesión en el Portal de servicios.");
      }
      viewdata.opciones = await CompensacionEleccionesOpciones.find({PersonalPerId:viewdata.persona.id}).sort('id');

      const dependIds = viewdata.opciones.map(o => o.DependId);
      viewdata.dependencias = await Dependencias.find({id:{in: dependIds}});

      // determino las opciones que van tachadas: las que tienen un registro posterior para el mismo período
      for (let i=0; i<viewdata.opciones.length; i++) {
        for (let j=i+1; j<viewdata.opciones.length; j++) {
          if (viewdata.opciones[i].CompElecPeriodoId == viewdata.opciones[j].CompElecPeriodoId) {
            // encontré
            viewdata.opciones[i].tachado = 1;
            break;
          }
        }
      }
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
