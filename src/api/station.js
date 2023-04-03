import axios from 'axios'

export const stationsincertainarea = (stationsincertainareaForm) => axios({
  url: `/api/stationsincertainarea`,
  method: 'post',
  data: {
    province: stationsincertainareaForm.province,
    city: stationsincertainareaForm.city,
    county: stationsincertainareaForm.county,
    page: stationsincertainareaForm.page,
    recPerPage: stationsincertainareaForm.recPerPage
  }
});

export const sendpackage = (sendpackageForm) => axios({
  url: `api/station/sendpackage`,
  method: 'post',
  data: {
    packageId: sendpackageForm.packageId,
    stationReceiveId: sendpackageForm.stationReceiveId
  }
});

export const choosepostman = (choosepostmanForm) => axios({
  url: `api/station/choosepostman`,
  method: 'post',
  data: {
    packageId: choosepostmanForm.packageId,
    postmanId: choosepostmanForm.postmanId
  }
});

export const packagestosend = (packagestosendForm) => axios({
  url: `api/station/packagestosend`,
  method: 'post',
  data: {
    stationId: packagestosendForm.stationId,
    nameReceive: packagestosendForm.nameReceive,
    state: packagestosendForm.state,
    page: packagestosendForm.page,
    recPerPage: packagestosendForm.recPerPage
  }
});

export const packagestoreceive = (packagestoreceiveForm) => axios({
  url: `api/station/packagestoreceive`,
  method: 'post',
  data: {
    stationId: packagestoreceiveForm.stationId,
    nameReceive: packagestoreceiveForm.nameReceive,
    state: packagestoreceiveForm.state,
    page: packagestoreceiveForm.page,
    recPerPage: packagestoreceiveForm.recPerPage
  }
});

export const postmans = (postmansForm) => axios({
  url: `/api/station/postmans`,
  method: 'post',
  data: {
    stationId: postmansForm.stationId,
    page: postmansForm.page,
    recPerPage: postmansForm.recPerPage
  }
});