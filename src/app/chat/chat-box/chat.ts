
export interface ChatMessage{ 
    chatId?: string,
    message: string,
    createdOn: Date,
    receiverId: String,
    receiverName: string,
    senderId: string,
    senderName: string 
}