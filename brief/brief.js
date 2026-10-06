// Arma el mensaje con las respuestas y abre WhatsApp. No se guarda nada en ningún servidor.
(function () {
  var WHATSAPP = '5491126921627';
  var $ = function (id) { return document.getElementById(id); };
  var valor = function (id) { return $(id).value.trim(); };

  $('brief').addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    [['nombre', 'errNombre'], ['negocio', 'errNegocio']].forEach(function (par) {
      var falta = !valor(par[0]);
      $(par[1]).classList.toggle('ver', falta);
      if (falta && ok) { $(par[0]).focus(); ok = false; }
    });
    if (!ok) return;

    var tipo = document.querySelector('input[name=tipo]:checked');
    var tiene = Array.prototype.map.call(document.querySelectorAll('input[name=tiene]:checked'), function (c) { return c.value; });
    var lineas = [
      '¡Hola Franco! Te paso mi proyecto:',
      '',
      '*Nombre:* ' + valor('nombre'),
      '*Negocio:* ' + valor('negocio')
    ];
    var agregar = function (titulo, texto) { if (texto) lineas.push('*' + titulo + ':* ' + texto); };
    agregar('Rubro', valor('rubro'));
    agregar('Redes / web', valor('redes'));
    agregar('Necesito', tipo ? tipo.value : '');
    agregar('Productos', valor('cantidad'));
    agregar('Objetivo', valor('objetivo'));
    agregar('Ya tengo', tiene.join(', '));
    agregar('Me gusta', valor('gusta'));
    agregar('Para cuándo', valor('cuando'));
    agregar('Además', valor('extra'));

    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lineas.join('\n')), '_blank', 'noopener');
  });
})();
