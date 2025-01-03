document.addEventListener("DOMContentLoaded", () => {
    const employeeList = document.getElementById("employeeList");
    const searchBar = document.getElementById("searchBar");
    const filterDesignation = document.getElementById("filterDesignation");
    const clearFilter = document.getElementById("clearFilter");
    const printButton = document.getElementById("printButton");

    const renderEmployees = (employees) => {
        employeeList.innerHTML = "";
        employees.forEach((emp, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.contact}</td>
                <td>${emp.designation}</td>
                <td>${emp.presentAddress}</td>
                <td>${emp.permanentAddress}</td>
                <td>${emp.bloodGroup}</td>
                <td>${emp.joiningDate}</td>
                <td><button class="delete" data-index="${index}">Delete</button></td>
            `;
            employeeList.appendChild(row);
        });
    };

    const loadEmployees = () => {
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        renderEmployees(employees);
    };

    employeeList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            const employees = JSON.parse(localStorage.getItem("employees")) || [];
            employees.splice(index, 1);
            localStorage.setItem("employees", JSON.stringify(employees));
            loadEmployees();
        }
    });

    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const filtered = employees.filter(
            (emp) =>
                emp.name.toLowerCase().includes(query) ||
                emp.id.toLowerCase().includes(query)
        );
        renderEmployees(filtered);
    });

    filterDesignation.addEventListener("change", () => {
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        const designation = filterDesignation.value;
        const filteredEmployees = designation
            ? employees.filter((emp) => emp.designation === designation)
            : employees;

        renderEmployees(filteredEmployees);
    });

    clearFilter.addEventListener("click", () => {
        searchBar.value = "";
        filterDesignation.value = "";
        loadEmployees();
    });

    printButton.addEventListener("click", () => {
        const printContents = document.querySelector("table").outerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = `<html><head><title>Print Employee List</title></head><body>${printContents}</body></html>`;
        window.print();
        document.body.innerHTML = originalContents;
        location.reload();
    });

    loadEmployees();
});
