import axios from 'axios'

export const packagestoreceive = (packagestoreceiveForm) => axios({
    url: `/api/postman/packagestoreceive`,
    method: 'post',
    data: {
        postmanId:packagestoreceiveForm.postmanId,
        page:packagestoreceiveForm.postmanId,
        recPerPage:packagestoreceiveForm.recPerPage
    }
});

export const updatepostman = (updatepostmanForm) => axios({
    url: `/api/postman/updatepostman`,
    method: 'post',
    data: {
        postmanId:updatepostmanForm.postmanId,
		account:updatepostmanForm.account,
        password:updatepostmanForm.password,
        realName:updatepostmanForm.realName,
        phone:updatepostmanForm.phone,
        sex:updatepostmanForm.sex,
        roleId:updatepostmanForm.roleId
    }
});
