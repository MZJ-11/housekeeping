import axios from 'axios'

/*
登陆
*/
export const login = ({ account, password }) => axios({ url: `/api/login`, method: 'post',data:{account,password} });

export const register = ({ username, password }) => axios({ url: `/api/register`, method: 'post',data:{username,password} });







//test
// export const test = () => axios({ url: `https://api.apiopen.top/api/getHaoKanVideo?page=0&size=2`, method: 'get'});
