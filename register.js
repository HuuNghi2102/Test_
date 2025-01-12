
// const GetAPIUser = async() =>{
//     const API_user = 'http://localhost:3000/user';
    
    
//     try {
//         const response = await fetch(API_user);

//         if (!response.ok) {
//             throw new Error('Lỗi');
//         }else{
//             const data = await response.json();
//             return data;
//         }
//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// startFunction = async() => {
//     await GetAPIUser();
//     await checkEmail();
// }

checkUsername = (username)=>{
    const regex = /^[a-zA-Z]{5,}$/;
    return regex.test(username);
}
checkEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
checkPassword = (password)=>{
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return regex.test(password);
}
//Hàm kiểm tra email tồn tại
checkEmailUser = async(email) => {
    try {
        const emailUser = await fetch(API_user);
        let getEmail =  emailUser.some((item) =>{
            return item.email === email
        })
        if(getEmail){
        alert('Email đã tồn tại');
        return;
    }
    } catch (error) {
        console.log(error);
    }
}
async function register(){
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!checkUsername(username)){
        alert('Tên phải dài hơn 4 ký tự, không có số, dấu, hoặc khoảng cách')
        console.log(username);
        return;
    }
    if (!checkEmail(email)){
        alert('Email không hợp lệ');
        console.log(email);
        
        return;
    }
    if (!checkPassword(password)){
        alert('Mật khẩu phải dài hơn 5 ký tự, phải chứa ít nhất một ký tự in hoa, một số, và một ký tự đặc biệt');
        console.log(password);
        return;
    }


    const user = {
        username: username,
        email: email,
        password: password
    }
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // document.getElementById('responseMessage').innerText = "";
        alert('aaa')
    } catch (error) {
        document.getElementById('errorMessage').textContent = "Lỗi đăng kí!";
        console.error("Error: ", error);
    }
}


