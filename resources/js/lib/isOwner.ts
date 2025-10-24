export const isOwner = ({ id, ownerId }: { ownerId?: number, id?: number }) => {
    return id === ownerId
}
