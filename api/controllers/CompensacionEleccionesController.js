/**
 * CompensacionEleccionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  registro: async function(req,res) {
    let viewdata = {
      title: 'Registro de opciones de compensación para los asignados a elecciones nacionales',
      id: 'registro',
      dependDesc: 'prueba',
      CompElecDesc: 'Elecciones Internas 2019',
    };
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
