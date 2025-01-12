
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
const createUser = async(user) => {
    try {
        const response = await fetch(API_user, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        if(!response.ok) {
            throw new Error(`Lỗi`);
        }else{
            document.getElementById('responseMessage').textContent = "Đăng ký thành công!";
            window.location.href = 'login.html'; 
            const data = await response.json();
            return data;
        }
    } catch (error) {
        document.getElementById('errorMessage').textContent = "Lỗi đăng kí!";
        console.error("Error: ", error);
    }
}
const handleCreateUser = async()=>{
    try {
        let registerUser = document.getElementById('registerUser');
        registerUser.onclick = async()=>{
            let username = document.getElementById('username').value;
            console.log(username);
            
            let email = document.getElementById('email').value;
            console.log(email);
            
            let password = document.getElementById('password').value;
            console.log(password);
            
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
            // const emailExist = await checkEmailUser(email);
            // if (emailExist) {
            //     alert('Email đã tồn tại');
            //     return;
            // }
            const user = {
                username: username,
                email: email,
                password: password
            }
            await createUser(user);
        };
    } catch (error) {
        console.log(error);
    }
}
const startFunction = async() => {
    await GetAPIUser();
    await handleCreateUser();
}
startFunction();

