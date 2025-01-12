let getAPIStudents = 'http://localhost:3000/students';

const getAPI = async () => {
    try {
        const response = await fetch(getAPIStudents);
        if (!response.ok) {
            throw new Error('Lỗi');
        }else{
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}
const start = async () =>{
    await getAPI();
    await renderStudent();
    await handleCreateStudent();
    await deleteStudent();
    await updateStudent();
}
start();
const renderStudent = async () => {
    try {
        let dataStudents = await getAPI();
        let getStudents = dataStudents.map(item => {
        return `<tr class = "id-item-${item.id}">
                        <td class="NameUpdate">${item.Name}</td>
                        <td class="AgeUpdate">${item.Age}</td>
                        <td class="GenderUpdate">${item.Gender}</td>
                        <td class="ClassUpdate">${item.Class}</td>
                        <td><i onclick="deleteStudent(${item.id})" class="fa-solid fa-trash"></i> | <i onclick="updateStudent(${item.id})" class="fa-solid fa-pen-to-square"></i></td>
                        </tr>`;
                        // <td class="AcaperUpdate">${item.AcaPer}</td>
                    }).join('');
        document.getElementById('show_students').innerHTML = getStudents;
    } catch (error) {
        console.log(error);
        
    }

};

// tạo dữ liệu
const createStudents = async (data) => {
    try {
        let optionsCreate = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        }
        const response =  await fetch(getAPIStudents,optionsCreate)
        if (!response.ok) {
            throw new Error('Lỗi');
        }else{
            const data  = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
        
    }
}
// Thêm dữ liệu
const handleCreateStudent = async() =>{
    try {
        let createBtn = document.getElementById('created-students');
        createBtn.onclick = async () => {
            let Name = document.querySelector('input[name="name"]');
            let Age = document.querySelector('input[name="age"]');
            let Gender = document.querySelector('input[name="gender"]');
            let Class = document.querySelector('input[name="class"]');
            let AcaPer = document.querySelector('input[name="acaper"]');
            const data = {
                Name: Name.value.trim(),
                Age: Age.value.trim(),
                Gender: Gender.value.trim(),
                Class: Class.value.trim(),
                AcaPer: AcaPer.value.trim()
            }
            await createStudents(data);
        }
    } catch (error) {
        console.log(error);
        
    }
}
// xóa dữ liệu
const deleteStudent = async(id) => {
    try {
            console.log(id);
            const optionsDelete = {
                method: 'DELETE',
            }
            // const response = await fetch(getAPIStudents+ "/" + id, optionsDelete);
            if (!response.ok) {
                throw new Error('Lỗii');
            }else{
                const data = await response.json();
                return data;
            }
    } catch (error) {
        console.log(error);
    }
}
const updateStudents = async(id,newData,render) =>{
    try {
        const optionsUpdate = {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        };
        const response = await fetch(getAPIStudents+ "/" + id, optionsUpdate);
        if (!response.ok) {
            throw new Error('Lỗi');
        }else{
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
        
    }
}
const updateStudent = async(id) =>{
    try {    
        const getForm = document.querySelector('.id-item-'+id);
        const NameUpdate = document.querySelector('input[name="name"]');
        const AgeUpdate = document.querySelector('input[name="age"]');
        const GenderUpdate = document.querySelector('input[name="gender"]');
        const ClassUpdate = document.querySelector('input[name="class"]');
        // const AcaPerUpdate = document.querySelector('input[name="acaper"]');
    
        const NameUpdate_text = getForm.querySelector('.NameUpdate').innerText;
        const AgeUpdate_text = getForm.querySelector('.AgeUpdate').innerText;
        const GenderUpdate_text = getForm.querySelector('.GenderUpdate').innerText;
        const ClassUpdate_text = getForm.querySelector('.ClassUpdate').innerText;
        // const AcaPerUpdate_text = getForm.querySelector('.AcaPerUpdate').innerText;
        document.querySelector('#created-students').style.display = 'none';
        document.querySelector('#edit-students').style.display = 'block';
        NameUpdate.value = NameUpdate_text;
        AgeUpdate.value = AgeUpdate_text;
        GenderUpdate.value = GenderUpdate_text;
        ClassUpdate.value = ClassUpdate_text;
        // AcaPerUpdate.value = AcaPerUpdate_text;
        document.querySelector('#edit-students').onclick = async() =>{
            alert('Succesfuly');
            let newData = {
                Name: NameUpdate.value.trim(),
                Age: AgeUpdate.value.trim(),
                Gender: GenderUpdate.value.trim(),
                Class: ClassUpdate.value.trim(),
                // AcaPer: AcaPerUpdate.value.trim()
            }
            await updateStudents(id, newData,()=>{
                NameUpdate.value = "";
                AgeUpdate.value = "";
                GenderUpdate.value = "";
                ClassUpdate.value = "";
                // AcaPerUpdate.value = "";
            });
        }
        // console.log(id);
        
    } catch (error) {
        console.log(error);
        
    }
}
