$('table.datatable').DataTable({
  data:data,
  lengthMenu: [ 25, 50, 75, 100 ],
  language: {
        search: "Filtrar por:",
        info: "Mostrando de _START_ a _END_ de _TOTAL_ filas",
        infoFiltered: "(filtradas de _MAX_ filas en total)",
        lengthMenu: "Mostrar _MENU_ registros",
        emptyTable: "No hay registros para mostrar",
        zeroRecords: "Al aplicar el filtro no hay registros para mostrar",
        paginate: {
              previous: "Anterior",
              next: "Siguiente",
        },
  },
  fixedHeader: { header: true, },
});
