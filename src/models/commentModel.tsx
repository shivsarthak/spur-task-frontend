class CommentModel {
    id: number;
    artworkId: string;
    user: { username: string };
    comment: string;

    constructor(id: number, artworkId: string, user: { username: string }, comment: string) {
        this.id = id;
        this.artworkId = artworkId;
        this.user = user;
        this.comment = comment;
    }


}