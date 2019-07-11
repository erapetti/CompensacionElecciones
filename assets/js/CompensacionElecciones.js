var rtable = $('#registro table.datatable').DataTable({
  data:data,
  lengthMenu: [ 25, 50, 75, 100 ],
  language: {
        search: 'Filtrar por:',
        info: 'Mostrando de _START_ a _END_ de _TOTAL_ filas',
        infoFiltered: '(filtradas de _MAX_ filas en total)',
        lengthMenu: 'Mostrar _MENU_ registros',
        emptyTable: 'No hay registros para mostrar',
        zeroRecords: 'Al aplicar el filtro no hay registros para mostrar',
        paginate: {
              previous: 'Anterior',
              next: 'Siguiente',
        },
  },
  fixedHeader: { header: true, },
});

rtable.on('draw', function() {
  // en cada draw tengo que reasignar los eventos a los elementos
  $('#registro button.accion').on('click', buttonAccion);
});

$('#registro button.accion').on('click', buttonAccion);

function buttonAccion () {
  $('#registroModal #modalMessage').text('').hide();
  var idx = $(this).data('idx');
  if (idx >= 0) {
    $('#registroModal #nombrecompleto').text( data[idx][1] );
    $('#registroModal #dinero').prop('disabled', ( data[idx][3] != 'H' ));
    if (data[idx][3] == 'H') {
      $('#registroModal div:has(> #dinero)').show();
    } else {
      $('#registroModal div:has(> #dinero)').hide();
    }
    if (btndata[idx].dependdesc) {
      $('#registroModal div:has(> div > #dependencia)').show();
      $('#registroModal #dependencia').text( btndata[idx].dependdesc );
    } else {
      $('#registroModal div:has(> div > #dependencia)').hide();
    }
    // noguardar
    $('#registroModal #submit').attr('disabled', btndata[idx].noguardar == 1);
    $('#registroModal #nopresenta').attr('disabled', btndata[idx].noguardar == 1);
    $('#registroModal #asistencia').attr('disabled', btndata[idx].noguardar == 1);
    $('#registroModal #actuacion').attr('disabled', btndata[idx].noguardar == 1);
    $('#registroModal #licencia').attr('disabled', btndata[idx].noguardar == 1);
    $('#registroModal #dinero').attr('disabled', btndata[idx].noguardar == 1);
    //
    $('#registroModal #nopresenta').prop('checked', true);
    $('#registroModal #asistencia').prop('checked', btndata[idx].tipo == 'asistencia');
    $('#registroModal #actuacion').prop('checked', btndata[idx].tipo == 'actuacion');
    $('#registroModal #licencia').prop('checked', true);
    $('#registroModal #dinero').prop('checked', btndata[idx].comp == 'dinero');
    $('#registroModal').data('perid', btndata[idx].perid);
    $('#registroModal').modal('show');
  }
}

$('#registroModal #submit').click(function(e) {
  $('#registroModal button').attr('disabled',true);
  $('#registroModal #submit').html('<span class="fas fa-spinner fa-spin"></span>');
  var param = { perid:$('#registroModal').data('perid'), tipo:$('#registroModal input[name=tipo]:checked').val(), compensacion:$('#registroModal input[name=compensacion]:checked').val(), };
  $.post( 'guardar', param, function(data) {
    console.log(data);
    if (data.error == '') {
      location.reload();
    } else {
      $('#registroModal #modalMessage').text('ERROR: '+data.error).show();
      $('#registroModal #submit').text('Guardar');
      $('#registroModal button').attr('disabled',false);
    }
  }, 'json').fail(function(){
    $('#registroModal #modalMessage').text('ERROR: La operación terminó con error').show();
    $('#registroModal #submit').text('Guardar');
    $('#registroModal button').attr('disabled',false);
  });
});
