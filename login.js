
const GetAPIUser = async() =>{
    const API_user = 'http://localhost:3000/user';
    
    
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

document.getElementById('loginButton').addEventListener('click',async(e)=>{
    console.log('adad');
    e.preventDefault();
    try{
        let user = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        
        let getUserAPI = await GetAPIUser(); 
        console.log(getUserAPI);
        let a = getUserAPI.some(item => {
            return item.username === user && item.password === password
        })
        if(a){
            alert('Đăng nhập thành công');
            window.location.href = "index.html";
        }else{
            alert("Tài khoản hoặc mật khẩu không đúng")
        }
        console.log(a);
        
    }catch (error) {
        console.log(error);
    }
})


