document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const textarea = document.getElementById('observaciones');

    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = encodeURIComponent(document.getElementById('nombre').value);
            const correo = encodeURIComponent(document.getElementById('correo').value);
            const tipo = encodeURIComponent(document.getElementById('tipo_bebida').value);
            const tamano = encodeURIComponent(document.querySelector('input[name="tamano"]:checked')?.value || 'pequeno');
            const cantidad = encodeURIComponent(document.getElementById('cantidad').value);
            const llevar = document.getElementById('llevar').checked ? 'Si' : 'No';
            const observaciones = encodeURIComponent(textarea ? textarea.value : '');

            window.location.href = `resumen.html?nombre=${nombre}&correo=${correo}&tipo=${tipo}&tamano=${tamano}&cantidad=${cantidad}&llevar=${llevar}&observaciones=${observaciones}`;
        });
    }
});