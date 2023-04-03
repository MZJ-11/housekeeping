import axios from 'axios'

export const users = ({ account, realName, recPerPage, page }) => axios({
    url: `/api/admin/users`,
    method: 'post',
    data: {
        account,
        realName,
        recPerPage,
        page
    }
});

export const adduser = ({ account, realName, password, age, phone, sex }) => axios({
    url: `/api/admin/adduser`,
    method: 'post',
    data: {
        account,
        realName,
        password,
        age,
        phone,
        sex
    }
});

export const updateuser = ({ userId, account, realName, password, age, phone, sex }) => axios({
    url: `/api/admin/updateuser`,
    method: 'post',
    data: {
        userId,
        account,
        realName,
        password,
        age,
        phone,
        sex
    }
});

export const deleteuser = (userId) => axios({
    url: `/api/admin/deleteuser`,
    method: 'post',
    data: {
        userId
    }
});





export const postmans = (postmansForm) => axios({
    url: `/api/admin/postmans`,
    method: 'post',
    data: {
        account: postmansForm.account,
        realName: postmansForm.realName,
        page: postmansForm.page,
        recPerPage: postmansForm.recPerPage
    }
});

export const addpostman = (addpostmanForm) => axios({
    url: `api/admin/addpostman`,
    method: 'post',
    data: {
        stationId: addpostmanForm.stationId,
        account: addpostmanForm.account,
        password: addpostmanForm.password,
        realName: addpostmanForm.realName,
        phone: addpostmanForm.phone,
        sex: addpostmanForm.sex,
        roleId: addpostmanForm.roleId
    }
});

export const updatepostman = (updatepostmanForm) => axios({
    url: `api/admin/updatepostman`,
    method: 'post',
    data: {
        postmanId: updatepostmanForm.postmanId,
        stationId: updatepostmanForm.stationId,
        account: updatepostmanForm.account,
        password: updatepostmanForm.password,
        realName: updatepostmanForm.realName,
        phone: updatepostmanForm.phone,
        sex: updatepostmanForm.sex,
        roleId: updatepostmanForm.roleId
    }
});

export const deletepostman = (postmanId) => axios({
    url: `api/admin/deletepostman`,
    method: 'post',
    data: {
        postmanId
    }
});




export const stations = (stationsForm) => axios({
    url: `/api/admin/stations`,
    method: 'post',
    data: {
        account: stationsForm.account,
        realName: stationsForm.realName,
        page: stationsForm.page,
        recPerPage: stationsForm.recPerPage
    }
});

export const station = (stationId) => axios({
    url: `/api/admin/station`,
    method: 'post',
    data: {
        stationId
    }
});

export const addstation = (addstationForm) => axios({
    url: `/api/admin/addstation`,
    method: 'post',
    data: {
        account: addstationForm.account,
        password: addstationForm.password,
        realName: addstationForm.realName,
        phone: addstationForm.phone,
        province: addstationForm.province,
        city: addstationForm.city,
        county: addstationForm.county,
        detail: addstationForm.detail,
        roleId: addstationForm.roleId
    }
});

export const updatestation = (updatestationForm) => axios({
    url: `api/admin/updatestation`,
    method: 'post',
    data: {
        stationId: updatestationForm.stationId,
        account: updatestationForm.account,
        password: updatestationForm.password,
        realName: updatestationForm.realName,
        phone: updatestationForm.phone,
        province: updatestationForm.province,
        city: updatestationForm.city,
        county: updatestationForm.county,
        detail: updatestationForm.detail,
        roleId: updatestationForm.roleId
    }
});

export const deletestation = (stationId) => axios({
    url: `api/admin/deletestation`,
    method: 'post',
    data: {
        stationId
    }
});



export const updateadmin = (updateadminForm) => axios({
    url: `api/admin/updateadmin`,
    method: 'post',
    data: {
        adminId: updateadminForm.adminId,
        account: updateadminForm.account,
        password: updateadminForm.password,
        realName: updateadminForm.realName,
        phone: updateadminForm.phone,
        sex: updateadminForm.sex,
        roleId: updateadminForm.roleId
    }
});