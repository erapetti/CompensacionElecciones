// La datatable de la página registro:
$('#registro table.datatable').DataTable({
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

// Click en los botones de la datatable en la página registro:
// Tengo que atender el evento en #registro porque cuando datatable pagina
// hay botones que aparecen después y no les queda registrado el listener
$('#registro').on('click', 'button.accion', function buttonAccion () {
  $('#registroModal #modalMessage').text('').addClass('d-none');
  var idx = $(this).data('idx');
  if (!(idx>=0)) {
    return;
  }
  $('#registroModal #periodoDesc').text( $('#periodoid option:checked').text() );
  $('#registroModal #nombrecompleto').text( data[idx][1] );

  const licenciaHabilitada = (licenciaEscalafones == 'todos' || licenciaEscalafones == 'docentes' && data[idx][3] == 'H' || licenciaEscalafones == 'no docentes' && data[idx][3] != 'H');
  $('#registroModal #licencia').prop('disabled', licenciaHabilitada);
  $('#registroModal div:has(> #licencia)').toggle(licenciaHabilitada);

  const dineroHabilitado = (dineroEscalafones == 'todos' || dineroEscalafones == 'docentes' && data[idx][3] == 'H' || dineroEscalafones == 'no docentes' && data[idx][3] != 'H');
  $('#registroModal #dinero').prop('disabled', dineroHabilitado);
  $('#registroModal div:has(> #dinero)').toggle(dineroHabilitado);

  if (btndata[idx].dependdesc) {
    $('#registroModal div:has(> div > #dependencia)').show();
    $('#registroModal #dependencia').text( btndata[idx].dependdesc );
  } else {
    $('#registroModal div:has(> div > #dependencia)').hide();
  }
  // si fue registrado en otra dependencia viene marcado con "noguardar"
  $('#registroModal #submit').attr('disabled', btndata[idx].noguardar == 1);
  $('#registroModal #nopresenta').attr('disabled', btndata[idx].noguardar == 1);
  $('#registroModal #asistencia').attr('disabled', btndata[idx].noguardar == 1);
  $('#registroModal #actuacion').attr('disabled', btndata[idx].noguardar == 1);
  $('#registroModal #licencia').attr('disabled', btndata[idx].noguardar == 1);
  $('#registroModal #dinero').attr('disabled', btndata[idx].noguardar == 1);
  // cargo el radio "tipo"
  $('#registroModal #nopresenta').prop('checked', true);
  $('#registroModal #asistencia').prop('checked', btndata[idx].tipo == 'asistencia');
  $('#registroModal #actuacion').prop('checked', btndata[idx].tipo == 'actuacion');
  // cargo el radio "compensacion"
  if (btndata[idx].comp) {
    $('#registroModal #'+btndata[idx].comp).prop('checked', true);
  } else {
    $('#registroModal #'+(licenciaHabilitada ? 'licencia' : 'dinero')).prop('checked', true);
  }
  if (btndata[idx].noguardar != 1) {
    // desactivo compensación si el tipo es nopresenta
    $('#registroModal input[name=compensacion]').attr('disabled', $('#registroModal input[name=tipo]:checked').val()=='nopresenta');
  }
  // cargo el perid que va oculto
  $('#registroModal').data('perid', btndata[idx].perid);
  // muestro el modal:
  $('#registroModal').modal('show');
});

// Envío del formulario en el modal de la página registro:
$('#registroModal #submit').click(function(e) {
  $('#registroModal button').attr('disabled',true);
  $('#registroModal #submit').html('<span class="fas fa-spinner fa-spin"></span>');
  var param = {
    periodoid:$('#periodoid option:checked').val(),
    perid:$('#registroModal').data('perid'),
    tipo:$('#registroModal input[name=tipo]:checked').val(),
    compensacion:$('#registroModal input[name=compensacion]:checked').val(),
  };
  $.post( 'guardar', param, function(data) {
    if (data.error == '') {
      location.reload();
    } else {
      $('#registroModal #modalMessage').text('ERROR: '+data.error).removeClass('d-none');
      $('#registroModal #submit').text('Guardar');
      $('#registroModal button').attr('disabled',false);
    }
  }, 'json').fail(function(){
    $('#registroModal #modalMessage').text('ERROR: La operación terminó con error').removeClass('d-none');
    $('#registroModal #submit').text('Guardar');
    $('#registroModal button').attr('disabled',false);
  });
});

// desactivo compensación si el tipo es nopresenta
$('#registroModal input[name=tipo]').change(function() {
  $('#registroModal input[name=compensacion]').attr('disabled', $('#registroModal input[name=tipo]:checked').val()=='nopresenta');
});



/**************** periodos ********************/

// La datatable de la página periodos/listado:
$('#periodosListado table.datatable').DataTable({
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

// cargo el modal con los valores de la fila que se quiere editar
$('#periodosListado table.datatable td:first-child').click(function() {
  let myForm = $('#listadoModal form > div');
  let values = $(this);

  // cargo en el form los valores que hay en esta fila de la tabla
  for(let i=0; i<=10; myForm = myForm.next('div'), values = values.next('td'), i++) {
    const formInput = myForm.find('input').first();
    if (formInput.is(':radio')) {
      console.log(formInput.attr('name')+' '+values.text());
      // desselecciono todas las opciones
      myForm.find('input').removeAttr('checked');
      // selecciono el input que tiene el valor correcto
      myForm.find('input[value="'+values.text()+'"]').attr('checked','checked');
    } else {
      formInput.val( values.text() );
    }
  }
  $('#listadoModal form').removeClass('was-validated');
  $('#listadoModal').modal('show');
});

// cargo el modal con valores por defecto para una fila nueva
$('#periodosListado #agregar').click(function() {
  $('#listadoModal input[name=periodoid]').val( '' );
  $('#listadoModal input[name=CompElecDesc]').val( '' );
  $('#listadoModal input[name=CompElecFecha]').val( '' );
  $('#listadoModal input[name=CompElecDesde]').val( '' );
  $('#listadoModal input[name=CompElecHasta]').val( '' );
  $('#listadoModal input[name=CompElecLicenciaEscalafones][value=todos]').attr('checked','checked');
  $('#listadoModal input[name=CompElecLicenciaAsistencia]').val( '2' );
  $('#listadoModal input[name=CompElecLicenciaActuacion]').val( '5' );
  $('#listadoModal input[name=CompElecDineroEscalafones][value=ninguno]').attr('checked','checked');
  $('#listadoModal input[name=CompElecDineroAsistencia]').val( '' );
  $('#listadoModal input[name=CompElecDineroActuacion]').val( '' );

  $('#listadoModal form').removeClass('was-validated');
  $('#listadoModal').modal('show');

});

// Envío del formulario en el modal de la página periodosListado:
$('#listadoModal #submit').click(function(event) {
  console.log($(this));
  console.log($(this).closest('form'));
  $('#listadoModal form').addClass('was-validated');
  if ($('#listadoModal form')[0].checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    $('#listadoModal #modalMessage').text('Debe completar los campos marcados con rojo').removeClass('d-none');
    return;
  }
  $('#listadoModal button').attr('disabled',true);
  $('#listadoModal #submit').html('<span class="fas fa-spinner fa-spin"></span>');
  var param = { };
  let myForm = $('#listadoModal form > div');
  for(let i=0; i<=10; myForm = myForm.next('div'), i++) {
    let formInput = myForm.find('input').first();
    if (formInput.is(':radio')) {
      formInput = myForm.find(':checked');
    }
    param[formInput.attr('name')] = formInput.val();
  }
  $.post( 'guardar', param, function(data) {
    if (data.error == '') {
      location.reload();
    } else {
      $('#listadoModal form').removeClass('was-validated');
      $('#listadoModal #modalMessage').text('ERROR: '+data.error).removeClass('d-none');
      $('#listadoModal #submit').text('Guardar');
      $('#listadoModal button').attr('disabled',false);
    }
  }, 'json').fail(function(){
    $('#listadoModal #modalMessage').text('ERROR: La operación terminó con error').removeClass('d-none');
    $('#listadoModal #submit').text('Guardar');
    $('#listadoModal button').attr('disabled',false);
  });
});
