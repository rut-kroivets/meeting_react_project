import {observable, action, makeObservable ,computed} from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';
class servicesDetails{
 services =[{
        id: "11",
        name: "Educating Children-private",
        description: "Individual counseling session at the clinic regarding children's education",
        price: 500,
        duration: 60,
    },
    {
        id: "22",
        name: "Zoom relationship",
        description: "Individual counseling session on zoom regarding relationship",
        price: 300,
        duration: 60,
    }];
    constructor() {
        makeObservable(this,{
            services: observable,
            postService:action,          
            getServices: computed
        })
        // for (let i = 0; i < this.services.length; i++) {
        //     this.postService(this.services[i]);           
        // }    
    }
    get getServices(){        
         axios.get("http://localhost:8787/services").then((res)=>{
            runInAction(()=>{
              this.services = res.data;
            })
         });
        return this.services; 
    }
    
    postService(s) {        
        fetch("http://localhost:8787/service",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(s)
        }) .catch(error => {
            console.error('Error:', error);
        });
    }
}
export default new servicesDetails();