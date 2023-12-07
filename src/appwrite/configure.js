import { Client, Databases, ID } from "appwrite";
import config from "../config/config";

class Service{
    client = new Client()
    databases;  
    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectID)

        this.databases = new Databases(this.client)
    }

    async addEntry(studentID, studentName, subject, facultyName, grade){
        console.log(studentID, studentName, subject, facultyName, grade)
        try {
            const entry = await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteStudentCollectionID,
                ID.unique(),
                {
                    studentID,
                    studentName,
                    subject,
                    facultyName,
                    grade,
                }
            )
            //console.log(entry)
            return entry
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)  
        }
    }

    async getEntries(){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteStudentCollectionID,
            )
        } catch (error) {
            console.log("Appwrite service :: getEntries :: error", error)
        }
    }

    async updateEntry(slug, studentID, studentName, subject, facultyName, grade){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteStudentCollectionID,
                slug,
                {
                    studentID, 
                    studentName, 
                    subject, 
                    facultyName, 
                    grade
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }
}

const service = new Service()

export default service