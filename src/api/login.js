import axios from 'axios'

/*
登陆
*/
export const login = ({ account, password,roleId }) => axios({ url: `/api/login`, method: 'post',data:{account,password,roleId} });







//test
// export const test = () => axios({ url: `https://api.apiopen.top/api/getHaoKanVideo?page=0&size=2`, method: 'get'});
