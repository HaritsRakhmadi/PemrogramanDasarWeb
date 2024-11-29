// for close and add button
function addFunc(){
    //console.log("Add button clicked!");
    const overlayForm = document.querySelector('.overlayForm');
    overlayForm.classList.add('activeForm');

}

function closeFunc(){
    const overlayForm = document.querySelector('.overlayForm');
    overlayForm.classList.remove('activeForm');

}


//for  form check


document.querySelector('form').addEventListener ('submit', function (e) {
    e.preventDefault();

    const npmInput= document.querySelector('input[name = "NPMMahasiswa"]'); // name yg dibaca sama sisi server
    const nameInput = document.querySelector('input[name = "NamaMahasiswa"]');
    const emailInput = document.querySelector('input[name = "EmailMahasiswa"]');
    const alamatInput = document.querySelector('input[name="alamatMahasiswa"]');


    const npm = npmInput.value.trim();
    const name = nameInput.value.trim(); 
    const email = emailInput.value.trim();
    const alamat = alamatInput.value.trim();

    const npmPattern = /^\d+$/;
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!npmPattern.test(npm)){
        alert('Invalid NPM');
        npmInput.focus();
        return;
    }
    
    if (!namePattern.test(name)){
        alert('Invalid Nama');
        nameInput.focus();
        return;
    }

    if (!emailPattern.test(email)){
        alert('Invalid Email');
        emailInput.focus();
        return;
    }

    if(rowBeingEdited){
        rowBeingEdited.cells[0].textContent = npm;
        rowBeingEdited.cells[1].textContent = name
        rowBeingEdited.cells[2].textContent = email
        rowBeingEdited.cells[3].textContent = alamat
        rowBeingEdited = null;
    } else {
        addStudent(npm, name, email, alamat);
    }

    alert('Form submitted successfully!');
    this.reset();
    closeFunc();
});



//add student function

const addStudent = function(npm, name, email, alamat){
    const newStudents = document.querySelector(".table-container table");
    const newRow = newStudents.insertRow(newStudents.rows.length - 1);

    newRow.innerHTML = 
    `
        <td>${npm}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${alamat}</td>
        <td>
            <label>
                <input type="radio" name="presentOrNot${npm}" value="hadir">
                ✅ Hadir
            </label>
            <label>
                <input type="radio" name="presentOrNot${npm}" value="absen">
                ❌ Absen
            </label>
        </td>
        <td>
            <Label>
                <input type="button" id="editBtn" onclick="editFunc(this)">Edit
            </Label>
            <Label>
                <input type="button" id="deleteBtn" onclick="deleteFunc(this)">Delete
            </Label>
        </td>
    `
};

//for edit button
let rowBeingEdited = null;

const editFunc = function(button){
    addFunc();

    const editRow = button.closest('tr');
    rowBeingEdited = editRow;

    const currentNPM = editRow.cells[0].textContent.trim();
    const currentName = editRow.cells[1].textContent.trim();
    const currentEmail = editRow.cells[2].textContent.trim();
    const currentAlamat = editRow.cells[3].textContent.trim();

    document.querySelector('input[name = "NPMMahasiswa"]').value = currentNPM;   
    document.querySelector('input[name = "NamaMahasiswa"]').value = currentName;
    document.querySelector('input[name = "EmailMahasiswa"]').value = currentEmail;
    document.querySelector('input[name = "alamatMahasiswa"]').value = currentAlamat;
  
};



//for delete button

const deleteFunc = function(button){
    const deleteRow = button.closest('tr');
    deleteRow.remove();
};