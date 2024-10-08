import { post } from "./authService";

export const fileChange = (e) => {
    
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return post('/photos/image-upload', uploadData)

}

export const newPhoto = (e) => {

    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    return post('/photos/new-photo', uploadData)

}

