import { checkLogin } from "../service/accountService";

export function login(loginInfo) {
    return async (dispatch) => {
        const account = await checkLogin(loginInfo);
        if (account !== null) {
            localStorage.setItem('userAccount', JSON.stringify(account));
            sessionStorage.setItem('userAccount', JSON.stringify(account));
            // Lưu vào localStorage
            dispatch({
                type: "LOGIN",
                payload: account
            });
            console.log("login thành công");
            return true;
        } else {
            console.log("Login không thành công");
            return false;
        }
    };
}

export function logout() {
    localStorage.removeItem("userAccount");
    // Xóa khỏi localStorage khi đăng xuất
    return {
        type: "LOGOUT",
        payload: null
    };
}