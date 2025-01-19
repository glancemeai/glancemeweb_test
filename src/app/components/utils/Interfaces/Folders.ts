interface Folders {
    _id: string,
    name: string,
    createdBy: string,
    sharedWith: string[],
    parentFolder: string | null,
    createdAt: string
}

export default Folders