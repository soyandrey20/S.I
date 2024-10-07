import { url } from '../../config.js';


// Función para cargar los datos desde el backend y renderizar el gráfico
async function renderGenderChart() {
    try {
        // Solicitar los datos de género al endpoint
        const response = await fetch(`${url}/genero`);
        const data = await response.json();


        // Extraer los géneros y cantidades
        const labels = data.map(item => item.genero); // Ejemplo: ["Hombre", "Mujer"]
        const series = data.map(item => item.total);  // Ejemplo: [30, 20]
       
        
        // Configurar el gráfico de torta
        var genderOptions = {
            chart: { type: 'pie', height: '200px' },
            series: series,  // Los valores obtenidos del backend
            labels: labels,   // Etiquetas obtenidas del backend
           
 

        };

        var genderChart = new ApexCharts(document.querySelector("#gender-chart"), genderOptions);
        genderChart.render();

    } catch (err) {
        console.error("Error al cargar el gráfico de género: ", err);
    }
}

// Llamar a la función para cargar los datos y renderizar el gráfico
renderGenderChart();


// Función para cargar los datos desde el backend y renderizar el gráfico
async function renderAgeChart() {
    try {
        // Solicitar los datos de edad al endpoint
        const response = await fetch(`${url}/edad`);
        const data = await response.json();

        // Extraer las edades y cantidades
        const labels = data.map(item => item.edad); // Ejemplo: ["18-25", "26-35"]
        const series = data.map(item => item.total);  // Ejemplo: [30, 20]

        // Configurar el gráfico de barras
        var ageOptions = {
            chart: { type: 'bar', height: '200px' },
            series: [{ data: series }],  // Los valores obtenidos del backend
            xaxis: { categories: labels } // Etiquetas obtenidas del backend
        };

        var ageChart = new ApexCharts(document.querySelector("#age-chart"), ageOptions);
        ageChart.render();

    } catch (err) {
        console.error("Error al cargar el gráfico de edad: ", err);
    }
}

// Llamar a la función para cargar los datos y renderizar el gráfico
renderAgeChart();
async function renderExpensesChart() {
    try {
        const response = await fetch(`${url}/gastos-anuales`);
        const data = await response.json();

        // Extraer las etiquetas de los meses y las series de gastos reales y previstos
        const labels = data.map(item => item.Mes);  // Ejemplo: ['Enero', 'Febrero', 'Marzo', ...]
        const realExpenses = data.map(item => item.GastoReal || 0);  // Reemplazar nulos con 0
        const plannedExpenses = data.map(item => item.GastoPrevisto || 0);  // Reemplazar nulos con 0

        // Configurar el gráfico de línea
        var lineOptions = {
            chart: { type: 'line', height: '250px' },
            series: [
                { name: 'Gasto Real', data: realExpenses },
                { name: 'Gasto Previsto', data: plannedExpenses }
            ],
            xaxis: { categories: labels },
            yaxis: { title: { text: 'Monto en COP' } }
        };

        var expensesChart = new ApexCharts(document.querySelector("#expenses-chart"), lineOptions);
        expensesChart.render();

    } catch (err) {
        console.error("Error al cargar el gráfico de gastos: ", err);
    }
}

renderExpensesChart();

// Función para cargar los datos desde el backend y renderizar el gráfico de nivel de estudios
async function renderEducationChart() {
    try {
        // Solicitar los datos de nivel de estudios al endpoint
        const response = await fetch(`${url}/nivel-estudios`);
        const data = await response.json();
        console.log(response);
        // Extraer los niveles de estudios y cantidades
        const labels = data.map(item => item.nivelEducacion); // Ejemplo: ["Secundaria", "Universitario"]
        const series = data.map(item => item.total);  // Ejemplo: [30, 20]

        // Configurar el gráfico de dona
        var educationOptions = {
            chart: { type: 'donut', height: '200px' },
            series: series,  // Los valores obtenidos del backend
            labels: labels   // Etiquetas obtenidas del backend
        };

        var educationChart = new ApexCharts(document.querySelector("#education-chart"), educationOptions);
        educationChart.render();

    } catch (err) {
        console.error("Error al cargar el gráfico de nivel de estudios: ", err);
    }
}

// Llamar a la función para cargar los datos y renderizar el gráfico
renderEducationChart();