import axios from 'axios'

// export const stationsincertainarea = (stationsincertainareaForm) => axios({
//     url: `/api/stationsincertainarea`,
//     method: 'post',
//     data: {
//         province: stationsincertainareaForm.province,
// 		city:stationsincertainareaForm.city,
// 		county:stationsincertainareaForm.county,
// 		page:stationsincertainareaForm.page,
//         recPerPage: stationsincertainareaForm.recPerPage
//     }
// });

// export const postmans = (postmansForm) => axios({
//     url: `/api/station/postmans`,
//     method: 'post',
//     data: {
//         stationId:postmansForm.stationId,
// 		page:postmansForm.page,
// 		recPerPage:postmansForm.recPerPage
//     }
// });

export const postman = (postmanForm) => axios({
    url: `/api/station/postman`,
    method: 'post',
    data: {
        postmanId:postmanForm.postmanId
    }
});

export const addpostman = (addpostmanForm) => axios({
    url: `/api/station/addpostman`,
    method: 'post',
    data: {
        postmanId:addpostmanForm.postmanId,
		stationId:addpostmanForm.stationId,
		account:addpostmanForm.account,
		password:addpostmanForm.password,
		realName:addpostmanForm.realName,
		phone:addpostmanForm.phone,
		sex:addpostmanForm.sex,
		roleId:addpostmanForm.roleId
    }
});


export const updatepostman = (updatepostmanForm) => axios({
    url: `api/station/updatepostman`,
    method: 'post',
    data: {
		 postmanId:updatepostmanForm.postmanId,
		 stationId:updatepostmanForm.stationId,
		 account:updatepostmanForm.account,
		 password:updatepostmanForm.password,
		 realName:updatepostmanForm.realName,
		 phone:updatepostmanForm.phone,
		 sex:updatepostmanForm.sex,
		 roleId:updatepostmanForm.roleId
    }
});

export const deletepostman = (deletepostmanForm) => axios({
    url: `api/station/deletepostman`,
    method: 'post',
    data: {
		 postmanId:deletepostmanForm.postmanId
    }
});

// export const packagestosend= (packagestosendForm) => axios({
//     url: `api/station/packagestosend`,
//     method: 'post',
//     data: {
// 		stationId:packagestosendForm.stationId,
// 		page:packagestosendForm.page,
// 		recPerPage:packagestosendForm.recPerPage
//     }
// });

// export const sendpackage= (sendpackageForm) => axios({
//     url: `api/station/sendpackage`,
//     method: 'post',
//     data: {
// 		pageId:sendpackageForm.pageId,
// 		stationReceiveId:sendpackageForm.stationReceiveId
//     }
// });

// export const packagestoreceive= (packagestoreceiveForm) => axios({
//     url: `api/station/packagestoreceive`,
//     method: 'post',
//     data: {
// 		stationId:packagestoreceiveForm.stationId,
// 		page:packagestoreceiveForm.page,
// 		recPerPage:packagestoreceiveForm.recPerPage
//     }
// });

// export const choosepostman= (choosepostmanForm) => axios({
//     url: `api/station/choosepostman`,
//     method: 'post',
//     data: {
// 		packageId:choosepostmanForm.pageId,
// 		postmanId:choosepostmanForm.postmanId
//     }
// });

export const updatestation= (updatestationForm) => axios({
    url: `api/station/updatestation`,
    method: 'post',
    data: {
		stationId:updatestationForm.stationId,
		account:updatestationForm.account,
		password:updatestationForm.password,
		realName:updatestationForm.realName,
		phone:updatestationForm.phone,
		detail:updatestationForm.detail,
		province:updatestationForm.province,
		city:updatestationForm.city,
		county:updatestationForm.county,
		detail:updatestationForm.detail,
		roleId:updatestationForm.roleId
    }
});

export const receivepackage= (receivepackageForm) => axios({
    url: `api/station/receivepackage`,
    method: 'post',
    data: {
		packageId:receivepackageForm.packageId
	
    }
});