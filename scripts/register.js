 // Constructor de estudiante
 function Student(name, age, g1, g2) {
    this.name = name;
    this.age = age;
    this.g1 = g1;
    this.g2 = g2;
}

// Obtener inputs del HTML
const inputName = document.getElementById("txtName");
const inputAge = document.getElementById("txtAge");
const inputG1 = document.getElementById("txtGrade1");
const inputG2 = document.getElementById("txtGrade2");

// Obtener estudiantes guardados o inicializar arreglo vacío
let students = JSON.parse(localStorage.getItem("students")) || [];

// Registrar nuevo estudiante
function register() {
    if (inputName.value === "") {
        alert("Ingresa el nombre");
        return;
    }

    let newStudent = new Student(inputName.value, inputAge.value, inputG1.value, inputG2.value);

    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();

    // Limpiar los campos de entrada del formulario para que el usuario pueda ingresar nuevos datos
    inputName.value = "";
    inputAge.value = "";
    inputG1.value = "";
    inputG2.value = "";
}

// Mostrar estudiantes en pantalla
function displayStudents() {
    const tbody = document.querySelector("table tbody"); // Selecciona el <tbody>
    tbody.innerHTML = ""; // Limpia la tabla antes de renderizar

    let rows = ""; // Almacena las filas antes de insertarlas

    students.forEach((student, index) => {
        rows += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age ? student.age + ' años' : 'N/A'}</td>
                <td class="text-center">${student.g1 || 'N/A'}</td>
                <td class="text-center">${student.g2 || 'N/A'}</td>
                <td class="text-center">
                    <button onclick="deleteStudent(${index})" class="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar ${student.name}">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.insertAdjacentHTML("beforeend", rows); // Inserta el HTML una sola vez

    // Inicializar tooltips de Bootstrap después de renderizar
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltip => new bootstrap.Tooltip(tooltip));
}

// Eliminar un estudiante
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

// Borrar todos los datos del ls
function clearStorage() {
    localStorage.removeItem("students");
    students = [];
    displayStudents();
}

// Mostrar estudiantes
document.addEventListener("DOMContentLoaded", displayStudents);
