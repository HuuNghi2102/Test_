
const API_user = 'http://localhost:3000/user';
const GetAPIUser = async() =>{
    try {
        const response = await fetch(API_user);

        if (!response.ok) {
            throw new Error('Lỗi');
        }else{
            const data = await response.json();
            return data;
        }
    }
    catch(error) {
        console.log(error);
    }
}

const startFunction = async() => {
    await GetAPIUser();
    await checkEmailUser();
}
startFunction();

const checkUsername = (username)=>{
    const regex = /^[a-zA-Z]{5,}$/;
    return regex.test(username);
}
const checkEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
const checkPassword = (password)=>{
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return regex.test(password);
}
//Hàm kiểm tra email tồn tại
const checkEmailUser = async(emailUser) => {
    try {
        const emailUser = await fetch(API_user); 
        let getEmail =  emailUser.some((item) =>{
            return item.email === email
        })
    } catch (error) {
        console.log(error);
    }
}
async function register(e){
    // e.preventDefault();
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
    const emailExist = await checkEmailUser(email);
    if (emailExist) {
        alert('Email đã tồn tại');
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
        const data = await response.json();
        if(response.ok) {
            document.getElementById('responseMessage').textContent = "Đăng ký thành công!";
            window.location.href = 'login.html'; 
        }else{
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = "Lỗi đăng kí!";
        console.error("Error: ", error);
    }
}


