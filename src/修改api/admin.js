import axios from 'axios'

// export const stations = (stationsForm) => axios({
//     url: `/api/admin/stations`,
//     method: 'post',
//     data: {
//         page:stationsForm.page,
// 		recPerPage:stationsForm.recPerPage
//     }
// });


// export const station = (stationForm) => axios({
//     url: `/api/admin/station`,
//     method: 'post',
//     data: {
//         stationId:stationForm.stationId
//     }
// });

// export const addstation = (addstationForm) => axios({
//     url: `/api/admin/addstation`,
//     method: 'post',
//     data: {
//         account: addstationForm.account,
//         password: addstationForm.password,
//         realName: addstationForm.realName,
//         phone:addstationForm.phone,
//         province: addstationForm.province,
// 		city:addstationForm.city,
// 		county:addstationForm.county,
// 		detail:addstationForm.detail,
//         roleId: addstationForm.roleId
//     }
// });

// export const updatestation = (updatestationForm) => axios({
//     url: `api/admin/updatestation`,
//     method: 'post',
//     data: {
// 		 stationId:updatestationForm.stationId,
// 		 account: updatestationForm.account,
// 		 password: updatestationForm.password,
// 		 realName: updatestationForm.realName,
// 		 phone:updatestationForm.phone,
// 		 province: updatestationForm.province,
// 		 city:updatestationForm.city,
// 		 county:updatestationForm.county,
// 		 detail:updatestationForm.detail,
// 		 roleId: updatestationForm.roleId
//     }
// });

// export const deletestation = (deletestationForm) => axios({
//     url: `api/admin/deletestation`,
//     method: 'post',
//     data: {
// 		 stationId:deletestationForm.stationId
//     }
// });

// export const postmans = (postmansForm) => axios({
//     url: `/api/admin/postmans`,
//     method: 'post',
//     data: {
// 		page:postmansForm.page,
// 		recPerPage:postmansForm.recPerPage
//     }
// });

// export const postman = (postmanForm) => axios({
//     url: `api/admin/postman`,
//     method: 'post',
//     data: {
// 		 postmanId:postmanForm.postmanId
//     }
// });

// export const addpostman = (addpostmanForm) => axios({
//     url: `api/admin/addpostman`,
//     method: 'post',
//     data: {
// 		 postmanId:addpostmanForm.postmanId,
// 		 stationId:addpostmanForm.stationId,
// 		 account:addpostmanForm.account,
// 		 password:addpostmanForm.password,
// 		 realName:addpostmanForm.realName,
// 		 phone:addpostmanForm.phone,
// 		 sex:addpostmanForm.sex,
// 		 roleId:addpostmanForm.roleId
//     }
// });

// export const updatepostman = (updatepostmanForm) => axios({
//     url: `api/admin/updatepostman`,
//     method: 'post',
//     data: {
// 		 postmanId:updatepostmanForm.postmanId,
// 		 stationId:updatepostmanForm.stationId,
// 		 account:updatepostmanForm.account,
// 		 password:updatepostmanForm.password,
// 		 realName:updatepostmanForm.realName,
// 		 phone:updatepostmanForm.phone,
// 		 sex:updatepostmanForm.sex,
// 		 roleId:updatepostmanForm.roleId
//     }
// });

// export const deletepostman = (deletepostmanForm) => axios({
//     url: `api/admin/deletepostman`,
//     method: 'post',
//     data: {
// 		 postmanId:deletepostmanForm.postmanId
//     }
// });

// export const users = (usersForm) => axios({
//     url: `api/admin/users`,
//     method: 'post',
//     data: {
// 		 page:usersForm.page,
// 		 recPerPage:usersForm.recPerPage
//     }
// });

// export const user = (userForm) => axios({
//     url: `api/admin/user`,
//     method: 'post',
//     data: {
// 		 userId:userForm.userId
//     }
// });

// export const adduser = (adduserForm) => axios({
//     url: `api/admin/adduser`,
//     method: 'post',
//     data: {
// 		 account:adduserForm.account,
// 		 password:adduserForm.password,
// 		 realName:adduserForm.realName,
// 		 phone:adduserForm.phone,
// 		 sex:adduserForm.sex,
// 		 roleId:adduserForm.roleId
// 	}
// });

// export const updateuser = (updateuserForm) => axios({
//     url: `api/admin/updateuser`,
//     method: 'post',
//     data: {
// 		 userId:updateuserForm.userId,
// 		 account:updateuserForm.account,
// 		 password:updateuserForm.password,
// 		 realName:updateuserForm.realName,
// 		 phone:updateuserForm.phone,
// 		 sex:updateuserForm.sex,
// 		 roleId:updateuserForm.roleId
// 	}
// });

// export const deleteuser = (deleteuserForm) => axios({
//     url: `api/admin/deleteuser`,
//     method: 'post',
//     data: {
// 		 userId:deleteuserForm.userId
//     }
// });

// export const updateadmin = (updateadminForm) => axios({
//     url: `api/admin/updateadmin`,
//     method: 'post',
//     data: {
// 		 adminId:updateadminForm.adminId,
// 		 account:updateadminForm.account,
// 		 password:updateadminForm.password,
// 		 realName:updateadminForm.realName,
// 		 phone:updateadminForm.phone,
// 		 sex:updateadminForm.sex,
// 		 roleId:updateadminForm.roleId
// 	}
// });