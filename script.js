document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'be9b9f7295d5f005696dec5b3f7d1d63';

    document.getElementById('fetch-data').addEventListener('click', function() {
        const startDateInput = document.getElementById('start-date').value;
        const endDateInput = document.getElementById('end-date').value;
        const polygonId = document.getElementById('polygon-id').value; // Obtener el ID del polígono del campo de entrada
        const maxClouds = document.getElementById('max-cl').value;

        if (startDateInput && endDateInput && polygonId) {
            const startDate = new Date(startDateInput).getTime() / 1000; // Convertir a timestamp UNIX
            const endDate = new Date(endDateInput).getTime() / 1000; // Convertir a timestamp UNIX

            const url = `https://api.agromonitoring.com/agro/1.0/ndvi/history?start=${startDate}&end=${endDate}&polygon_id=${polygonId}&appid=${apiKey}&clouds_max=${maxClouds}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const ndviContainer = document.getElementById('ndvi-value');
                    ndviContainer.innerHTML = ''; // Limpiar el contenido previo

                    if (data && data.length > 0) {
                        data.sort((a, b) => a.dt - b.dt);

                        data.forEach(record => {
                            const ndviValue = record.data.mean.toFixed(2); // Redondear a dos decimales
                            //const cloudiness = (record.cl).toFixed(1); // Convertir de 0-100 a 0-1 y redondear a dos decimales
                            const cloudiness = record.cl.toFixed(1); // Redondear a un decimal sin cambiar el rango.
                            const date = new Date(record.dt * 1000); // Convierte la fecha a formato legible
                            const formattedDate = date.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });

                            const recordElement = document.createElement('p');
                            recordElement.textContent = `Valor de NDVI: ${ndviValue} (Nubosidad: ${cloudiness}) (Fecha: ${formattedDate})`;
                            ndviContainer.appendChild(recordElement);
                        });
                    } else {
                        ndviContainer.textContent = "No se encontraron datos de NDVI para las fechas seleccionadas.";
                    }
                })
                .catch(error => {
                    document.getElementById('ndvi-value').textContent = "Error al obtener datos de NDVI.";
                    console.error('Error en la conexión:', error);
                });
        } else {
            document.getElementById('ndvi-value').textContent = "Por favor, completa todos los campos.";
        }
    });
});
