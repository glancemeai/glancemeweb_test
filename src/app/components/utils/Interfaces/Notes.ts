interface Notes {
    reminder: boolean;
    content: any;
    _id: string;
    color: string,
    urlCode: string,
    title: string,
    description:string,
    type: string,
    selectedData: {
        time: number,
        url: string,
        date: Number,
        percentage: string
    },
    image: string,
    metaimage: string,
    notes_view: string,
    folderId: string | null,
    notes_token: string,
    createdAt: string,
    urlHash:string,
}


export default Notes