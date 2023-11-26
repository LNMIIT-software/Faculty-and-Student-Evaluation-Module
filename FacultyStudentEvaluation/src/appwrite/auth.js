import config from "../config/config";

import { Client, Account, ID } from "appwrite"

export class AuthService {
    client  = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                //execute another function for LOGIN.
                return this.login({email, password})
            } else {
                return userAccount
            }

        } catch (error) {
            throw error
        }
    }

    // async login({email, password}){
    //     console.log(email, password)
    //     try {

    //         const response = await this.account.createEmailSession(email, password)
    //         console.log(response)
    //         return response
    //     } catch (error) {
    //         console.log(error)
    //         throw error
    //     }
    // }
    async login({ email, password }) {
        console.log(email, password);
      
        return this.account
          .createEmailSession(email, password)
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((error) => {
            console.log(error);
            throw error;
          });
      }
      

    // async getCurrentUser(){
    //     try {
    //         return await this.account.get()
    //     } catch (error) {
    //         console.log("Appwrite service :: getCurrentUser :: error", error);
    //     }

    //     return null
    // }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log(user);
            return user;
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
      }
      
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }

        return null
    }
}

const authService = new AuthService()

export default authService;