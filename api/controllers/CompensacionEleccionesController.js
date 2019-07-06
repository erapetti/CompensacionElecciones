/**
 * CompensacionEleccionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  registro: async function(req,res) {
    let viewdata = {
      title: 'Opciones para el personal asignado a Elecciones Nacionales',
      id: 'registro',
      dependDesc: undefined,
      compElecDesc: undefined,
      dependNom: undefined,
      personal: [],
      mensaje: undefined,
      tipos: [],
      compensaciones: [],
    };

    try {
      const periodo = await CompensacionEleccionesPeriodos.findOne({CompElecActivo:1});
      if (!periodo) {
        throw new Error("No hay ningún período de elecciones que esté activo para registrar opciones");
      }
      viewdata.compElecDesc = periodo.CompElecDesc;

      const depend = await Dependencias.findOne({id:req.session.Dependid});
      if (!depend) {
        throw new Error("No se encuentra la definición de la dependencia "+req.session.Dependid);
      }
      viewdata.dependDesc = depend.DependDesc;
      viewdata.dependNom = depend.DependNom;

      const personal = await FuncionesAsignadas.find({DependId:req.session.Dependid,Estado:'A'}).sort('PerDocId');
      if (!personal) {
        throw new Error("No se encuentra personal activo en la dependencia "+req.session.Dependid);
      }
      viewdata.personal = personal;

      const perIds = personal.map(p => p.PersonalPerId);

      const opciones = await CompensacionEleccionesOpciones.find({PersonalPerId: { in: perIds }}).sort('id desc').populate('DependId');
      viewdata.opciones = opciones;

    } catch (e) {
      viewdata.mensaje = e.message;
    }
    return res.view(viewdata);
  },

  guardar: async function(req,res) {
    try {
      const perId = req.param('perid');
      const tipo = req.param('tipo');
      const compensacion = req.param('compensacion');

      const periodo = await CompensacionEleccionesPeriodos.findOne({CompElecActivo:1});
      if (!periodo) {
        throw new Error("No hay ningún período de elecciones que esté activo para registrar opciones");
      }

      if (!req.session.Dependid || !req.session.Userid) {
        throw new Error("Reinicie su sesión en el Portal de Servicios");
      }

      const opcion = {
        PersonalPerId: perId,
        CompElecPeriodoId: periodo.id,
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

  consulta: async function(req,res) {
    let viewdata = {
      title: 'Autoconsulta del registro de opciones de compensación para los asignados a elecciones nacionales',
      id: 'consulta',
    };
    return res.view(viewdata);
  },

};
