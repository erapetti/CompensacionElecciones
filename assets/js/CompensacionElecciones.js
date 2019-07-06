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

$('#registro button.accion').on('click', function (e) {
  $('#registroModal #modalMessage').text('').hide();
  var idx = $(this).data('idx');
  if (idx >=0) {
    $('#registroModal #nombrecompleto').text( data[idx][1] );
    $('#registroModal #dinero').prop('disabled', ( data[idx][3] != 'H' ));
    if (data[idx][3] != 'H') {
      $('#registroModal div:has(> #dinero)').hide();
    } else {
      $('#registroModal div:has(> #dinero)').show();
    }
    $('#registroModal #nopresenta').prop('checked', true);
    $('#registroModal #asistencia').prop('checked', $(this).data("tipo") == "asistencia");
    $('#registroModal #actuacion').prop('checked', $(this).data("tipo") == "actuacion");
    $('#registroModal #licencia').prop('checked', true);
    $('#registroModal #dinero').prop('checked', $(this).data("compensacion") == "dinero");
    $('#registroModal').data('perid', $(this).data("perid"));
  }
});

$('#registroModal #submit').click(function(e) {
  $('#registroModal button').attr('disabled',true);
  $('#registroModal #submit').html('<span class="fas fa-spinner fa-spin"></span>');
  var param = { perid:$('#registroModal').data('perid'), tipo:$('#registroModal input[name=tipo]:checked').val(), compensacion:$('#registroModal input[name=compensacion]:checked').val(), };
  $.post( "guardar", param, function(data) {
    console.log(data);
    if (data.error == "") {
      location.reload();
    } else {
      $('#registroModal #modalMessage').text("ERROR: "+data.error).show();
      $('#registroModal #submit').text("Guardar");
      $('#registroModal button').attr('disabled',false);
    }
  }, "json").fail(function(){
    $('#registroModal #modalMessage').text("ERROR: La operación terminó con error").show();
    $('#registroModal #submit').text("Guardar");
    $('#registroModal button').attr('disabled',false);
  });
});
