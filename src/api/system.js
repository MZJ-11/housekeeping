import axios from 'axios'


export const login = (loginForm) => axios({
    url: `/api/system/login`,
    method: 'post',
    data: {
        nickname: loginForm.nickname,
        password: loginForm.password,
    }
});

export const register = (registerForm) => axios({
    url: `/api/system/register`,
    method: 'post',
    data: {
        nickname: registerForm.nickname,
        password: registerForm.password,
        name: registerForm.name,
        phone: registerForm.phone,
    }
});

export const companys = (companysForm) => axios({
    url: `/api/system/companys`,
    method: 'post',
    data: {
        city: companysForm.city,
        county: companysForm.county,
        street: companysForm.street,
        lowPrice: companysForm.lowPrice,
        highPrice: companysForm.highPrice,
        companyName: companysForm.companyName,
        page: companysForm.page,
        recPerpage: companysForm. recPerpage,
    }
});

export const updateuser = (updateuserForm) => axios({
    url: `/api/system/updateuser`,
    method: 'post',
    data: {
        userId: updateuserForm.userId,
        userNickname: updateuserForm.userNickname,
        userName: updateuserForm.userName,
        userPhone: updateuserForm.userPhone,
        userPassword: updateuserForm.userPassword,
    }
});


export const companyworkerswithoutpage = (companyId) => axios({
    url: `/api/system/companyworkerswithoutpage`,
    method: 'post',
    data: {
        companyId
    }
});



export const companyworkers = (companyworkersForm) => axios({
    url: `/api/system/companyworkersForm`,
    method: 'post',
    data: {
        companyId: companyworkersForm.companyId,
        page: companyworkersForm.page,
        recPerPage: companyworkersForm.recPerPage,
    }
});

export const addworker = (addworkerForm) => axios({
    url: `/api/system/addworker`,
    method: 'post',
    data: {
        companyId: addworkerForm.companyId,
        workerNickname: addworkerForm.workerNickname,
        workerName: addworkerForm.workerName,
        workerPhone: addworkerForm.workerPhone,
        workerPassword: addworkerForm.workerPassword,
    }
});

export const updateworkerwithstatus = (updateworkerwithstatusForm) => axios({
    url: `/api/system/updateworkerwithstatus`,
    method: 'post',
    data: {
        workerId: updateworkerwithstatusForm.workerId,
        workerNickname: updateworkerwithstatusForm.workerNickname,
        workerName: updateworkerwithstatusForm.workerName,
        workerPhone: updateworkerwithstatusForm.workerPhone,
        workerPassword: updateworkerwithstatusForm.workerPassword,
        workerStatus: updateworkerwithstatusForm.workerStatus,
    }
});

export const deleteworker = (workerId) => axios({
    url: `/api/system/deleteworker`,
    method: 'post',
    data: {
        workerId
    }
});


export const updatecompany = (updatecompanyForm) => axios({
    url: `/api/system/updatecompany`,
    method: 'post',
    data: {
        companyId: updatecompanyForm.companyId,
        companyNickname: updatecompanyForm.companyNickname,
        companyPassword: updatecompanyForm.companyPassword,
        companyPhone: updatecompanyForm.companyPhone,
        companyCity: updatecompanyForm.companyCity,
        companyName: updatecompanyForm.companyName,
        companyCounty: updatecompanyForm.companyCounty,
        companyStreet: updatecompanyForm.companyStreet,
        companyDetail: updatecompanyForm.companyDetail,
        companyPrice: updatecompanyForm.companyPrice,
    }
});

export const updateworker = (updateworkerForm) => axios({
    url: `/api/system/updateworker`,
    method: 'post',
    data: {
        workerId: updateworkerForm.workerId,
        workerNickname: updateworkerForm.workerNickname,
        workerName: updateworkerForm.workerName,
        workerPhone: updateworkerForm.workerPhone,
        workerPassword: updateworkerForm.workerPassword,
    }
});

export const users = (usersForm) => axios({
    url: `/api/system/users`,
    method: 'post',
    data: {
        page: usersForm.page,
        recPerPage: usersForm.recPerPage,
    }
});

export const adduser = (adduserForm) => axios({
    url: `/api/system/adduser`,
    method: 'post',
    data: {
        userNickname: adduserForm.userNickname,
        userName: adduserForm.userName,
        userPhone: adduserForm.userPhone,
        userPassword: adduserForm.userPassword,
    }
});


export const updateuserwithstatus = (updateuserwithstatusForm) => axios({
    url: `/api/system/updateuserwithstatus`,
    method: 'post',
    data: {
        userId: updateuserwithstatusForm.userId,
        userNickname: updateuserwithstatusForm.userNickname,
        userName: updateuserwithstatusForm.userName,
        userPhone: updateuserwithstatusForm.userPhone,
        userPassword: updateuserwithstatusForm.userPassword,
        userStatus: updateuserwithstatusForm.userStatus,
    }
});


export const deleteuser = (userId) => axios({
    url: `/api/system/deleteuser`,
    method: 'post',
    data: {
        userId
    }
});


export const companysbymatching = (companysbymatchingForm) => axios({
    url: `/api/system/companysbymatching`,
    method: 'post',
    data: {
        page: companysbymatchingForm.page,
        recPerPage: companysbymatchingForm.recPerPage,
    }
});


export const addcompany = (addcompanyForm) => axios({
    url: `/api/system/addcompany`,
    method: 'post',
    data: {
        companyNickname: addcompanyForm.companyNickname,
        companyPassword: addcompanyForm.companyPassword,
        companyPhone: addcompanyForm.companyPhone,
        companyName: addcompanyForm.companyName,
        companyCity: addcompanyForm.companyCity,
        companyCounty: addcompanyForm.companyCounty,
        companyStreet: addcompanyForm.companyStreet,
        companyDetail: addcompanyForm.companyDetail,
        companyPrice: addcompanyForm.companyPrice,
    }
});


export const updatecompanywithstatus = (updatecompanywithstatusForm) => axios({
    url: `/api/system/updatecompanywithstatus`,
    method: 'post',
    data: {
        companyId: updatecompanywithstatusForm.companyId,
        companyNickname: updatecompanywithstatusForm.companyNickname,
        companyPassword: updatecompanywithstatusForm.companyPassword,
        companyPhone: updatecompanywithstatusForm.companyPhone,
        companyName: updatecompanywithstatusForm.companyName,
        companyStatus: updatecompanywithstatusForm.companyStatus,
        companyCity: updatecompanywithstatusForm.companyCity,
        companyCounty: updatecompanywithstatusForm.companyCounty,
        companyStreet: updatecompanywithstatusForm.companyStreet,
        companyDetail: updatecompanywithstatusForm.companyDetail,
        companyPrice: updatecompanywithstatusForm.companyPrice,
    }
});

export const deletecompany = (companyId) => axios({
    url: `/api/system/deletecompany`,
    method: 'post',
    data: {
        companyId
    }
});


export const workers = (workersForm) => axios({
    url: `/api/system/workers`,
    method: 'post',
    data: {
        page: workersForm.page,
        recPerPage: workersForm.recPerPage,
    }
});

export const companyswithoutpage = () => axios({
    url: `/api/system/companyswithoutpage`,
    method: 'post',
    data: {

    }
});

export const updateadmin = (updateadminForm) => axios({
    url: `/api/system/updateadmin`,
    method: 'post',
    data: {
        adminId: updateadminForm.adminId,
        adminNickname: updateadminForm.adminNickname,
        adminName: updateadminForm.adminName,
        adminPassword: updateadminForm.adminPassword,
    }
});