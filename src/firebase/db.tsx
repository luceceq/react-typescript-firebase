import {db} from './config';

interface IRequest {
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: string,
  residenceCountry?: string,
  residenceCity?: string,
  lastActivity?: string,
  sortingKey?:string,
  sortingType?:boolean
}

interface ICallback {
  (result:any):void
}
export const getLengthOfUser = (request: IRequest, callback: ICallback) : void => {
  db.ref('users')
    .orderByChild('email')
    .once('value')
    .then(function (snapshot) {
      callback(snapshot.numChildren())      
    });
}

export const getFirstPageData = (request: IRequest, callback: ICallback) => {
  let sortingKey: string = String(request.sortingKey)
  let sortingType: boolean = Boolean(request.sortingType)
  if(!sortingType){
    db.ref('users')
      .orderByChild(sortingKey)
      .limitToLast(5)
      .once('value')
      .then((snapshot) => {
        let userData: object[] = [];
        snapshot.forEach( (childSnapshot) => {
          userData = [...userData, childSnapshot.val()];
        });
        callback(userData.reverse())
      });
  }
  db.ref ('users')
    .orderByChild(sortingKey)
    .limitToFirst(5)
    .once ('value') 
    .then ( (snapshot) => {
      let userData: object[] = [];
      snapshot.forEach ( (childSnapshot) => {
        userData = [...userData, childSnapshot.val()];
      });
      callback(userData)
    });
};

export const getNextPageData = (request: IRequest, callback: ICallback) => {
  let email: string = String(request.email)
  let sortingKey: string = String(request.sortingKey)
  let sortingType: boolean = Boolean(request.sortingType)
  if(!sortingType){
    db.ref('users')
      .orderByChild(sortingKey)
      .limitToLast(6)
      .endAt(email)
      .once('value')
      .then(function (snapshot) {
        let userData: object[] = [];
        snapshot.forEach(function (childSnapshot) {
          userData = [...userData, childSnapshot.val()];
        });
        callback(userData);
      });
  }else{
    db.ref('users')
      .orderByChild(sortingKey)
      .limitToFirst(6)  
      .startAt(email)
      .once('value')
      .then(function (snapshot) {
        let userData: object[] = [];
        snapshot.forEach(function (childSnapshot) {
          userData = [...userData, childSnapshot.val()];
        });
        callback(userData);
      });
  }  
}

export const getPreviousPageData = (request: IRequest, callback: ICallback) => {
  let email: string = String(request.email);
  let sortingKey: string = String(request.sortingKey)
  db.ref('users')
    .orderByChild("email")
    .limitToLast(6)
    .endAt(email)
    .once('value')
    .then(function(snapshot) {
      let userData: object[] = [];
      snapshot.forEach(function(childSnapshot) {
        userData = [...userData, childSnapshot.val()];
      });
      callback(userData);
    });
}

