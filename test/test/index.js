class BenhVien {
    constructor(tenBenhVien,diaChi,dienThoai){
        this._tenBenhVien= tenBenhVien
        this._diaChi= diaChi
        this._dienThoai=dienThoai
    }
}


class PhongKham  extends BenhVien{
    constructor(tenBenhVien,diaChi,dienThoai,tenPhongKham,bacSy,diaChiPK){
        super(tenBenhVien,diaChi,dienThoai)
        this._tenPhongKham=tenPhongKham
        this._bacSy=bacSy
        this._diaChiPK=diaChiPK
    }

}

const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)



const API_CLINIC="http://localhost:3000/clinic"

const getApiClinic=async()=>{
    try {
        const response= await fetch(API_CLINIC)
        if(!response.ok){
            throw new Error("Error API")
        }else{
            const data  = await response.json()            
            return data
        }
    } catch (error) {
        console.log(error);
        
    }
}


const start=async()=>{
    try {
        await getApiClinic()
        await renderApiClinic()
        await handlerAddApiClinic()
    } catch (error) {
        console.log(error);
        
    }
}

start()


const renderApiClinic=async()=>{
    try {
        const getApi= await getApiClinic()
        let renderHtmls= getApi.map((info)=>{
            return `
                            <tr class="data-item-${info.id}">
                                <td class="name_clinic_update">${info.name_clinic}</td>
                                <td class="doctoc_hospital_update">${info.doctoc_hospital}</td>
                                <td class="address_clinic_update">${info.address_clinic}</td>
                                <td>
                                    <div class="content__show__info___btn-diff">
                                        <button onclick="updateApi(${info.id})" class="content__show__info___btn-diff__update">Sửa</button>
                                        <button onclick="deteleApi(${info.id})" class="content__show__info___btn-diff__delete">Xóa</button>
                                    </div>
                                </td>
                            </tr>
            `
        })
        
        let html= renderHtmls.join('')
        $('tbody').innerHTML=html


    } catch (error) {
        console.log(error);
        
    }
}


const addApiClinic=async(data)=>{
    try {
        const my_obj_add= {
            method:"post",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(data)
        }
        const response= await fetch(API_CLINIC,my_obj_add)
        if(!response.ok){
            throw new Error("Error API")
        }else{
            const data= await response.json()
            return data
        }
    } catch (error) {
        console.log(error);
        
    }
}

const handlerAddApiClinic=async()=>{
    try {
        $('#js-add-clinic').onclick=async(e)=>{
            alert("Đã thêm thành công")
            e.preventDefault()
            let name_hospital= $('#js-name-hospital')
            let address_hospital= $('#js-address-hospital')
            let phone_hospital= $('#js-phone-hospital')
            let name_clinic= $('#js-name-clinic')
            let doctoc_hospital= $('#js-doctoc')
            let address_clinic= $('#js-address-clinic')
            const data={
                name_hospital:name_hospital.value.trim(),
                address_hospital:address_hospital.value.trim(),
                phone_hospital:phone_hospital.value.trim(),
                name_clinic:name_clinic.value.trim(),
                doctoc_hospital:doctoc_hospital.value.trim(),
                address_clinic:address_clinic.value.trim(),
            }
            await addApiClinic(data)
        }
    } catch (error) {
        console.log(error);
        
    }
}



const deteleApi=async(id)=>{
    alert("Xóa thành công")
    try {
        const my_obj_delete={
            method:"delete",
        }
        const response= await fetch(API_CLINIC+"/" +id,my_obj_delete)
        if(!response.ok){
            throw new Error("API Error");
            
        }else{
            const data=await response.json()
            return data
        }
        
    } catch (error) {
        console.log(error);
    }
}


const updateApiClinic=async(id,new_data,render)=>{
    try {
        const my_obj_update={
            method:"put",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(new_data)
        }
        const response= await fetch(API_CLINIC+"/"+id,my_obj_update)
        if(!response.ok){
            throw new Error("API error");
        }else{
            const data= await response.json()
            return data
        }
    } catch (error) {
        console.log(error);
    }
}

const updateApi=async(id)=>{
    try {
        const allForm= $('.data-item-'+id)
        const name_clinic_update= $('#js-name-clinic')
        const doctoc_hospital_update= $('#js-doctoc')
        const address_clinic_update= $('#js-address-clinic')
        const name_clinic_update_text= allForm.querySelector('.name_clinic_update').innerText
        const doctoc_hospital_update_text= allForm.querySelector('.doctoc_hospital_update').innerText
        const address_clinic_update_text= allForm.querySelector('.address_clinic_update').innerText        
        $('.update-clinic').style.display=`block`
        $('#js-add-clinic').style.display=`none`
        name_clinic_update.value=name_clinic_update_text
        doctoc_hospital_update.value=doctoc_hospital_update_text
        address_clinic_update.value=address_clinic_update_text
        $('#js-update-clinic').onclick=async()=>{
            alert("Cập nhật thành công")
            let new_data={
                name_clinic:name_clinic_update.value.trim(),
                doctoc_hospital:doctoc_hospital_update.value.trim(),
                address_clinic:address_clinic_update.value.trim(),
            }
            await updateApiClinic(id,new_data,()=>{
                name_clinic_update.value=""
                doctoc_hospital_update.value=""
                address_clinic_update.value=""
            })
        }
    } catch (error) {
        console.log(error);
        
    }
}