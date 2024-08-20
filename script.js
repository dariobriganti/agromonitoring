<!-- HTML: Input para cargar el archivo JSON -->
<input type="file" id="jsonFileInput" accept=".json">
<button id="uploadButton">Cargar Polígono</button>

<!-- JavaScript -->
<script>
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('jsonFileInput');
    const file = fileInput.files[0];  // Obtener el archivo seleccionado

    if (file) {
        const fileName = file.name.replace('.json', '');  // Obtener el nombre del archivo sin la extensión

        const reader = new FileReader();  // Crear un FileReader
        reader.onload = function(event) {
            const geojsonData = JSON.parse(event.target.result);  // Convertir el contenido del archivo a un objeto JavaScript
            
            // Obtener el valor de "Campo" desde el JSON
            const campoValue = geojsonData.Campo || 'Campo';  // Cambia "Campo" al nombre real de la clave dentro de tu JSON

            const polygonName = `${fileName} - ${campoValue}`;  // Crear el nombre del polígono con "Nombre de archivo - Campo"

            const apiKey = 'be9b9f7295d5f005696dec5b3f7d1d63';
            const url = `https://api.agromonitoring.com/agro/1.0/polygons?appid=${apiKey}`;
            
            // Hacer la solicitud POST a la API de Agromonitoring
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "geo_json": geojsonData,
                    "name": polygonName  // Usar el nombre del polígono generado
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Polígono creado con éxito:', data);
            })
            .catch(error => {
                console.error('Error al crear el políg
