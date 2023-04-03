import axios from 'axios'

export const register = (registerForm) => axios({
    url: `/api/user/register`,
    method: 'post',
    data: {
        account: registerForm.account,
        password: registerForm.password,
        realName: registerForm.realName,
        phone: registerForm.phone,
        sex: registerForm.sex,
        roleId: registerForm.roleId
    }
});

export const addpackage = (sendForm) => axios({
    url: `api/user/addpackage`,
    method: 'post',
    data: {
        nameSend: sendForm.nameSend,
        phoneSend: sendForm.phoneSend,
        provinceSend: sendForm.provinceSend,
        citySend: sendForm.citySend,
        countySend: sendForm.countySend,
        detailSend: sendForm.detailSend,
        nameReceive: sendForm.nameReceive,
        phoneReceive: sendForm.phoneReceive,
        provinceReceive: sendForm.provinceReceive,
        cityReceive: sendForm.cityReceive,
        countyReceive: sendForm.countyReceive,
        detailReceive: sendForm.detailReceive,
        stationSendId: sendForm.stationSendId,
        stationReceiveId: sendForm.stationReceiveId,
        type: sendForm.type,
        weight: sendForm.weight,
        price: sendForm.price,
        remark: sendForm.remark,
        state: sendForm.state,
        userId: sendForm.userId
    }
})

export const packages = (packagesForm) => axios({
    url: `/api/user/packages`,
    method: 'post',
    data: {
        userId:packagesForm.userId,
        nameReceive:packagesForm.nameReceive,
        state:packagesForm.state,
        page:packagesForm.page,
        recPerPage:packagesForm.recPerPage
    }
});

export const deletepackage = (packageId) => axios({
    url: `/api/user/deletepackage`,
    method: 'post',
    data: {
        packageId
    }
});


