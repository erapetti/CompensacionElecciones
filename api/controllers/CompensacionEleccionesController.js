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

      const personal = await FuncionesAsignadas.find({DependId:req.session.Dependid,Estado:'A'});
      if (!personal) {
        throw new Error("No se encuentra personal activo en la dependencia "+req.session.Dependid);
      }
      viewdata.personal = personal;
    } catch (e) {
      viewdata.mensaje = e.message;
    }
    return res.view(viewdata);
  },

  consulta: async function(req,res) {
    let viewdata = {
      title: 'Autoconsulta del registro de opciones de compensación para los asignados a elecciones nacionales',
      id: 'consulta',
    };
    return res.view(viewdata);
  },

};
