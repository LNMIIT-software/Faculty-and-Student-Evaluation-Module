const config = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteStudentCollectionID: String(import.meta.env.VITE_APPWRITE_STUDENT_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteFeedbackCollectionID: String(import.meta.env.VITE_APPWRITE_FEEDBACK_COLLECTION_ID)
}

export default config