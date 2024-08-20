document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'be9b9f7295d5f005696dec5b3f7d1d63';
    const polygonId = '66c355ac641959eff0d662f8';
    const cloudsMax = '20';

    document.getElementById('fetch-data').addEventListener('click', function() {
        const startDateInput = document.getElementById('start-date').value;
        const endDateInput = document.getElementById('end-date').value;

        if (startDateInput && endDateInput) {
            const startDate = new Date(startDateInput).getTime() / 1000; // Convertir a timestamp UNIX
            const endDate = new Date(endDateInput).getTime() / 1000; // Convertir a timestamp UNIX

            const url = `https://api.agromonitoring.com/agro/1.0/ndvi/history?start=${startDate}&end=${endDate}&polygon_id=${polygonId}&appid=${apiKey}&clouds_max=${cloudsMax}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const ndviContainer = document.getElementById('ndvi-value');
                    ndviContainer.innerHTML = ''; // Limpiar el contenido previo

                    if (data && data.length > 0) {
                        // Ordenar los datos por fecha (dt)
                        data.sort((a, b) => a.dt - b.dt);

                        data.forEach(record => {
                            const ndviValue = record.data.mean.toFixed(2); // Redondear a dos decimales
                            const date = new Date(record.dt * 1000); // Convierte la fecha a formato legible
                            const formattedDate = date.toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            });

                            // Crear y agregar un nuevo elemento para cada registro
                            const recordElement = document.createElement('p');
                            recordElement.textContent = `Valor de NDVI: ${ndviValue} (Fecha: ${formattedDate})`;
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
            document.getElementById('ndvi-value').textContent = "Por favor, selecciona ambas fechas.";
        }
    });
});
