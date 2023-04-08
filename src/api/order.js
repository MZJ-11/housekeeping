import axios from 'axios'


export const addorder = (addorderForm) => axios({
    url: `/api/order/addorder`,
    method: 'post',
    data: {
        userId: addorderForm.userId,
        userNickname: addorderForm.userNickname,
        companyId: addorderForm.companyId,
        companyName: addorderForm.companyName,
        orderPrice: addorderForm.orderPrice,
        addressCity: addorderForm.addressCity,
        addressCounty: addorderForm.addressCounty,
        addressStreet: addorderForm.addressStreet,
        addressDetail: addorderForm.addressDetail,
    }
});

export const userorders = (userordersForm) => axios({
    url: `/api/order/userorders`,
    method: 'post',
    data: {
        userId: userordersForm.userId,
        page: userordersForm.page,
        recPerPage: userordersForm.recPerPage,
    }
});

export const comment = (commentForm) => axios({
    url: `/api/order/comment`,
    method: 'post',
    data: {
        order_id: commentForm.order_id,
        order_comment: commentForm.order_comment,
    }
});

export const companyorders = (companyordersForm) => axios({
    url: `/api/order/companyorders`,
    method: 'post',
    data: {
        companyId: companyordersForm.companyId,
        page: companyordersForm.page,
        recPerPage: companyordersForm.recPerPage,
    }
});


export const acceptorder = (acceptorderForm) => axios({
    url: `/api/order/acceptorder`,
    method: 'post',
    data: {
        orderId: acceptorderForm.orderId,
        workerId: acceptorderForm.workerId,
        workerName: acceptorderForm.workerName,
    }
});


export const workerorders = (workerordersForm) => axios({
    url: `/api/order/workerorders`,
    method: 'post',
    data: {
        workerId: workerordersForm.workerId,
        page: workerordersForm.page,
        recPerPage: workerordersForm.recPerPage,
    }
});

export const finishorder = (orderId) => axios({
    url: `/api/order/finishorder`,
    method: 'post',
    data: {
        orderId
    }
});

export const orders = (ordersForm) => axios({
    url: `/api/order/orders`,
    method: 'post',
    data: {
        page: ordersForm.page,
        recPerPage: ordersForm.recPerPage,
    }
});