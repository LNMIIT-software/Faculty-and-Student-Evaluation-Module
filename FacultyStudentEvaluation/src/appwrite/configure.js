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
}

const service = new Service()

export default service