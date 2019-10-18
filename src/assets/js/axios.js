import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import token from './token.js';
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
//interceptors拦截器
let host=window.location.host;
axios.interceptors.request.use(
  config => {
  	config.headers.token = token;
    return config;
  },
  err => {
    return Promise.reject(err);
});
//axiosGET请求
Vue.prototype.$CGET = (url,arg,success,error) =>{
	axios.get('/api/umc'+url,{
				params:arg
			})
	.then(res => {
	   const data = res.data;
	    	if(typeof success === 'function'){
				    success(data);
	       }
	})
	.catch(error => {
      if(typeof error === 'function'){
     	  erro(data)
      }
    })
}
//上传请求
Vue.prototype.$CZC=(url,arg,success,error)=>{
	axios.post('/api/fmc'+url,arg,{
	})
	.then(res => {
	   const data = res.data;
    	if(typeof success === 'function'){
			    success(data);
       }
	})
}
//axiosPOST请求
Vue.prototype.$CPOST=(url,arg,success,error)=>{
	axios.post('/api/umc'+url,qs.stringify(arg),{
		headers:{
			token:token
		}
	})
	.then(res => {
	   const data = res.data;
    	if(typeof success === 'function'){
			    success(data);
       }
	})
	.catch(error => {
      if(typeof error === 'function'){
     	  erro(data)
      }
   })
}
//umcPost
Vue.prototype.$UPOST=(url,arg,success,error)=>{
	axios.post(url,qs.stringify(arg))
	.then(res => {
	   const data = res.data;
    	if(typeof success === 'function'){
			    success(data);
       }
	})
	.catch(error => {
      if(typeof error === 'function'){
     	  erro(data)
      }
   })
};