import { observable, action, makeObservable, computed } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';

class BusinessDetails {
  business = {
    id: "123",
    name: "Dikla Josefsberg",
    address: "Baaley hatosafot 12 Elad",
    phone: "03-1234567",
    owner: "Dikla Josefsberg",
    logo: 'https://dikla-shefer.co.il/wp-content/uploads/%D7%9C%D7%95%D7%92%D7%95-%D7%9C%D7%90%D7%AA%D7%A8-1024x379.b197b0.webp',
    description: "Consultant in the Shafer approach",
  };

  constructor() {
    makeObservable(this, {
      business: observable,
      postBusiness: action,
      updateBusiness: action,
      fetchBusiness: action,
      getBusiness: computed,
    });
  }

  get getBusiness() {
    this.fetchBusiness();
    return this.business;
  }

  fetchBusiness() {
    axios.get("http://localhost:8787/businessData").then((res) => {
      runInAction(() => {
        Object.assign(this.business, res.data);
      });
    });
  }

  updateBusiness(bus) {
    runInAction(() => {
      Object.assign(this.business, bus);
    });
    this.postBusiness();
  }

  postBusiness() {
    fetch("http://localhost:8787/businessData", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.business),
    }).then(response => {
      return response.json();
    }).then(data => {
      runInAction(() => {
        Object.assign(this.business, data);
      });
    });
  }
}

export default new BusinessDetails();
