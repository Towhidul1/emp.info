document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myform");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submitted");

        // Collect form data
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const id = document.getElementById("ID").value.trim();
        const designation = document.getElementById("designation").value;
        const presentAddress = document.getElementById("p.add").value.trim();
        const permanentAddress = document.getElementById("Pm-address").value.trim();
        const bloodGroup = document.getElementById("bg").value.trim();
        const joiningDate = document.getElementById("joining-date").value;

        // Validate form data
        if (!name || !id || !joiningDate) {
            alert("Please fill in all required fields!");
            return;
        }

        // Save data (simulate saving or save to local storage)
        const employeeData = {
            id,
            name,
            contact,
            designation,
            presentAddress,
            permanentAddress,
            bloodGroup,
            joiningDate,
        };

        let employeeList = JSON.parse(localStorage.getItem("employees")) || [];
        employeeList.push(employeeData);
        localStorage.setItem("employees", JSON.stringify(employeeList));

        // Show success message
        alert("Employee added successfully!");

        // Clear form
        form.reset(); // Reset the form fields
        console.log("Form cleared");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const contactInput = document.getElementById("contact");

    contactInput.addEventListener("input", () => {
        if (contactInput.value.length === 11) {
            contactInput.style.color = ""; // Reset text color
            contactInput.setCustomValidity(""); // Clear validation message
        } else {
            contactInput.style.color = "red"; // Set text color to red
            contactInput.setCustomValidity("Contact number must be exactly 11 digits.");
            contactInput.reportValidity(); // Show validation message
        }
    });
});
