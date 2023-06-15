class ArtworkModel{
    id: number;
    title: string;
    user: { username: string};
    comments: {  user: { username: string}, comment: string }[];
    image: any;
    description: string;
    
    constructor(id: number, title: string, user: { username: string}, comments: {  user: { username: string}, comment: string }[], image: any, description: string) {
        this.id = id;
        this.title = title;
        this.user = user;
        this.comments = comments;
        this.image = image;
        this.description = description;
    }
}